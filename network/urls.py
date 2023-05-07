
from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    


    # API rest
    path('posts/', views.posts, name="posts"),
    path('profile/<str:user_profile_name>', views.profile, name="profile"),
    path('postedit/<int:pk>', views.post_edit, name="post_edit"),
    path('postlike/<int:post_pk>', views.like, name="post_like"),
    path('user_request', views.user_request, name="user_request"),
    path('following', views.following, name="following"),
    


]




# path('', TemplateView.as_view(template_name='index.html')),