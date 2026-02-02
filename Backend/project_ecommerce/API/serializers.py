from rest_framework import serializers
from .models import Product,userData

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=userData
        fields='__all__'
    