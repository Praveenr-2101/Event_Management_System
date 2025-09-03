from .views import LoginAPIView, LogoutAPIView, ProfileAPIView
from django.urls import path

urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
]
