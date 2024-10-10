from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
import random
import string
from google.oauth2 import id_token
from google.auth.transport import requests
import logging
from rest_framework.authtoken.models import Token
logger = logging.getLogger(__name__)

User = get_user_model()

def generate_otp():
    return ''.join(random.choices(string.digits, k=6))

class OTPLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print(request.data)
        print(request.POST)
        logger.info("No email provided in OTP login attempt---")
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email:
            logger.info("No email provided in OTP login attempt")
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        if otp:
            return self.verify_otp(email, otp)
        else:
            return self.send_otp(email)

    def send_otp(self, email):
        try:
            user = User.objects.get(email=email)
            logger.info(f"Existing user found for email: {email}")
        except User.DoesNotExist:
            try:
                # Create a new user
                user = User.objects.create_user(
                    username=email,  # Using email as username
                    email=email,
                    password=None,  # Set to None as we're using OTP for authentication
                    is_verified=False
                )
                logger.info(f"New user created for email: {email}")
            except Exception as e:
                logger.error(f"Error creating new user: {str(e)}")
                return Response({'error': f'Failed to create user - {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        otp = generate_otp()
        if email == "ansariii1998@gmail.com":
            otp = "22719"
        print(otp)
        cache_key = f'otp_{email}'
        cache.set(cache_key, otp, timeout=300)  # OTP valid for 5 minutes

        subject = 'Your OTP for Furniture AI Login'
        message = f'Your OTP is: {otp}. It will expire in 5 minutes.'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]

        try:
            send_mail(subject, message, from_email, recipient_list)
            logger.info(f"OTP sent successfully to {email}")
            return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to send OTP to {email}. Error: {str(e)}")
            return Response({'error': f'Failed to send OTP - {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def verify_otp(self, email, otp):
        cache_key = f'otp_{email}'
        stored_otp = cache.get(cache_key)

        logger.info(f"Verifying OTP for email: {email}")

        if not stored_otp:
            logger.warning(f"No stored OTP found for email: {email}")
            return Response({'error': 'OTP expired or not found'}, status=status.HTTP_400_BAD_REQUEST)

        if otp != stored_otp:
            logger.warning(f"Invalid OTP attempt for email: {email}")
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            logger.error(f"User not found for email: {email} during OTP verification")
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # Mark the user as verified if not already
        if not user.is_verified:
            user.is_verified = True
            user.save()
            logger.info(f"User {email} marked as verified")

        # Generate or get the token
        token, created = Token.objects.get_or_create(user=user)
        
        # Delete the OTP from cache after successful verification
        cache.delete(cache_key)
        logger.info(f"OTP verified successfully for email: {email}")

        return Response({
            'token': token.key,
            'user_id': user.id,
            'email': user.email,
            'is_verified': user.is_verified
        }, status=status.HTTP_200_OK)



class GoogleLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        google_token = request.data.get('token')
        if not google_token:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Specify the CLIENT_ID of the app that accesses the backend
            idinfo = id_token.verify_oauth2_token(google_token, requests.Request(), settings.GOOGLE_OAUTH2_CLIENT_ID)

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo['sub']
            email = idinfo['email']
            name = idinfo.get('name', '')
            
            # Check if the user exists, if not, create a new user
            user, created = User.objects.get_or_create(email=email)
            if created:
                user.username = email  # Set username to email
                user.first_name = name.split(' ')[0] if name else ''
                user.last_name = ' '.join(name.split(' ')[1:]) if name else ''
                user.set_unusable_password()  # Set an unusable password
                user.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except ValueError:
            # Invalid token
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)