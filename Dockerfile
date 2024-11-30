# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy Django project files first
COPY . /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install npm dependencies and build React app
RUN npm install
RUN npm run build

# Collect static files
RUN python manage.py collectstatic --noinput

# Run the application
CMD gunicorn core.wsgi:application --bind 0.0.0.0:8000