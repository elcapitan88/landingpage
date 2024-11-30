import json
import logging
import decimal
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import F
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Subscriber, LifetimeMembershipConfig

logger = logging.getLogger(__name__)

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@require_http_methods(["POST"])
def subscribe(request):
    """Handle newsletter/waitlist subscriptions."""
    logger.info("Subscribe endpoint hit")
    try:
        data = json.loads(request.body)
        email = data.get('email')
        
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({'error': 'Invalid email format'}, status=400)

        # Use get_or_create to handle duplicate emails
        subscriber, created = Subscriber.objects.get_or_create(
            email=email,
            defaults={'is_lifetime_member': False}
        )

        logger.info(f"Subscriber {'created' if created else 'already exists'}: {email}")

        return JsonResponse({
            'status': 'success',
            'message': 'Successfully subscribed' if created else 'Already subscribed',
            'is_new': created
        })

    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {str(e)}")
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        logger.error(f"Unexpected error in subscribe view: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)

@api_view(['GET'])
def get_remaining_spots(request):
    """Get the number of remaining lifetime membership spots."""
    try:
        config = LifetimeMembershipConfig.objects.filter(is_active=True).first()
        
        if not config:
            logger.warning("No active lifetime membership configuration found")
            return JsonResponse({
                'remaining_spots': 100,  # Default fallback
                'message': 'Using default spots count'
            })
        
        remaining = max(0, config.max_slots - config.slots_taken)
        total_spots = config.max_slots
        
        return JsonResponse({
            'remaining_spots': remaining,
            'total_spots': total_spots,
            'is_sold_out': remaining == 0
        })

    except Exception as e:
        logger.error(f"Error fetching remaining spots: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Error fetching remaining spots',
            'remaining_spots': 100  # Fallback value
        }, status=500)

@api_view(['POST'])
def create_checkout_session(request):
    """Create a Stripe checkout session for lifetime membership purchase."""
    try:
        email = request.data.get('email', '')  # Make email optional
        
        # Only validate email if it's provided
        if email:
            try:
                validate_email(email)
            except ValidationError:
                return Response({'error': 'Invalid email format'}, status=400)

            # Check if user is already a lifetime member
            existing_subscriber = Subscriber.objects.filter(
                email=email,
                is_lifetime_member=True,
                payment_status='completed'
            ).first()
            
            if existing_subscriber:
                return Response({
                    'error': 'You already have a lifetime membership'
                }, status=400)

        # Check available slots
        config = LifetimeMembershipConfig.objects.filter(is_active=True).first()
        if not config or config.slots_taken >= config.max_slots:
            return Response({
                'error': 'Sorry, all lifetime membership spots have been filled'
            }, status=400)

        frontend_url = settings.FRONTEND_URL.rstrip('/')
        success_url = f"{frontend_url}/payment-success?session_id={{CHECKOUT_SESSION_ID}}"
        if email:
            success_url += f"&email={email}"

        # Create Stripe checkout session
        checkout_session_params = {
            'payment_method_types': ['card'],
            'line_items': [{
                'price': settings.STRIPE_LIFETIME_PRICE_ID,
                'quantity': 1,
            }],
            'mode': 'payment',
            'success_url': success_url,
            'cancel_url': frontend_url,  # Redirect back to frontend homepage
            'metadata': {
                'product_type': 'lifetime_membership'
            },
            'payment_intent_data': {
                'description': 'Atomik Trading Lifetime Access - Pre-Launch Special\n\n✨ Unlimited webhook automation\n⚡ 50ms trade execution\n🔄 24/7 automated trading\n🚀 Never pay again - lifetime updates included\n✅ 30-day guarantee'
            }
        }

        # Only add email-related parameters if email is provided
        if email:
            checkout_session_params['customer_email'] = email
            checkout_session_params['metadata']['email'] = email

        checkout_session = stripe.checkout.Session.create(**checkout_session_params)

        return Response({
            'sessionId': checkout_session.id
        })

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        return Response({'error': str(e)}, status=400)
    except Exception as e:
        logger.error(f"Checkout session error: {str(e)}", exc_info=True)
        return Response({'error': 'Failed to create checkout session'}, status=500)

@api_view(['POST'])
@csrf_exempt
def stripe_webhook(request):
    """Handle Stripe webhook events."""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )

        # Handle successful checkout
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            
            # Verify this is a lifetime membership purchase
            if session['metadata'].get('product_type') != 'lifetime_membership':
                logger.warning(f"Unexpected product type in session {session.id}")
                return Response({'status': 'ignored'})

            # Email is now optional
            email = session['metadata'].get('email')
            
            with transaction.atomic():
                # Only create/update subscriber if we have an email
                if email:
                    subscriber = Subscriber.objects.select_for_update().filter(
                        email=email
                    ).first()

                    payment_amount = decimal.Decimal(session['amount_total']) / 100

                    if subscriber:
                        subscriber.is_lifetime_member = True
                        subscriber.payment_status = 'completed'
                        subscriber.payment_id = session.id
                        subscriber.payment_amount = payment_amount
                        subscriber.save()
                    else:
                        Subscriber.objects.create(
                            email=email,
                            is_lifetime_member=True,
                            payment_status='completed',
                            payment_id=session.id,
                            payment_amount=payment_amount
                        )

                # Update available slots regardless of email
                config = LifetimeMembershipConfig.objects.select_for_update().filter(
                    is_active=True
                ).first()
                
                if config and config.slots_taken < config.max_slots:
                    config.slots_taken = F('slots_taken') + 1
                    config.save()

            logger.info(f"Successfully processed payment" + (f" for {email}" if email else ""))
            return Response({'status': 'success'})

        return Response({'status': 'ignored'})

    except ValueError as e:
        logger.error(f"Invalid payload: {str(e)}")
        return Response({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid signature: {str(e)}")
        return Response({'error': 'Invalid signature'}, status=400)
    except Exception as e:
        logger.error(f"Webhook processing error: {str(e)}", exc_info=True)
        return Response({'error': 'Webhook processing failed'}, status=500)

@api_view(['GET'])
def payment_success(request):
    """Handle successful payment redirect and verification."""
    try:
        session_id = request.query_params.get('session_id')
        email = request.query_params.get('email')

        if not session_id or not email:
            return Response({
                'error': 'Session ID and email are required'
            }, status=400)

        # Verify the payment in our database
        try:
            subscriber = Subscriber.objects.get(
                email=email,
                payment_id=session_id,
                payment_status='completed'
            )
        except Subscriber.DoesNotExist:
            logger.warning(f"Payment verification pending for session {session_id}")
            return Response({
                'error': 'Payment verification pending',
                'status': 'pending'
            }, status=202)

        # If verification successful, send success response
        return Response({
            'success': True,
            'is_lifetime_member': subscriber.is_lifetime_member,
            'message': 'Welcome to Atomik Trading!'
        })

    except Exception as e:
        logger.error(f"Payment success page error: {str(e)}", exc_info=True)
        return Response({
            'error': 'An unexpected error occurred'
        }, status=500)