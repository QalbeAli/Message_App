# message/tasks.py
from celery import shared_task
from django.core.mail import EmailMessage
from django.utils import timezone
from .models import ScheduledMessage
import logging
import mimetypes  # Importing mimetypes to determine the file type

logger = logging.getLogger(__name__)

@shared_task
def send_scheduled_email():
    scheduled_messages = ScheduledMessage.objects.filter(scheduled_time__lte=timezone.now(), sent=False)

    if not scheduled_messages.exists():
        logger.info("No scheduled messages to send.")
    
    for message in scheduled_messages:
        subject = 'Your Scheduled Message'
        email_body = message.message_text or "You have a new voice message"
        recipient = message.user.email

        # Prepare the email
        email = EmailMessage(
            subject,
            email_body,
            'from@example.com',  # Replace with your 'from' email address
            [recipient]
        )

        # Check if there is a voice message and attach it
        if message.voice_message:
            logger.info(f"Attaching voice message {message.voice_message.name} to the email.")
            try:
                # Get the MIME type of the file
                mime_type, _ = mimetypes.guess_type(message.voice_message.path)

                # Open the file and read its contents
                with open(message.voice_message.path, 'rb') as f:
                    email.attach(message.voice_message.name, f.read(), mime_type or 'application/octet-stream')

                logger.info(f"Voice message {message.voice_message.name} attached successfully.")
            except Exception as e:
                logger.error(f"Error attaching voice message: {e}")
        else:
            logger.info(f"No voice message found for {recipient}.")

        try:
            # Send the email
            email.send()
            logger.info(f"Email sent to {recipient} with message: {email_body}")

            # Mark the message as sent
            message.sent = True
            message.save()
            logger.info(f"Message for {recipient} marked as sent.")
        except Exception as e:
            logger.error(f"Failed to send email to {recipient}: {str(e)}")
