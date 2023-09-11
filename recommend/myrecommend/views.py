from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Beer
from .serializers import BeerSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.http import QueryDict
from django.db.models import Q

# Create your views here.
@api_view(['GET', 'POST', 'PUT'])
def beerindex(request):
    if request.method == "GET":
        beerlist = get_list_or_404(Beer)
        serializer = BeerSerializer(beerlist, many=True)
        return Response(serializer.data)
