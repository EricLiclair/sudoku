from django.urls import path
from .views import GridView, CreateGridView, GetGridView, GetGridSolutionView

urlpatterns = [
    path('grids', GridView.as_view()),
    path('create-grid', CreateGridView.as_view()),
    path('get-grid', GetGridView.as_view()),
    path('get-solution', GetGridSolutionView.as_view()),
]