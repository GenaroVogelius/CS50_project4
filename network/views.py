from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import  render
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


@api_view(["POST"])
def login_view(request):
    # Attempt to sign user in
    data = request.data
    username = data.get("username")
    password = data.get("password")
    user = authenticate(request, username=username, password=password)
    
    # Check if authentication successful
    if user is not None:
        login(request, user)
        return Response({"is_log_in":"true"}, status=status.HTTP_200_OK)
    else:
        return Response({"is_log_in": "false",}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def logout_view(request):
    logout(request)
    return Response({"LOG": "log out succesfull"}, status=status.HTTP_200_OK)

@api_view(["POST"])
def register(request):
    data = request.data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response({"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
        
    login(request, user)
    return Response({"message":"true"}, status=status.HTTP_200_OK)



@api_view(["GET", "POST", "PATCH"])
def posts(request):
    if request.method == "GET":
        

        # inicializas la clase de pagination
        pagination_class = LimitOffsetPagination()
        posts = Post.objects.all().order_by("-timestamp")
        posts_count = posts.count()
        # dentro de la clase llamas al metodo paginate_queryset, que recibe como primer parametro que es lo que va a devolver y como segundo parametro la request, dentro de la request va a haber algo llamado offset que seria desde donde te trae data, por ej posts/?offset=7 te trae los post desde el 7 en adelante.

        paginated_posts = pagination_class.paginate_queryset(posts, request, request.path_info)
        # en paginated posts se guardan esos posts y los serializas abajo

        
        serializer = PostSerializer(
            paginated_posts, many=True, context={"request": request, "posts_count": posts_count}
        )
        
        
        return Response({"posts":serializer.data}, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        content = data.get("content")
        timestamp = data.get("timestamp")
        

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

        pagination_class = LimitOffsetPagination()
        posts = Post.objects.filter(user_poster=user_profile).order_by("-timestamp")
        posts_count = posts.count()
        # paginated_posts = pagination_class.paginate_queryset(posts, request)
        paginated_posts = pagination_class.paginate_queryset(posts, request, request.path_info)


        serializer = PostSerializer(paginated_posts, many=True, context={"request": request, "posts_count": posts_count})

        response_data = {
            "posts": serializer.data,
            "followers": followers_count,
            "following": following_count,
            "is_follower": is_follower,
        }
            
        
        return Response(response_data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        is_follow_user = request.data.get("is_follow_user")
        user_profile_name = request.data.get("profile")
        user_profile_id = get_object_or_404(User, username=user_profile_name)


        if is_follow_user:
            user_profile_id.followers.add(request.user)
            request.user.following.add(user_profile_id)
            message = "Successfully followed user."
        else:
            user_profile_id.followers.remove(request.user)
            request.user.following.remove(user_profile_id)
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
        # usuario = "request.user"
        return Response({"usuario": usuario})


@api_view(["GET"])
def following(request):
    watcher = request.user.id
    # ! poner esto enves del 2

    # agarras al query set de followPerfil que el user sea igual a quien hizo la consulta
    follow_profile_model = User.objects.filter(id=watcher).first()

    # agarras todos los usuarios que sigue este determinado usuario
    
    following_users = follow_profile_model.following.all()

    # agarras todos los posts que hicieron los usuario que sigue esta persona.
    posts = Post.objects.filter(user_poster__in=following_users).order_by("-timestamp")

    
    if not posts:
        return Response({"message": "It seems that there are not any posts"})

    
    # ? __in is used in queries to filter objects that match a condition from a list of values. por ej. Model.objects.filter(field__in=[value1, value2, ...])

    serializer = PostSerializer(posts, many=True, context={"request": request})
    

    return Response({"posts":serializer.data}, status=status.HTTP_200_OK)


# ? por más que no vayas a usar un get y quieras hacer solo un put esta bueno en desarrolo ponerlo para ver si estas agarrando los datos que queres.


# ?prefetch_related This way, the function retrieves all the relevant data with just one query, and then uses Python to filter the results. This is more efficient and faster than querying the database for each post. Reduce the number of queries to the database and to improve the performance of our application.
# ?    # likes tiene que ser un field dentro de post
#  ?   posts = Post.objects.all().order_by('-timestamp').prefetch_related('likes')
