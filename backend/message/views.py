# message/views.py
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from .models import ScheduledMessage
from django.core.mail import send_mail
from django.conf import settings
import logging
import pytz  # Importing pytz for timezone awareness

logger = logging.getLogger(__name__)

class ScheduleMessageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        message_text = request.data.get('message_text', '')
        voice_message = request.FILES.get('voice_message')
        scheduled_time = request.data.get('scheduled_time')

        # Validate the scheduled time
        if not scheduled_time:
            return Response({'error': 'Scheduled time is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert the scheduled_time to a timezone-aware datetime (assuming UTC)
            scheduled_time = timezone.datetime.strptime(scheduled_time, '%Y-%m-%d %H:%M:%S')
            scheduled_time = timezone.make_aware(scheduled_time, timezone=pytz.UTC)
        except ValueError:
            return Response({'error': 'Invalid scheduled time format. Use YYYY-MM-DD HH:MM:SS.'}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the scheduled time is in the future
        if scheduled_time <= timezone.now():
            return Response({'error': 'Scheduled time must be in the future.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the scheduled message
        scheduled_message = ScheduledMessage.objects.create(
            user=user,
            message_text=message_text,
            voice_message=voice_message,
            scheduled_time=scheduled_time
        )

        logger.info(f"Message scheduled for user {user.email} at {scheduled_time}")
        return Response({'message': 'Message scheduled successfully.'}, status=status.HTTP_201_CREATED)
