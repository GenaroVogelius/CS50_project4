# Generated by Django 4.1.3 on 2023-04-20 19:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0015_remove_user_followers_remove_user_following_follow"),
    ]

    operations = [
        migrations.AddField(
            model_name="follow",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
