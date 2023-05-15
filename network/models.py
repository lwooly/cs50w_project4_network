from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    follow = models.ManyToManyField("self", related_name="followers", blank=True)
    

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    body = models.CharField(max_length=140)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    
    def serialize(self):
        return {
        "id": self.id,
        "user_id": self.user.id,
        "username": self.user.username,
        "body": self.body,
        "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
        "likes": len(self.likes.all())
        }
