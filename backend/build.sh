#!/usr/bin/env bash
set -o errexit

echo "Installing Python dependencies..."
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "Creating migrations..."
python manage.py makemigrations

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Creating initial configuration..."
python manage.py shell << END
from prelaunch.models import LifetimeMembershipConfig
if not LifetimeMembershipConfig.objects.exists():
    LifetimeMembershipConfig.objects.create(
        price=299.00,
        is_active=True,
        max_slots=100,
        slots_taken=0
    )
END

echo "Current directory structure:"
ls -R

echo "Build complete"