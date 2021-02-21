from django.db import models

# Create your models here.
class Grid(models.Model):
    grid_string = models.CharField(max_length=180, default="", unique=True, blank=False)
    solved_grid_string = models.CharField(max_length=180, default="", blank=True)