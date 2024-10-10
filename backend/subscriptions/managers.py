from django.db import transaction
from django.utils import timezone
from .models import Subscription, Credit, CreditTransaction, Payment

class SubscriptionManager:
    @staticmethod
    @transaction.atomic
    def create_subscription(user, plan, paddle_subscription_id, payment_amount, paddle_payment_id, start_date=None):
        start_date = start_date or timezone.now()
        end_date = start_date + timezone.timedelta(days=plan.duration_days)
        
        subscription = Subscription.objects.create(
            user=user,
            plan=plan,
            start_date=start_date,
            end_date=end_date,
            paddle_subscription_id=paddle_subscription_id
        )
        
        Payment.objects.create(
            subscription=subscription,
            amount=payment_amount,
            paddle_payment_id=paddle_payment_id
        )
        
        Credit.objects.create(
            user=user,
            subscription=subscription,
            amount=plan.credits,
            expires_at=end_date
        )
        
        return subscription

    @staticmethod
    @transaction.atomic
    def renew_subscription(subscription, payment_amount, paddle_payment_id):
        old_end_date = subscription.end_date
        subscription.end_date = old_end_date + timezone.timedelta(days=subscription.plan.duration_days)
        subscription.save()

        Payment.objects.create(
            subscription=subscription,
            amount=payment_amount,
            paddle_payment_id=paddle_payment_id
        )

        # Expire old credits
        Credit.objects.filter(subscription=subscription, expires_at=old_end_date).update(expires_at=timezone.now())

        # Create new credits
        Credit.objects.create(
            user=subscription.user,
            subscription=subscription,
            amount=subscription.plan.credits,
            expires_at=subscription.end_date
        )

    @staticmethod
    def cancel_subscription(subscription):
        subscription.is_active = False
        subscription.end_date = timezone.now()
        subscription.save()

        # Expire all credits associated with this subscription
        Credit.objects.filter(subscription=subscription, expires_at__gt=timezone.now()).update(expires_at=timezone.now())

class CreditManager:
    @staticmethod
    def get_user_credits(user):
        return Credit.objects.filter(
            user=user,
            expires_at__gt=timezone.now()
        ).order_by('expires_at')

    @staticmethod
    @transaction.atomic
    def use_credits(user, amount, description):
        credits = CreditManager.get_user_credits(user)
        total_available = sum(credit.remaining for credit in credits)
        print(total_available, 'total available')
        if total_available < amount:
            return False

        remaining_to_use = amount
        for credit in credits:
            if remaining_to_use <= 0:
                break

            use_from_this_credit = min(credit.remaining, remaining_to_use)
            credit.used_amount += use_from_this_credit
            credit.save()

            CreditTransaction.objects.create(
                user=user,
                credit=credit,
                amount=-use_from_this_credit,
                description=description
            )

            remaining_to_use -= use_from_this_credit

        return True

    @staticmethod
    def get_credit_balance(user):
        credits = CreditManager.get_user_credits(user)
        return sum(credit.remaining for credit in credits)

    @staticmethod
    def get_credit_history(user):
        return CreditTransaction.objects.filter(user=user).order_by('-created_at')
    
