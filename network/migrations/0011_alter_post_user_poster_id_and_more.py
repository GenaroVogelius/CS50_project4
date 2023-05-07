# Generated by Django 4.1.3 on 2023-04-19 00:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("network", "0010_remove_post_user_poster_post_user_poster_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="user_poster_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="poster_uploaded_id",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="user_poster_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="poster_uploaded_name",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
