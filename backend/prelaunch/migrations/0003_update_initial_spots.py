from django.db import migrations

def update_spots_config(apps, schema_editor):
    LifetimeMembershipConfig = apps.get_model('prelaunch', 'LifetimeMembershipConfig')
    config = LifetimeMembershipConfig.objects.filter(is_active=True).first()
    if config:
        config.max_slots = 100  # Total slots
        config.slots_taken = 92  # This will make remaining = 8
        config.save()
    else:
        LifetimeMembershipConfig.objects.create(
            price=299.00,
            max_slots=100,
            slots_taken=92,
            is_active=True
        )

class Migration(migrations.Migration):
    dependencies = [
        ('prelaunch', '0002_init_lifetime_config'),  # Update this to your previous migration
    ]

    operations = [
        migrations.RunPython(update_spots_config),
    ]