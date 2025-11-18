from django.urls import path
from . import views
urlpatterns = [
    path('create-team/', views.create_team, name='create-team'),
    path('task/create/', views.create_new_team_task, name='create-team-task'),
    path('task/<int:id>/update/', views.update_team_task, name='update-team-task'),
    path('utils/get-users/', views.get_all_users, name='get-users'),
    path('get-teams/', views.get_teams, name='get-teams'),
    path('get-tasks/', views.get_tasks, name='get-tasks'),
    path('utils/<int:team_id>/ranking/', views.ranking_team_members, name='ranking_team_members'),  
]
