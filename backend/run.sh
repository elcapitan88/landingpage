#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --timeout 120 \
    --log-level debug \
    --access-logfile - \
    --error-logfile -