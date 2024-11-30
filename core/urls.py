from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "healthy"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prelaunch/', include('prelaunch.urls')),
    path('health/', health_check, name='health_check'),
    path('', RedirectView.as_view(url='/')),
]