from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Beer, Review, Preference
from .serializers import BeerSerializer, ReviewSerializer, BeerReviewSerializer, BeerPreferenceSerializer, LearningDatasetSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.http import QueryDict
from django.db.models import Q

# 작업용 모듈 임포트
import pandas as pd
import numpy as np
from surprise import Reader, Dataset, BaselineOnly
from surprise.model_selection import train_test_split, cross_validate
from joblib import load

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
    request_user = int(request.GET.get('mid', None))
    request_beer_list = request.GET.get('beers', None)
    candidate = list(set(request_beer_list.split(',')))

    filter_query = Q()
    for id in candidate:
        filter_query |= Q(beer = int(id))

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
            "n_epochs": 500
        }
        algo = BaselineOnly(bsl_options=bsl_options)

        # 데이터 형태 안바꾸면 계산도 못하게함;;
        trainset = data.build_full_trainset()
        algo.fit(trainset)

        # 계산된 예측으로 순위 매기기
        result = []
        for i in candidate:
            result.append(
                {
                    'iid':int(i),
                    'estimate':algo.predict(uid=request_user, iid=int(i)).est,
                }
            )
        
        result = sorted(result, key=lambda x:x['estimate'], reverse=True)
        # 요구가 바뀜, id만 달래요
        result_id = [i['iid'] for i in result]

        # 가져온 데이터로 작업 실행
        return Response(result_id)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT'])
def initialize(request):
    if request.method == "POST":
        member_id = request.POST.get('member_id')
        prefer_beer_data = Preference.objects.filter(member = member_id).select_related('beer')
        serializer = BeerPreferenceSerializer(prefer_beer_data, many=True)

        # json df화 및 컬럼명 변경
        df = pd.json_normalize(serializer.data)
        df['overall'] = 15
        df = df[['overall', 'member', 'beer.abv', 'beer.country', 'beer.large_category', 'beer.review_count', 'beer.sub_category']]
        df.columns = ['overall', 'member_id', 'abv', 'country', 'large_category', 'review_count', 'sub_category']

        # joblib 파일 있을때 전처리하기
        numeric_data = df.drop(columns=['country', 'large_category', 'sub_category'])
        encoder = load('./beer_review_encoder.joblib')
        encoding_beer = encoder.transform(df[['country', 'large_category', 'sub_category']])
        encoded_categories_beer = pd.DataFrame(encoding_beer, columns=encoder.get_feature_names_out(input_features=['country', 'large_category', 'sub_category']))
        transformed = pd.concat([numeric_data, encoded_categories_beer], axis=1)

        sumdata = transformed.groupby("member_id").sum()
        sumdata['divide_size'] = transformed.groupby('member_id').size()

        # 데이터 저장하기
        print(sumdata.to_dict(orient='index'))
        serializer = LearningDatasetSerializer(data=sumdata.to_dict(orient='index'))
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            print('false.....................................')

        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)