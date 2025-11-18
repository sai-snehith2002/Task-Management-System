from django.contrib import admin
from .models import CustomUser, PersonalTask

admin.site.register(CustomUser)
admin.site.register(PersonalTask)