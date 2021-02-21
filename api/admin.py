from django.contrib import admin

# Register your models here.
from .models import Grid
 
@admin.register(Grid)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = [field.name for field in
Grid._meta.get_fields()]