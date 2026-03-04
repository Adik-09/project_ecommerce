from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart,Order,OrderItem
from .serializers import cartSerializer,OrderSerializer
from rest_framework.permissions import IsAuthenticated  
from django.shortcuts import get_object_or_404

class myCart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cartData = Cart.objects.filter(user=request.user)
        serializer = cartSerializer(cartData,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = cartSerializer(
            data=request.data,
            context={'request': request}
            )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

    def patch(self, request, pk=None):
        cart_item = get_object_or_404(
            Cart,
            pk=pk,
            user=request.user
        )

        quantity = request.data.get('quantity')
        if quantity is not None:
            cart_item.quantity = quantity
            cart_item.total_price = cart_item.product.price * quantity
            cart_item.save()

        serializer = cartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        cart_item = get_object_or_404(
            Cart,
            pk=pk,
            user=request.user
        )

        cart_item.delete()

        return Response(
            {"message": "Product deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

class OrderAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        cart_items = Cart.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        address_id = request.data.get('address')
        if not address_id:
            return Response(
                {"error": "Address is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        from API.models import UserAddress
        address = get_object_or_404(UserAddress, id=address_id, user=request.user)

        total = sum(item.total_price for item in cart_items)

        order = Order.objects.create(
            user=request.user,
            address=address,
            total_price=total
        )

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart_items.delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk, user=request.user)

        if order.status in ['shipped', 'delivered', 'cancelled']:
            return Response(
                {"error": f"Cannot cancel order with status '{order.status}'"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = 'cancelled'
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
