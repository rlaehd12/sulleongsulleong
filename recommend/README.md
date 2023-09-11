# version information
* django == 4.2.4
* python == 3.9.13
* djangorestframework==3.14.0

## db 관련

* DB 긁어오기
  * `python manage.py inspectdb > models.py`

* 인증 비활성화
  * `python manage.py migrate auth zero`
* 가짜 마이그레이트 하기
  * `python manage.py migrate --fake`


## docker 명령어
  * `docker build -t djangoserver .`