# Generated by Django 5.1.1 on 2024-11-30 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prelaunch', '0002_init_lifetime_config'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='lifetimemembershipconfig',
            index=models.Index(fields=['is_active', 'slots_taken'], name='prelaunch_l_is_acti_093acf_idx'),
        ),
    ]
