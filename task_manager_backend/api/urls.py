from django.urls import path
from . import views

urlpatterns = [
    path('user/register/', views.user_register, name='register'),
    path('user/login/', views.user_login, name='login'),
    path('user/logout/', views.user_logout, name='logout'),
    path('task/create/', views.create_new_task, name='create_task'),
    path('task/all/', views.get_all_tasks, name='all_tasks'),
    path('task/<int:pk>/', views.get_single_task, name='single_task'),
    path('task/delete/<int:pk>/', views.delete_task, name='delete_task'),
    path('task/update/<int:pk>/', views.update_task_status, name='update_task'),
    path('user/profile/', views.profile, name='profile'),
    path('user/analytics/', views.get_analytics, name='analytics'),
]
