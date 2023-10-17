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
   
## 데이터 전처리 할때 썼던 명령어들

''' 리뷰 개수 세기
SELECT COUNT(*) AS cnt_1
FROM (
  SELECT beer_id, COUNT(*) AS cnt
  FROM beer_review
  GROUP BY beer_id
) AS subquery
WHERE cnt <= 5;
'''

''' table 구조 변경
ALTER TABLE test
ALTER COLUMN beer_beerid TYPE BIGINT
USING beer_beerid::BIGINT;
ALTER TABLE test
ALTER COLUMN beer_brewerid TYPE integer
USING beer_brewerid::integer;
ALTER TABLE test
ALTER COLUMN review_time TYPE bigint
USING review_time::BIGINT;
'''

''' brewer_id가 2개 이상인 데이터 찾기
SELECT beer_code
FROM beer_review
GROUP BY beer_code
HAVING COUNT(DISTINCT brewer_id) > 1;
'''

''' profilename찾고 앞에 숫자 부여하기
SELECT ROW_NUMBER() OVER (ORDER BY "profileName"), "profileName"
FROM (
	SELECT DISTINCT "profileName"
	FROM beer_review
) AS sub;
'''

'''  description이 null이 아닌 데이터 찾기
SELECT *
FROM beer_merged
WHERE description IS NOT NULL;
'''

''' 테이블에 데이터(무식하게) 넣기
INSERT INTO my_beer_test (beer_id, name, name_kor, large_category, sub_category, country, abv, brewerid, appearance, aroma, flavor, mouthfeel, overall, review_count, description)
SELECT "beer/beerId", "beer/name", NULL, NULL, "beer/style", country, "beer/ABV", "beer/brewerId", NULL, NULL, NULL, NULL, NULL, "count", description
FROM beer_merged;
'''

''' inner join 시킨 이후 겹치는 몇개 column만 업데이트
UPDATE beer_merge_test AS b
SET country = m.country,
    name_kor = m.name_kor
FROM (
	SELECT bc.country, bc.name_kor, bc.ratebeer_id
	FROM beer_copy AS bc
	INNER JOIN beer_merge_test AS bmt
	ON bc.ratebeer_id = bmt.ratebeer_id
) AS m
WHERE b.ratebeer_id = m.ratebeer_id;
'''

'''  subquery의 데이터를 무식하게 다른 테이블에 낑겨넣기
INSERT INTO beer_merge_test (beer_id, "name", name_kor, large_category, sub_category, country, abv, brewerid, appearance, aroma, flavor, mouthfeel, overall, review_count, description, ratebeer_id)
SELECT "ratebeer_id", "name", "name_kor", NULL, "class_name", country, "abv", NULL, NULL, NULL, NULL, NULL, NULL, 0, null, ratebeer_id
FROM (
	SELECT beer_copy.*
	FROM beer_copy
	LEFT JOIN beer_merge_test ON beer_copy.ratebeer_id = beer_merge_test.ratebeer_id
	WHERE beer_merge_test.ratebeer_id IS NULL
) AS plus_t;
'''

''' view 데이터
SELECT r.score*2 AS overall, r.member_id, b.abv, b.country, b.large_category, b.sub_category, b.review_count, r.created_at, r.beer_id
FROM review AS r
INNER JOIN beer AS b
ON r.beer_id = b.id;
'''

-- "sub_category" 열의 값을 기반으로 "large_category" 값을 설정
UPDATE my_beer_test
SET large_category = CASE
	
	-- wheat beer
   WHEN sub_category IN (
		'German Kristallweizen',
		'Bitter - Ordinary / Best',
		'Wheat Ale',
		'Belgian White &#40;Witbier&#41;',
		'German Hefeweizen',
		'Weizen Bock',
		'Dunkelweizen',
		'Dunkler Bock',
		'Eisbock',
		'Doppelbock',
		'Heller Bock'
	) THEN 'Wheat Beer'
	
	-- Lagers
   WHEN sub_category IN (
		'Oktoberfest/Märzen',
		'Dunkel',
		'Vienna',
		'Pilsener',
		'Bohemian Pilsener',
		'Classic German Pilsener',
		'Schwarzbier',
		'Strong Pale Lager/Imperial Pils',
		'Pale Lager',
		'Dortmunder/Helles',
		'Premium Lager',
		'Zwickel/Keller/Landbier',
		'American Dark Lager',
		'Malt Liquor'
	) THEN 'Lagers'
	
	-- Ales
	WHEN sub_category IN (
		'Scotch Ale',
		'California Common',
		'Sour Ale/Wild Ale',
		'Saison',
		'India Pale Ale &#40;IPA&#41;',
		'American Pale Ale',
		'Golden Ale/Blond Ale',
		'Amber Ale',
		'Abbey Dubbel',
		'English Pale Ale',
		'Belgian Strong Ale',
		'Barley Wine',
		'Altbier',
		'American Strong Ale',
		'Abt/Quadrupel',
		'Imperial/Double IPA',
		'Old Ale',
		'Abbey Tripel',
		'Bière de Garde',
		'Traditional Ale',
		'Brown Ale',
		'Belgian Ale',
		'Scottish Ale',
		'Black IPA',
		'Irish Ale',
		'Premium Bitter/ESB',
		'Bitter',
		'Cream Ale',
		'Mild Ale',
		'English Strong Ale',
		'Kölsch'
	) THEN 'Ales'
	
	-- Cider, Mead, Sake
	WHEN sub_category IN (
		'Cider',
		'Spice/Herb/Vegetable',
		'Ice Cider/Perry',
		'Saké - Infused',
		'Saké - Genshu',
		'Mead',
		'Perry',
		'Saké - Koshu',
		'Saké - Futsu-shu',
		'Saké - Ginjo',
		'Saké - Tokubetsu',
		'Saké - Nigori',
		'Saké - Namasaké',
		'Saké - Taru',
		'Saké - Honjozo',
		'Saké - Junmai',
		'Saké - Daiginjo'
	) THEN 'Cider, Mead, Sake'
	
	-- Sour Beer
	WHEN sub_category IN (
		'Lambic - Gueuze',
		'Lambic - Faro',
		'Lambic - Unblended',
		'Lambic - Fruit',
		'Berliner Weisse'
	) THEN 'Sour Beer'
	
	-- Other Styles
	WHEN sub_category IN (
		'Smoked',
		'Specialty Grain',
		'Fruit Beer',
		'Low Alcohol'
	) THEN 'Other Styles'
	
	-- Stout and Porter
	WHEN sub_category IN (
		'Foreign Stout',
		'Imperial Stout',
		'Porter',
		'Baltic Porter',
		'Stout',
		'Dry Stout',
		'Imperial/Strong Porter',
		'Sweet Stout'
	) THEN 'Stout and Porter'
	 
	 
    ELSE NULL  -- 기타 값에 대한 처리 (옵션)
END;
