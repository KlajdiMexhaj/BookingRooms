from rest_framework import serializers
from .models import *

class RoomSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = "__all__"

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
