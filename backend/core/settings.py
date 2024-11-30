# Add to your existing settings.py

import os
from pathlib import Path

# Update allowed hosts
ALLOWED_HOSTS = [
    '.digitalocean.app',  # Allow DigitalOcean app subdomains
    'api.atomiktrading.com',
    'localhost',
    '127.0.0.1',
]

# Update CORS settings
CORS_ALLOWED_ORIGINS = [
    'https://atomiktrading.com',
    'https://www.atomiktrading.com',
    'https://*.ondigitalocean.app'
]

CORS_ALLOW_CREDENTIALS = True

# Update database settings (using dj-database-url)
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# Security settings
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    
# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'