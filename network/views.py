import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from django import forms

from .models import User, Post

#django form not used - javascript request instead for now
#class NewPostForm(forms.Form):
    #post = forms.CharField(widget=forms.Textarea(attrs={"rows":"5"}))



def index(request):
    return render(request, "network/index.html")


def load_posts(request):
    #load posts from get request
    posts = Post.objects.all()
    posts = posts.order_by("-timestamp").all()
    return JsonResponse([post.serialize() for post in posts], safe=False)


@csrf_exempt
def new_post(request):
    #new post must be created via POST request:
    if request.method != "POST":
        return JsonResponse({ "error": "Post request required"}, status=400)
    
    #get details of post
    data = json.loads(request.body)
    post_body = data.get("post_body", "")

    if len(post_body) <= 0:
        return JsonResponse({"error":"Post requires text"}, status=400)

    #create new post
    post_obj = Post(
        user = request.user,
        body = post_body
    )
    post_obj.save()

    return JsonResponse({"message":"Post added successfully"}, status=201)

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
