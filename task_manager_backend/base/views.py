from http.client import ResponseNotReady
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Team, TeamTask, TeamTaskCompletion
from .serializers import TeamSerializer, TeamTaskSerializer
from api.models import CustomUser

@api_view(["GET"])
def get_all_users(request):
    if request.method == "GET":
        all_user_data = []
        all_users = CustomUser.objects.all()
        for user in all_users:
            temp_dict = {
                'id' : user.id, #type:ignore
                'username' : user.username
            }
            all_user_data.append(temp_dict)
        custom_response = {'message' : 'All user data fetched', 'user_data' : all_user_data}
        return Response(custom_response, status=status.HTTP_200_OK)



@api_view(['POST'])
def create_team(request):
    print(request.data)
    serializer = TeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_teams(request):
    member = request.user
    teams = Team.objects.filter(members=member)
    all_team = []
    for team in teams:
        members = []
        team_name = team.name
        all_members = team.members.all()
        for member in all_members:
            members.append(member.username)
        all_team.append({'name' : team_name, 'id' : team.id,'members' : [members]}) # type: ignore
    custom_response = {'message' : 'All Teams Retrieved', 'teams' : all_team}
    return Response(custom_response, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_new_team_task(request):
    if request.method == 'POST':
        serializer = TeamTaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def update_team_task(request, id):
    try:
        team_task = TeamTask.objects.get(id = id)
    except TeamTask.DoesNotExist:
        return Response({'error' : "TeamTask does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TeamTaskSerializer(team_task)
        custom_response = {'message' : 'Team Task fetched successfully', 'task': serializer.data}
        return Response(custom_response, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        user = request.user
        team_ins = Team.objects.get(id=int(request.data['team']))
        completion_ins = TeamTaskCompletion.objects.create(team=team_ins, task = team_task, member=user, completionStatus = request.data['status'])
        custom_response = {'message' : 'task updated successfully'}
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response({'error': 'Error parsing api check whether passing the user id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    user = request.user
    team_user_in = Team.objects.filter(members__id=user.id)
    all_tasks = []

    for team in team_user_in:
        team_tasks = TeamTask.objects.filter(team=team)
        for task in team_tasks:
            task_dict = {
                'id': task.id, # type: ignore
                'team': task.team.name, 
                'team_id' : task.team.id,  # type: ignore
                'taskName': task.taskName,
                'taskDescription': task.taskDescription,
                'taskStatus': task.taskStatus,
                'taskImportance': task.taskImportance,
            }
            all_tasks.append(task_dict)

    return Response({'message': 'Fetched tasks', 'task': all_tasks})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ranking_team_members(request, team_id):
    team = Team.objects.get(id=team_id)
    all_tasks = TeamTask.objects.filter(team=team)
    team_task_completion_data = TeamTaskCompletion.objects.filter(team=team)
    team_members = team.members.all()
    ranking_list = []
    for member in team_members:
        member_completion_data = team_task_completion_data.filter(member=member)
        temp_dict = {
            'member' : member.username,
            'completed_task': len(member_completion_data),
            'total_task' : len(all_tasks)
        }
        ranking_list.append(temp_dict)
    sorted_ranked_list = sorted(ranking_list, key=lambda x: x['completed_task'], reverse=True)
    print(sorted_ranked_list)
    custom_response = {'message' : 'Fetching successful', 'data' : sorted_ranked_list}
    return Response(custom_response, status=status.HTTP_200_OK)
