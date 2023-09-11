from django.urls import path, include

urlpatterns = [
    path('recommend/v1/', include('myrecommend.urls')),
]
