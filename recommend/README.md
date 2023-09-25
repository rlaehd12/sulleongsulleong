# version information
* django == 4.2.4
* python == 3.9.13
* djangorestframework==3.14.0

## ipynb파일들 그냥 읽기용으로 쓰는거

## db 관련

* DB 긁어오기
  * `python manage.py inspectdb > ./myrecommend/models.py`

* 인증 비활성화
  * `python manage.py migrate auth zero`
* 가짜 마이그레이트 하기
  * `python manage.py migrate --fake`


## docker 명령어
  * `docker build -t djangoserver .`

## 추천 시스템(뉴럴네트-웤)

* 목표 - 특정 사용자가 맥주에 매길 점수를 예측함

### 데이터

* 기본 테이블
  * review
  * beer
  * member
* 전처리 테이블, 뷰
  * review_beer_join - 리뷰와 맥주 합친 테이블
  * member_mean - 위 테이블을 임베딩해서 멤버를 기준으로 평균낸것

### 처리 과정

* 사용 데이터
  * 기본 멤버 정보(나이, 성별), 근데 못써먹음 이거
  * 맥주 정보
  * 멤버의 평균(현재까지의 추세?)

* 맥주의 정보를 임베딩, 멤버의 평균(임베딩 된 테이블 존재)와 합침
* mlpregressor을 통해 학습시킴
* 새로 들어오는 데이터에 대한 예측 시행
  * 예시 - 맥주 임베딩과 member_mean에 데이터를 합쳐서 모델로 예측하면 끝!
    * 맥주 임베딩도 저장해야겠다