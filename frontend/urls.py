from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('all-games', index),
    path('play-game/<int:gridId>', index),
    path('solver', index),
]