from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def health_check(request):
    """Health check endpoint for DigitalOcean"""
    return HttpResponse("OK", status=200)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prelaunch/', include('prelaunch.urls')),
    path('health/', health_check, name='health_check'),  # Add this line
    path('', health_check),  # Add this to handle root path
]