from functools import partial
from msilib.schema import ReserveCost
import stat
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from .models import *
from .serializers import *
import datetime


@api_view(["POST"])
def user_register(request):
    if request.method == "POST":
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def user_login(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")

        user = None
        if "@" in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass
        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response(
            {"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
def user_logout(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response(
            {"message": "You are successfully logged out."},
            status=status.HTTP_200_OK,
        )
    return Response(
        {"message": "Error while logging out"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@api_view(["GET", "POST"])
def profile(request):
    user = request.user

    if request.method == "GET":
        serializer = UserSerializer(user)
        custom_response = {"message": "Profile Fetched", "profile": serializer.data}
        return Response(custom_response, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = UserSerializer(user, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_new_task(request):
    if request.method == "POST":
        serializer = PersonalTaskSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):
    if request.method == "GET":
        user = request.user
        tasks = PersonalTask.objects.filter(user=user)
        serializers = PersonalTaskSerializer(tasks, many=True)
        custom_response = {
            "message": "All tasks for the user fetched",
            "tasks": serializers.data,
        }
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response(
        {"message": "Error fetching API"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_single_task(request, pk):
    if request.method == "GET":
        task = PersonalTask.objects.get(id=pk)
        serializer = PersonalTaskSerializer(task)
        custom_response = {"message": "Task details fetched", "task": serializer.data}
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response(
        {"message": "Error fetching Task"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_task_status(request, pk):
    if request.method == "POST":
        task = PersonalTask.objects.get(id=pk)
        user = request.user
        if task.user == user:
            serializer = PersonalTaskSerializer(task, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "Task Updated successfully", "data": serializer.data},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Error updating Task", "error": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(
            {"message": "Unauthorized task for the user"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    return Response(
        {"message": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_task(request, pk):
    if request.method == "POST":
        task = PersonalTask.objects.get(id=pk)
        user = request.user
        if task.user == user:
            task.delete()
            return Response(
                {"message": "Task deleted successfully"}, status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Unauthorized task for the user"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    return Response(
        {"message": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_analytics(request):
    if request.method == "GET":
        user = request.user
        all_task = PersonalTask.objects.filter(user=user)
        regular_tasks = len(
            all_task.filter(user=user, importance="REGULAR")
        )
        important_task = len(
            all_task.filter(user=user, importance="IMPORTANT")
        )
        urgent_task = len(PersonalTask.objects.filter(user=user, importance="URGENT"))
        completed_task_query = PersonalTask.objects.filter(user=user, status="COMPLETED")
        completed_task = len(completed_task_query)
        on_going_task = len(PersonalTask.objects.filter(user=user, status="ONGOING"))
        incomplete_task = len(
            all_task.filter(user=user, status="INCOMPLETE")
        )

        current_date = datetime.date.today()
        on_time_tasks = all_task.filter(status="COMPLETED", end_by__gte = current_date)
        missed_tasks = all_task.filter(status="INCOMPLETE")
        print(type(regular_tasks),type(important_task),type(urgent_task),type(completed_task),type(incomplete_task))
        stars = 0
        ratio = len(on_time_tasks) // len(all_task)
        if ratio >= 0.8:
            stars = 5
        elif 0.6 <= ratio <= 0.79:
            stars = 4
        elif 0.4 <= ratio <= 0.59:
            stars = 3
        else:
            stars = 2
        custom_response = {
            "message": "Analytics recieved",
            "data": {
                "importance": {
                    "regular_task": regular_tasks,
                    "important_task": important_task,
                    "urgent_task": urgent_task,
                },
                "status": {
                    "completed_task": completed_task,
                    "on_going_task": on_going_task,
                    "incomplete_task": incomplete_task,
                },
                "time_specific" : {
                    "on_time_task" : len(on_time_tasks),
                    "missed_task" : len(missed_tasks)
                },
                "general": {"all_task": len(all_task)},
                "stars" : stars
            },
        }
        return Response(custom_response, status=status.HTTP_200_OK)


