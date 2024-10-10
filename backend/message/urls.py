# message/urls.py
from django.urls import path
from .views import ScheduleMessageView

urlpatterns = [
    path('schedule/', ScheduleMessageView.as_view(), name='schedule_message'),
]
