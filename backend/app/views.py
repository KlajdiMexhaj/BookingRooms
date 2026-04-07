from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import generics
# Create your views here.

@api_view(['GET'])
def get_rooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ContactCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ContactSerializer
