#!/usr/bin/env bash
set -o errexit

echo "Installing Python dependencies..."
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "Running database migrations..."
python manage.py migrate --no-input

echo "Build complete"