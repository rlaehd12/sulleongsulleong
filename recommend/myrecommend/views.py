from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Beer, Review, Preference, LearningDataset
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
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler


# Create your views here.
@api_view(['GET', 'POST', 'PUT'])
def beerindex(request):
    if request.method == "GET":
        beerlist = get_list_or_404(Beer)
        serializer = BeerSerializer(beerlist, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT'])
def ranktest(request):
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
    if request.method == "GET":
        member_id = request.GET.get('mid')
        try: 
            # 기존 데이터 시도하면 아무것도 안하고 끝냄
            LearningDataset.objects.get(member_id=member_id)
            return Response(status=status.HTTP_200_OK)
        except:
            prefer_beer_data = Preference.objects.filter(member = member_id).select_related('beer')
            if len(prefer_beer_data) == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)
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
            # inspectdb 명령이 왜인지 전부 lower case로 바꾸고 있었음, 모듈에서 lower 일단 삭제함, 나중에 다시 돌려놓을 것
            # 위치 - django.core.management.commands.inspectdb
            # 큰일남, 판다스가 db에 저장하면서 열 이름이 자기 마음대로 바뀜, serializer가 바뀐 column이름을 파악하지 못함
            # 어쩔수 없이 장고 안쓰고 그냥 pandas기능으로 db에 바로 저장함...
            # sumdata.columns = sumdata.columns.str.replace(' ', '_')
            # serializer = LearningDatasetSerializer(data=sumdata.to_dict(orient='records')[0])
            # if serializer.is_valid():
            #     return Response(serializer.data)

            # db에 전처리된 데이터 저장하기
            from sqlalchemy import create_engine
            engine = create_engine('postgresql://sulleong:Sulleong104**@postgres-for-docker:5432/sulleong')
            sumdata.to_sql(name='learning_dataset', con=engine, if_exists='append')

        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT'])
def re_ranking(request):
    # Q 객체를 사용하여 OR 연산 수행
    request_user = int(request.GET.get('mid', None))
    request_beer_list = request.GET.get('beers', None)
    candidate = list(set(request_beer_list.split(',')))

    # 설문 하지 않은 경우
    if candidate[0] == '':
        return Response(data='please do survey', status=status.HTTP_400_BAD_REQUEST)

    filter_query = Q()
    for id in candidate:
        filter_query |= Q(id = int(id))

    # 데이터 요청
    if request.method == "GET":
        # 맥주 데이터 데이터프레임화
        beer_list = Beer.objects.filter(filter_query).prefetch_related()
        serializer = BeerSerializer(beer_list, many=True)
        beer_list = pd.DataFrame(serializer.data)
        beer_list = beer_list[['id', 'abv', 'country', 'large_category', 'sub_category']]
        # 유저 리뷰 평균 데이터프레임화 및 없는 유저시 400 반환
        try:
            learningData = LearningDataset.objects.get(member_id=request_user)
        except Exception as e:
            print(e)
            return Response(data='please give right member', status=status.HTTP_400_BAD_REQUEST)
        serializer = LearningDatasetSerializer(learningData)
        user_data = pd.DataFrame([serializer.data])

        # 유저 리뷰 덧셈이니까 나누기
        user_data = user_data.drop(columns=['member_id'])
        user_data = user_data.div(user_data['divide_size'], axis=0)
        user_data = user_data.drop(columns='divide_size')

        # 맥주 데이터 인코딩
        # joblib 파일 있는걸로 전처리하기
        numeric_data = beer_list.drop(columns=['large_category', 'sub_category', 'country'])
        encoder = load('./beer_encoder.joblib')
        encoding_beer = encoder.transform(beer_list[['large_category', 'sub_category', 'country']])
        encoded_categories_beer = pd.DataFrame(encoding_beer, columns=encoder.get_feature_names_out(input_features=['large_category', 'sub_category', 'country']))
        
        # 이제 예측을 위한 모양으로 합치기
        user_data = user_data.loc[user_data.index.repeat(len(candidate))].reset_index(drop=True)
        transformed = pd.concat([numeric_data, user_data, encoded_categories_beer], axis=1)
        candidate = transformed['id']
        transformed =transformed.drop(columns=['id'])

        # 스케일링 적용
        scaler = load('./model_scaler.joblib')
        X = transformed.values
        try:
            X = scaler.transform(X)
        except Exception as e:
            print(e)
            return


        # 예측
        regr = load('./model_regressor.joblib')
        my_predict = regr.predict(X[:])

        # 결과 반환
        result = []
        for i in range(len(candidate)):
            result.append((candidate[i], my_predict[i]))

        result = sorted(result, key=lambda x:x[1], reverse=True)
        result_id = [i[0] for i in result]
        print(result)


        return Response(result_id)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
