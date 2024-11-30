from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import logging
logger = logging.getLogger(__name__)

@csrf_exempt
def health_check(request):
    """Enhanced health check endpoint for DigitalOcean"""
    try:
        # Test database connection
        for name in connections:
            cursor = connections[name].cursor()
            cursor.execute("SELECT 1;")
            cursor.fetchone()
            cursor.close()
        
        # Log successful health check
        logger.info("Health check passed - Database connection successful")
        
        return JsonResponse({
            "status": "healthy",
            "database": "connected",
            "python_path": os.getenv('PYTHONPATH', 'not set'),
            "django_settings": os.getenv('DJANGO_SETTINGS_MODULE', 'not set')
        }, status=200)
        
    except OperationalError as e:
        logger.error(f"Health check failed - Database connection error: {str(e)}")
        return JsonResponse({
            "status": "unhealthy",
            "error": "Database connection failed",
            "details": str(e)
        }, status=500)
        
    except Exception as e:
        logger.error(f"Health check failed - Unexpected error: {str(e)}")
        return JsonResponse({
            "status": "unhealthy",
            "error": "Unexpected error",
            "details": str(e)
        }, status=500)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prelaunch/', include('prelaunch.urls')),
    path('health/', health_check, name='health_check'),  # Add this line
    path('', health_check),  # Add this to handle root path
]