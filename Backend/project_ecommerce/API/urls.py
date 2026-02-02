from django.urls import path
from .views import ProductAPI,UserAPI
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('product/API/',ProductAPI.as_view(),name='product_api'),
    path('product/API/<uuid:id>/',ProductAPI.as_view(),name='product_api_id'),
    path('user/API/', UserAPI.as_view(),name='user_api'),
    path('user/API/<uuid:id>/',UserAPI.as_view(),name='user_api_id'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)