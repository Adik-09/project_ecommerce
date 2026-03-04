from django.urls import path
from .views import myCart,OrderAPI

urlpatterns = [
    path('snapmart/myCart/',myCart.as_view()),
    path('snapmart/myCart/<int:pk>/',myCart.as_view()),
    path('snapmart/orders/',OrderAPI.as_view()),
    path('snapmart/orders/<int:pk>/',OrderAPI.as_view()),
]