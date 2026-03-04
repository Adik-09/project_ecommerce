from rest_framework import serializers
from .models import Product,userData,UserAddress

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=userData
        fields='__all__'

class addressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id','user','address_line']
        read_only_fields = ['user']
    