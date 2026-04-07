from django.db import models

# Create your models here.

class RoomType(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Room(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='rooms/')
    capacity = models.IntegerField()

    amenities = models.JSONField(blank=True, null=True)

    type = models.ForeignKey(
        RoomType,
        on_delete=models.CASCADE,
        related_name="rooms"
    )

    def __str__(self):
        return self.name


class Reservation(models.Model):
    room = models.ForeignKey("Room", on_delete=models.CASCADE, related_name="reservations",blank=True,null=True)
    name_surname = models.CharField(max_length=120,blank=True,null=True)
    
    email = models.EmailField(blank=True,null=True)
    phone_number = models.CharField(max_length=20,blank=True,null=True)

    check_in = models.DateField(blank=True,null=True)
    check_out = models.DateField(blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name_surname}"
    

class Contact(models.Model):
    SUBJECT_CHOICES = [
        ("general", "General Inquiry"),
        ("booking", "Booking Question"),
        ("request", "Special Request"),
        ("feedback", "Feedback"),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.subject}"

