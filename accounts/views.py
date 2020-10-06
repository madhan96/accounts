from django.shortcuts import render, redirect
from datetime import date
from django.http import HttpResponse, JsonResponse
from .serializers import UserSerializer
from accounts.models import User, UserType, get_usertype
import json

# Create your views here.
def getdata(request):
    if request.method == "POST":
        print(request)
        return JsonResponse({"result": "success"})

    data = UserSerializer(User.objects.all(), many=True).data

    return JsonResponse(data, safe=False)


def postUser(request):
    if request.method == "POST":

        json_data = json.loads(str(request.body, encoding="utf-8"))
        json_data["usertype"] = get_usertype(json_data["usertype"])
        json_data["email"] = "mad@gmail.com"
        password = json_data["password"]
        del json_data["password"]
        user = User(**json_data)
        user.set_password(password)
        user.save()
        return JsonResponse({"result": "success"})

    return JsonResponse({"result": "success"})


def getUser(request):
    if request.method == "POST":

        json_data = json.loads(str(request.body, encoding="utf-8"))

        data = UserSerializer(User.objects.get(pk=json_data[userid])).data
        return JsonResponse(data, safe=False)

    return JsonResponse({"result": "success"})


def index(request):
    return render(request, "index.html")

