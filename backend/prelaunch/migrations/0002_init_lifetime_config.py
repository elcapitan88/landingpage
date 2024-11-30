from django.db import migrations

def create_initial_config(apps, schema_editor):
    LifetimeMembershipConfig = apps.get_model('prelaunch', 'LifetimeMembershipConfig')
    if not LifetimeMembershipConfig.objects.exists():
        LifetimeMembershipConfig.objects.create(
            price=299.00,
            max_slots=100,
            slots_taken=0,
            is_active=True
        )

class Migration(migrations.Migration):
    dependencies = [
        ('prelaunch', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_config),
    ]