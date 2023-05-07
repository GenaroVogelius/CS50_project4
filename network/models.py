from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError


class User(AbstractUser):
    pass

    def __str__(self):
        return self.username


class FollowPerfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followers = models.ManyToManyField(
        User, related_name="followers_of", blank=True, null=True
    )
    following = models.ManyToManyField(
        User, related_name="following_of", blank=True, null=True
    )

    def __str__(self):
        return f"{self.user} has {self.followers.count()} followers and is following {self.following.count()}"


    # ? instead of llamar a count() en views.py podes hacer esto, @property decorator is used to define a method that can be accessed like a read-only attribute. It allows you to define a method on a class that can be called like an attribute, without having to include parentheses. Despues si pones print(follow_profile_model.followers_count) te sale.
    #? @property
    #? def followers_count(self):
    #?     return self.followers.count()



class Post(models.Model):
    user_poster = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="poster_uploaded"
    )
    content = models.TextField()
    timestamp = models.DateTimeField()
    contadorMg = models.PositiveIntegerField(default=0)

    def formatted_timestamp(self):
        return self.timestamp.strftime("%m/%d/%Y, %H:%M:%S")


class Like(models.Model):
    user_mg = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mg_user")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=True, blank=True, related_name="posts"
    )
    mg_state = models.BooleanField(default=False)

    # al guardarse en true el mg_state lo que haces es irte al post que se le di ese mg, a la propiedad contadorMg y sumarle 1.
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.mg_state == True:
            self.post.contadorMg += 1
            self.post.save()

        elif self.mg_state == False:
            self.post.contadorMg -= 1
            self.post.save()

            # al ponerle delete lo que haces es borrar el objeto del model Like de la base de datos, ya que no te sirve tener quienes sacaron el mg.
            self.delete()
