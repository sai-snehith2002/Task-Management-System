from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255, default='Null')
    email = models.EmailField(max_length=255, default='Null', blank=True)
    name = models.CharField(max_length=255, default='Null', blank=True)
    about = models.CharField(max_length=255, default='Null', blank=True)

    def __str__(self):
        return self.username

class PersonalTask(models.Model):
    STATUS = (
        ('INCOMPLETE', 'incomplete'),
        ('ONGOING', 'ongoing'),
        ('COMPLETED', 'completed')
    )
    IMPORTANCE_STATUS = (
        ('REGULAR', 'regular'),
        ('IMPORTANT', 'important'),
        ('URGENT', 'urgent')
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='Null')
    description = models.CharField(max_length=255, default='Null')
    status = models.CharField(max_length=255, default='NUll', choices=STATUS)
    importance = models.CharField(max_length=255, default='Null', choices=IMPORTANCE_STATUS)
    created_at = models.DateTimeField(auto_now_add=True)
    end_by = models.DateField(blank=True)

    def __str__(self):
        return f"{self.user} for title {self.title}"

