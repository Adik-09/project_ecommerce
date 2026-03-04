from django.db import models
from API.models import userData,Product,UserAddress

# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(userData,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.DecimalField(decimal_places=2,max_digits=10)

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('confirmed', 'Confirmed'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered'),
    ('cancelled', 'Cancelled'),
]

class Order(models.Model):
    user = models.ForeignKey(userData,on_delete=models.CASCADE)
    address = models.ForeignKey(UserAddress,on_delete=models.SET_NULL,null=True)
    total_price = models.DecimalField(decimal_places=2,max_digits=10)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2,max_digits=10)
