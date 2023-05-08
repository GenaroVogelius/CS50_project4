# Generated by Django 4.2.1 on 2023-05-07 23:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0024_remove_like_post_like_post"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="followers",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="followers_of",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="following",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="following_of",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.DeleteModel(
            name="FollowPerfil",
        ),
    ]