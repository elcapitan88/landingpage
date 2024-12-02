from django.db import migrations

def create_initial_config(apps, schema_editor):
    LifetimeMembershipConfig = apps.get_model('prelaunch', 'LifetimeMembershipConfig')
    LifetimeMembershipConfig.objects.create(
        price=299.00,
        is_active=True,
        max_slots=100,
        slots_taken=92,  # This will show 8 spots remaining
    )

def reverse_migration(apps, schema_editor):
    LifetimeMembershipConfig = apps.get_model('prelaunch', 'LifetimeMembershipConfig')
    LifetimeMembershipConfig.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('prelaunch', 'previous_migration_name'),  # Replace with your last migration name
    ]

    operations = [
        migrations.RunPython(create_initial_config, reverse_migration),
    ]