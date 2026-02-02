from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import userData,Product
from .serializers import userSerializer,productSerializer 

@method_decorator(csrf_exempt, name='dispatch')
class ProductAPI(APIView):

    def get(self, request, id=None):
        if id is None:
            products = Product.objects.all()
            serializer = productSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        product = get_object_or_404(Product, id=id)
        serializer = productSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = productSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        if id is None:
            return Response(
                {"error": "Id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=id)
        product.delete()
        return Response(
            {"message": "Product deleted successfully"},
            status=status.HTTP_200_OK
        )

    def patch(self, request, id=None):
        if id is None:
            return Response(
                {"error": "Id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=id)
        serializer = productSerializer(
            product,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class UserAPI(APIView):

    def get(self, request, id=None):
        if id is None:
            users = userData.objects.all()
            serializer = userSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        user = get_object_or_404(userData, id=id)
        serializer = userSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, id=None):
        if id is None:
            return Response(
                {"error": "Id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = get_object_or_404(userData, id=id)
        user.delete()
        return Response(
            {"message": "User deleted successfully"},
            status=status.HTTP_200_OK
        )

    def patch(self, request, id=None):
        if id is None:
            return Response(
                {"error": "Id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = get_object_or_404(userData, id=id)
        serializer = userSerializer(
            user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
