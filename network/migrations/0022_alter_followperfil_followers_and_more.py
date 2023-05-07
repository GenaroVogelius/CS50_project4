# Generated by Django 4.1.3 on 2023-04-20 22:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0021_followperfil_delete_followmodel"),
    ]

    operations = [
        migrations.AlterField(
            model_name="followperfil",
            name="followers",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="following",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="followperfil",
            name="following",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="followers_of",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
