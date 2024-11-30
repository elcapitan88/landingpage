#!/usr/bin/env bash
set -o errexit

echo "Installing Python dependencies..."
python -m pip install --upgrade pip
pip install -r requirements.txt

# Print debug information
echo "Current directory: $(pwd)"
echo "Python path: $PYTHONPATH"
echo "Contents of current directory:"
ls -la

echo "Running database migrations..."
python manage.py migrate --no-input

echo "Build complete"