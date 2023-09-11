from rest_framework import serializers
from .models import Beer
from rest_framework.exceptions import ValidationError, NotAcceptable

class BeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beer
        fields = '__all__'