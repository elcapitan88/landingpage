#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo "Python path:"
echo $PYTHONPATH

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput || true

echo "Running migrations..."
python manage.py migrate --noinput || true

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --log-level debug \
    --access-logfile - \
    --error-logfile - \
    --capture-output