from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from datetime import datetime
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import *
import pytz
from django.utils import timezone

# ? esto es para la pagination
from rest_framework.pagination import LimitOffsetPagination


def index(request):
    return render(request, "network/index.html")


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
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
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
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@api_view(["GET", "POST", "PATCH"])
@ensure_csrf_cookie
def posts(request):
    if request.method == "GET":
        # inicializas la clase de pagination
        pagination_class = LimitOffsetPagination()
        posts = Post.objects.all().order_by("-timestamp")
        # dentro de la clase llamas al metodo paginate_queryset
        paginated_posts = pagination_class.paginate_queryset(posts, request)
        
        serializer = PostSerializer(
            paginated_posts, many=True, context={"request": request}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)
        # post_list= []
        # for post in posts:
        #     serializer_post_data = PostSerializer(post).data
        #     if Like.objects.filter(user_mg=request.user.id, post=post, mg_state=True).exists():
        #         serializer_post_data['mg_state'] = True
        #     else:
        #         serializer_post_data['mg_state'] = False

        #     dt = datetime.strptime(str(post.timestamp.replace(tzinfo=None)), '%Y-%m-%d %H:%M:%S')
        #     formatted_dt = dt.strftime('%b %d, %Y, %I:%M %p')

        #     serializer_post_data["timestamp"] = formatted_dt
        #     post_list.append(serializer_post_data)

        return Response(post_list, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        content = data.get("content")
        timestamp = data.get("timestamp")
        print(timestamp)

        if not content:
            return Response(
                {"error": "Content is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        timestamp = datetime.strptime(timestamp, "%d/%m/%Y, %H:%M:%S")
        timestamp = timezone.make_aware(timestamp, timezone=pytz.UTC)

        Post.objects.create(
            user_poster=request.user,
            content=content,
            timestamp=timestamp,
        )

        # serializer = PostSerializer(Post, many=False)
        return Response({"message": "success"}, status=status.HTTP_200_OK)

    if request.method == "PATCH":
        data = request.data
        content = data.get("content")
        pk = data.get("pk")

        post = Post.objects.filter(pk=pk).first()
        post.content = content
        post.save()
        return Response(status=status.HTTP_200_OK)


#! return Response(user_serializer.errors)


@api_view(["GET", "POST"])
def profile(request, user_profile_name):
    user_profile = get_object_or_404(User, username=user_profile_name)

    if request.method == "GET":
        # ? aca como tenes properties, podes llamar asi:
        followers_count = user_profile.followers_count
        following_count = user_profile.following_count

        is_follower = False
        if user_profile.followers.filter(id=request.user.id).exists():
            is_follower = True

        posts = Post.objects.filter(user_poster=user_profile).order_by("-timestamp")
        serializer = PostSerializer(posts, many=True, context={"request": request})

        response_data = {
            "posts": serializer.data,
            "followers_count": followers_count,
            "following_count": following_count,
            "is_follower": is_follower,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        is_follow_user = request.data.get("is_follow_user")

        if is_follow_user:
            user_profile.followers.add(request.user)
            request.user.following.add(user_profile)
            message = "Successfully followed user."
        else:
            user_profile.followers.remove(request.user)
            request.user.following.remove(user_profile)
            message = "Successfully unfollowed user."

        return Response({"message": message}, status=status.HTTP_200_OK)


# ? por defecto many es false, no hace falta que lo escribas
# ? Post.objects.get(user_poster=user_profile_id) can be useful if you know that there is exactly one Post object with a user_poster value of user_profile_id and you want to retrieve it directly. However, if there are multiple objects or you're not sure if there is any matching object, it's generally safer to use filter method or first method to get a queryset and then handle the queryset accordingly.


@api_view(["PUT"])
def post_edit(request, pk):
    # if request.method== "GET":
    #     post = Post.objects.get(id=pk)
    #     serializer = PostSerializer(post, many=False)
    #     return Response(serializer.data)
    if request.method == "PUT":
        data = request.data
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
def like(request, post_pk):
    if request.method == "PATCH":
        print(request.data.get("is_mg_positive"))

        try:
            # Validate the input
            post_pk = int(post_pk)
            post = Post.objects.filter(pk=post_pk).first()
            is_positive_mg = bool(request.data.get("is_mg_positive"))
        except (ValueError, TypeError):
            # Invalid input
            return Response(
                {"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST
            )

        if is_positive_mg:
            Like.objects.create(
                user_mg=request.user,
                post=post,
                mg_state=True,
            )
        else:
            post_to_modify = Like.objects.get(
                user_mg=request.user,
                post=post_pk,
            )
            post_to_modify.mg_state = False
            post_to_modify.save()

        # Return success response
        return Response(
            {"message": "Like updated successfully"}, status=status.HTTP_200_OK
        )


# ?PUT is used to update a resource with a complete replacement of the existing data. This means that when you use PUT to update a resource, you replace the entire resource with the new data you provide. This method is typically used when you want to update all the fields of a resource at once.

# ? PATCH, on the other hand, is used to update a resource with a partial replacement of the existing data. This means that when you use PATCH to update a resource, you only update the fields that you specify in the request. This method is typically used when you want to update only a few fields of a resource, or when you want to apply a partial update to a resource without affecting other fields.


@api_view(["GET"])
def user_request(request):
    if request.method == "GET":
        usuario = str(request.user)
        # usuario = "genaro"
        return Response({"usuario": usuario})


@api_view(["GET"])
def following(request):

    # watcher = request.user.id
    # ! poner esto enves del 2

    # agarras al query set de followPerfil que el user sea igual a quien hizo la consulta
    follow_profile_model = User.objects.filter(user=2).first()

    # agarras todos los usuarios que sigue este determinado usuario
    try:
        following_users = follow_profile_model.following.all()
    except AttributeError:
        return Response({"message": "no users following"}, status=status.HTTP_200_OK)

    # agarras todos los posts que hicieron los usuario que sigue esta persona.
    posts = Post.objects.filter(user_poster__in=following_users).order_by("-timestamp")

    # ? __in is used in queries to filter objects that match a condition from a list of values. por ej. Model.objects.filter(field__in=[value1, value2, ...])

    serializer = PostSerializer(posts, many=True, context={"request": request}).data
    # post_list= []
    # for post in posts:
    #     serializer_post_data = PostSerializer(post).data
    #     if Like.objects.filter(user_mg=request.user.id, post=post, mg_state=True).exists():
    #         serializer_post_data['mg_state'] = True
    #     else:
    #         serializer_post_data['mg_state'] = False

    #     dt = datetime.strptime(str(post.timestamp.replace(tzinfo=None)), '%Y-%m-%d %H:%M:%S')
    #     formatted_dt = dt.strftime('%b %d, %Y, %I:%M %p')

    #     serializer_post_data["timestamp"] = formatted_dt
    #     post_list.append(serializer_post_data)

    return Response(serializer, status=status.HTTP_200_OK)


# ? por más que no vayas a usar un get y quieras hacer solo un put esta bueno en desarrolo ponerlo para ver si estas agarrando los datos que queres.


# ?prefetch_related This way, the function retrieves all the relevant data with just one query, and then uses Python to filter the results. This is more efficient and faster than querying the database for each post. Reduce the number of queries to the database and to improve the performance of our application.
# ?    # likes tiene que ser un field dentro de post
#  ?   posts = Post.objects.all().order_by('-timestamp').prefetch_related('likes')
