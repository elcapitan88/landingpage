# Generated by Django 5.1.1 on 2024-11-29 05:44

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LifetimeMembershipConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_active', models.BooleanField(default=True)),
                ('max_slots', models.IntegerField(default=100)),
                ('slots_taken', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Lifetime Membership Configuration',
                'verbose_name_plural': 'Lifetime Membership Configurations',
            },
        ),
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_lifetime_member', models.BooleanField(default=False)),
                ('payment_status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('payment_id', models.CharField(blank=True, max_length=100, null=True)),
                ('payment_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['email'], name='prelaunch_s_email_50dde8_idx'), models.Index(fields=['created_at'], name='prelaunch_s_created_110e43_idx'), models.Index(fields=['payment_status'], name='prelaunch_s_payment_21572e_idx')],
            },
        ),
    ]
