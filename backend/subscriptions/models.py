from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import transaction
from django.core.exceptions import ValidationError
from datetime import timedelta
import uuid
from django.conf import settings


class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    credits = models.PositiveIntegerField()
    duration_days = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

class SubscriptionStatus(models.TextChoices):
    ACTIVE = 'active', 'Active'
    CANCELLED = 'cancelled', 'Cancelled'
    EXPIRED = 'expired', 'Expired'
    PAST_DUE = 'past_due', 'Past Due'

class Subscription(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=SubscriptionStatus.choices, default=SubscriptionStatus.ACTIVE, db_index=True)
    start_date = models.DateTimeField(db_index=True)
    end_date = models.DateTimeField(db_index=True)
    paddle_subscription_id = models.CharField(max_length=100, unique=True, db_index=True)
    total_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'status', 'end_date']),
            models.Index(fields=['paddle_subscription_id']),
        ]

class Payment(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(db_index=True)
    paddle_payment_id = models.CharField(max_length=100, unique=True, db_index=True)
    is_renewal = models.BooleanField(default=False, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['subscription', 'date', 'is_renewal']),
        ]

class Credit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='credits')
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='credits')
    amount = models.PositiveIntegerField()
    used_amount = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    @property
    def remaining(self):
        return max(0, self.amount - self.used_amount)

    @property
    def is_expired(self):
        return timezone.now() > self.expires_at

class CreditTransaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='credit_transactions')
    credit = models.ForeignKey(Credit, on_delete=models.CASCADE, related_name='transactions')
    amount = models.IntegerField()
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
