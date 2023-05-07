from django.contrib import admin
from .models import *
from django import forms

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ("id","username")

admin.site.register(User,UserAdmin)

class FollowForm(forms.ModelForm):
    class Meta:
        model = FollowPerfil
        fields = '__all__'
    
    def clean_followers(self):
        user = self.cleaned_data.get('user')
        followers = self.cleaned_data.get('followers')
        
        if followers.filter(pk=user.pk).exists():
            raise forms.ValidationError(f"{user} cannot be in the followers list, because users are not able to follow themselves.")
        
        return followers


@admin.register(FollowPerfil)
class MyModelAdmin(admin.ModelAdmin):
    form = FollowForm



class PostAdmin(admin.ModelAdmin):
    list_display = ("id","user_poster","content", "contadorMg", "timestamp")

admin.site.register(Post, PostAdmin)


class LikeAdmin(admin.ModelAdmin):
    list_display = ("user_mg", "mg_state", "post")

# esto es para que te muestre el id del post
    def post(self, obj):
        return ([str(post.id) for post in obj.post.all()])
    post.short_description = "Post ID"


admin.site.register(Like, LikeAdmin)