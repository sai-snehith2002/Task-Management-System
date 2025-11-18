from django.contrib import admin
from .models import Team, TeamTask, TeamTaskCompletion
admin.site.register(Team)
admin.site.register(TeamTask)
admin.site.register(TeamTaskCompletion)
# Register your models here.
