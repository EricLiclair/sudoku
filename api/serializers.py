from rest_framework import serializers
from .models import Grid

class GridSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grid
        fields = "__all__"

class CreateGridSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grid
        fields = "__all__"