# Generated by Django 4.1.3 on 2023-04-20 19:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0013_alter_post_user_poster"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="followers",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="following_users",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="following",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="followers_users",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
