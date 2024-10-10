# message/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ScheduledMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField(blank=True, null=True)
    voice_message = models.FileField(upload_to='voice_messages/', blank=True, null=True)
    scheduled_time = models.DateTimeField()
    sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message for {self.user.email} scheduled at {self.scheduled_time}'
