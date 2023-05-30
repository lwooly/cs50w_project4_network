
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<int:user_id>/", views.profile, name="profile"),
    path("following/<int:user_id>", views.following, name="following"),


    #API routes
    path("new_post", views.new_post, name="new_post"),
    path("load_posts/", views.load_posts, name="load_posts"),
    path("load_posts/<str:user_id>", views.load_posts, name="load_user_posts"),
    path("load_single/<str:post_id>", views.load_single, name="load_single"),
    path("follow", views.follow, name="follow"),
]
