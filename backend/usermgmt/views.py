from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
import logging

logger = logging.getLogger(__name__)


class LoginAPIView(APIView):
    
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")

            if not email or not password:
                logger.warning("Login attempt failed: Missing credentials")
                return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(request, email=email, password=password)
            if not user:
                logger.warning(f"Login failed for email: {email}")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            logger.info(f"User logged in successfully: {email}")
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Unexpected error during login for {email}: {e}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                logger.warning(f"Logout attempt failed: Missing refresh token for user")
                return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            
            logger.info(f"User logged out successfully")
            return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            
            logger.warning(f"Logout failed for user Invalid or expired token")
            return Response({"error": "Invalid or expired token", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            user = request.user
            logger.info(f"Profile accessed for user: {user}")
            return Response({
                "id": user.id,
                "email": user.email,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error fetching profile for {user}: {e}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
