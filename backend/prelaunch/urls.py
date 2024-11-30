# prelaunch/urls.py
from django.urls import path
from . import views

app_name = 'prelaunch'

urlpatterns = [
    path('subscribe/', views.subscribe, name='subscribe'),
    path('remaining-spots/', views.get_remaining_spots, name='remaining_spots'),
    path('create-checkout-session/', views.create_checkout_session, name='create-checkout-session'),
    path('webhook/stripe/', views.stripe_webhook, name='stripe-webhook'),
    path('payment-success/', views.payment_success, name='payment-success'),
]