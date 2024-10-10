
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
import hmac
import hashlib
from .managers import CreditManager


class CreditDetailsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        credit_balance = CreditManager.get_credit_balance(user)
        credit_history = CreditManager.get_credit_history(user)
        return Response({
            'credit_balance': credit_balance,
            'credit_history': [
                {
                    'amount': transaction.amount,
                    'description': transaction.description,
                    'created_at': transaction.created_at
                } for transaction in credit_history
            ]
        })

class PaddleWebhookView(APIView):
    permission_classes = (permissions.AllowAny,)

    def verify_paddle_signature(self, request):
        paddle_public_key = settings.PADDLE_PUBLIC_KEY
        signature = request.data.pop('p_signature', None)
        
        if not signature:
            return False

        # Sort the data
        sorted_data = sorted(request.data.items())
        serialized_data = '|'.join([f"{k}={v}" for k, v in sorted_data])

        # Verify the signature
        signature = signature.encode('utf-8')
        verification = hmac.new(paddle_public_key.encode('utf-8'), serialized_data.encode('utf-8'), hashlib.sha1)
        return hmac.compare_digest(signature, verification.hexdigest().encode('utf-8'))

    def post(self, request):
        if not self.verify_paddle_signature(request):
            return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

        alert_name = request.data.get('alert_name')
        if alert_name == 'subscription_created':
            user = User.objects.get(email=request.data.get('email'))
            plan = SubscriptionPlan.objects.get(paddle_plan_id=request.data.get('subscription_plan_id'))
            SubscriptionManager.create_subscription(
                user=user,
                plan=plan,
                paddle_subscription_id=request.data.get('subscription_id'),
                payment_amount=request.data.get('initial_payment'),
                paddle_payment_id=request.data.get('order_id')
            )
        elif alert_name == 'subscription_payment_succeeded':
            subscription = Subscription.objects.get(paddle_subscription_id=request.data.get('subscription_id'))
            SubscriptionManager.renew_subscription(
                subscription=subscription,
                payment_amount=request.data.get('payment_amount'),
                paddle_payment_id=request.data.get('order_id')
            )
        elif alert_name == 'subscription_cancelled':
            subscription = Subscription.objects.get(paddle_subscription_id=request.data.get('subscription_id'))
            SubscriptionManager.cancel_subscription(subscription.id)
        else:
            # Handle other webhook events as needed
            pass

        return Response({'status': 'success'})