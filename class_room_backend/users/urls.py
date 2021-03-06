from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, CustomAuthToken, GetUserByCourse

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('token-auth/', CustomAuthToken.as_view()),
    path('user_by_course/', GetUserByCourse.as_view()),
]