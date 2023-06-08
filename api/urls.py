from django.urls import path
from .views import ListCars

urlpatterns = [
    path('api/', ListCars.as_view())
]
