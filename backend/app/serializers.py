from rest_framework import serializers
from .models import *

class RoomSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = "__all__"