# Generated by Django 4.1.3 on 2023-04-20 21:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0019_remove_user_followers_remove_user_following_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="followers",
        ),
        migrations.RemoveField(
            model_name="user",
            name="following",
        ),
        migrations.CreateModel(
            name="FollowModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "follow_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="users_following",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "follower_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="users_follower",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
