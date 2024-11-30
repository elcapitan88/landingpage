# prelaunch/admin.py
from django.contrib import admin
from .models import Subscriber, LifetimeMembershipConfig

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at', 'is_lifetime_member', 'payment_status')
    list_filter = ('is_lifetime_member', 'payment_status', 'created_at')
    search_fields = ('email',)
    readonly_fields = ('created_at',)

@admin.register(LifetimeMembershipConfig)
class LifetimeMembershipConfigAdmin(admin.ModelAdmin):
    list_display = ('price', 'is_active', 'slots_taken', 'max_slots', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    def has_add_permission(self, request):
        # Only allow one configuration
        return not LifetimeMembershipConfig.objects.exists()