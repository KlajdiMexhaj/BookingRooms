from django.urls import path
from .views import get_rooms ,ReservationCreateView,ContactCreateView

urlpatterns = [
    path("rooms/", get_rooms, name="get_rooms"),
    path("reservations/", ReservationCreateView.as_view(), name='create-reservation'),
    path("contact/", ContactCreateView.as_view(), name="contact-message"),
]