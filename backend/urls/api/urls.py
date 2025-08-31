from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    
    path('user/',include('usermgmt.urls')),
    path('',include('events.urls')),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),   # login via JWT
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"), # refresh expired token
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"), 
]