from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def user_register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        phone = phone
    )

    return Response(
        {"message": "User registered successfully"},
        status=status.HTTP_201_CREATED
    )

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from API.serializers import userSerializer

class UserMeAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = userSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer = userSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
