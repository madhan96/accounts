from django.urls import path

from . import views

urlpatterns = [
    path("dashboard", views.index, name="indexuser"),
    path("postuser", views.postUser, name="postUser"),
    path("userjson", views.getdata, name="getUsers"),
]
