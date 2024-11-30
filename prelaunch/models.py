# prelaunch/models.py
from django.db import models
from django.utils import timezone

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_lifetime_member = models.BooleanField(default=False)
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('failed', 'Failed')
        ],
        default='pending'
    )
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    payment_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['created_at']),
            models.Index(fields=['payment_status']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} - {'Lifetime' if self.is_lifetime_member else 'Subscriber'}"

class LifetimeMembershipConfig(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    max_slots = models.IntegerField(default=100)
    slots_taken = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Lifetime Membership Configuration"
        verbose_name_plural = "Lifetime Membership Configurations"
        indexes = [
            models.Index(fields=['is_active', 'slots_taken']),
        ]

    def __str__(self):
        return f"Lifetime Membership - ${self.price} ({self.slots_taken}/{self.max_slots} slots)"

    def has_available_slots(self):
        return self.slots_taken < self.max_slots