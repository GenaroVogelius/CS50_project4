from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from datetime import datetime
# aca de tus modelos te traes a note para ser serializaer, este proceso lo que hace es pasar los datos del model en formato json

# class AllSerializer(ModelSerializer):
#     class Meta:
#         # aca deberias escribir todos los modelos que quieras que sean serialize.
#         models = (User, Post, Like)
#         fields = '__all__'
#         # si no queres a all podes hacer una lista ["body", "updated"]
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class PostSerializer(ModelSerializer):
    user_poster = serializers.StringRelatedField()
    # serializers.IntegerField()
    class Meta:
        model = Post
        fields = '__all__'

    def to_representation(self, instance):
        # por cada modelo de post en el que se hace un get, entra a jugar este función.
        # aca en data tenes la automatización de key, value de lo que hayas especificado en fields de un modelo especifico
        data = super().to_representation(instance)

        # mg_state sera un boleano, donde del modelo Like filtrará a aquellos modelos que user_mg sean igual a request.user.id, como en views se lo estas pasando a ese dato por contexto te queria self.context..., despues que el post sea igual a la instanciación, Post tiene varios objetos y django rest los instancia a cada uno para ponerle la clave valor, al poner aca instance se hace referencia al numero de post que se esta llamando en esa instanciación, por ej.Post object (37), y despues busca que mg_state sea true, si encuentra que existe, devolverá un true, sino un false.
        mg_state = Like.objects.filter(user_mg=self.context['request'].user.id, post=instance, mg_state=True).exists()
        # a las key y values de este modelo serializado le agregas esto:
        data['mg_state'] = mg_state

        # aca haces la modifiacíon del timestamp.
        dt = datetime.strptime(str(instance.timestamp.replace(tzinfo=None)), '%Y-%m-%d %H:%M:%S')
        formatted_dt = dt.strftime('%b %d, %Y, %I:%M %p')
        data['timestamp'] = formatted_dt

        return data
        
class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class FollowSerializer(ModelSerializer):
    class Meta:
        model = FollowPerfil
        fields = '__all__'


    # def to_representation(self, instance):
    #     follow = super().to_representation(instance)
    #     follow['published_date'] = instance.follower_user.count()
    #     return representation