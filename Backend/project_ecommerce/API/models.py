from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator

class userData(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=15, blank=True, null=True) 
    image = models.ImageField(upload_to='users/',null=True)

class UserAddress(models.Model):
    user = models.ForeignKey(userData, on_delete=models.CASCADE, related_name="addresses") 
    address_line = models.CharField(max_length=200)

class Product(models.Model):
    name = models.CharField(max_length=100) 
    desc = models.TextField()
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/',null=True)
    category = models.CharField(max_length=50,null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2,default=0)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(userData, on_delete=models.CASCADE) 
    comment = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )