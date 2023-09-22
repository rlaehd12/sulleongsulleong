from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Beer, Review
from .serializers import BeerSerializer, ReviewSerializer, BeerReviewSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.http import QueryDict
from django.db.models import Q

# 작업용 모듈 임포트
import pandas as pd
import numpy as np
from surprise import Reader, Dataset, BaselineOnly
from surprise.model_selection import train_test_split, cross_validate

# Create your views here.
@api_view(['GET', 'POST', 'PUT'])
def beerindex(request):
    if request.method == "GET":
        beerlist = get_list_or_404(Beer)
        serializer = BeerSerializer(beerlist, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT'])
def re_ranking(request):
    # Q 객체를 사용하여 OR 연산 수행
    candidate = [1,2,3,4,5,6,7,8,9,152385]
    filter_query = Q()
    for id in candidate:
        filter_query |= Q(beer = id)

    # 데이터 요청
    if request.method == "GET":
        beer_review_list = Review.objects.filter(filter_query).prefetch_related()
        serializer = ReviewSerializer(beer_review_list, many=True)

        # 데이터프레임 만들기
        ratings = pd.DataFrame(serializer.data)
        ratings = ratings[['member', 'beer','overall']]
        reader = Reader(rating_scale=(1, 20))
        data = Dataset.load_from_df(ratings, reader)

        # 최종 모델 파라미터
        bsl_options = {
            "method": "als",
            "learning_rate": 0.005,
            "n_epochs": 1000
        }
        algo = BaselineOnly(bsl_options=bsl_options)

        # 데이터 형태 안바꾸면 계산도 못하게함;;
        trainset = data.build_full_trainset()
        algo.fit(trainset)

        # 계산된 예측으로 순위 매기기
        result = []
        for i in candidate:
            print(algo.predict(uid=1, iid=i))
            result.append(
                {
                    'uid':algo.predict(uid=1, iid=i).uid,
                    'rid':algo.predict(uid=1, iid=i).iid,
                    'estimate':algo.predict(uid=1, iid=i).est,
                }
            )

        # 가져온 데이터로 작업 실행
        return Response(result)
