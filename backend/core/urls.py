from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import logging
logger = logging.getLogger(__name__)

@csrf_exempt
def health_check(request):
    """Health check endpoint for DigitalOcean"""
    logger.info("Health check endpoint hit")
    response = HttpResponse("OK")
    response["Cache-Control"] = "no-cache"
    return response

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prelaunch/', include('prelaunch.urls')),
    path('health/', health_check, name='health_check'),  # Add this line
    path('', health_check),  # Add this to handle root path
]