# core/wsgi.py
import os
import sys
from pathlib import Path

# Add the project directory to the Python path
path = Path(__file__).resolve().parent.parent
if path not in sys.path:
    sys.path.append(str(path))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()