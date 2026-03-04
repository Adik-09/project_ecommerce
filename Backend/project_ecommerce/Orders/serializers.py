from rest_framework import serializers
from .models import Cart,Order,OrderItem
from API.serializers import productSerializer
from API.models import Product

class cartSerializer(serializers.ModelSerializer):
    productDetails = productSerializer(source='product', read_only=True)
    class Meta:
        model = Cart
        fields = ['id','user','product','quantity','total_price','productDetails']
        read_only_fields = ['user', 'total_price']

    def create(self, validated_data):
        product = validated_data.get('product')
        quantity = validated_data.get('quantity')

        validated_data['total_price'] = product.price * quantity
        validated_data['user'] = self.context['request'].user

        return super().create(validated_data)

class OrderItemSerializer(serializers.ModelSerializer):
    productDetails = productSerializer(source='product', read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id','product','quantity','price','productDetails']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id','user','address','total_price','status','created_at','items']
        read_only_fields = ['user','total_price','status','created_at']
