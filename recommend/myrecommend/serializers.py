from rest_framework import serializers
from .models import Beer, Review, LearningDataset, Preference
from rest_framework.exceptions import ValidationError, NotAcceptable

class BeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beer
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class BeerReviewSerializer(serializers.ModelSerializer):
    beer = BeerSerializer(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

class BeerPreferenceSerializer(serializers.ModelSerializer):
    beer = BeerSerializer(read_only=True)
    class Meta:
        model = Preference
        fields = '__all__'


class LearningDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningDataset
        fields = '__all__'