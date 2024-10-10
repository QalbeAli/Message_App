# subscriptions/urls.py
from django.urls import path
from .views import CreditDetailsView, PaddleWebhookView

urlpatterns = [
    path('credit/details/', CreditDetailsView.as_view(), name='credit_details'),
    path('paddle/webhook/', PaddleWebhookView.as_view(), name='paddle_webhook'),
]
    