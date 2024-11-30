#!/usr/bin/env bash
set -o errexit

echo "Installing Python dependencies..."
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "Current directory structure:"
ls -R

echo "Build complete"