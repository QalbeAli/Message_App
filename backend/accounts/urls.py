from django.urls import path
from .views import GoogleLoginView, OTPLoginView

urlpatterns = [
    path('otp-login/', OTPLoginView.as_view(), name='otp-login'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
]