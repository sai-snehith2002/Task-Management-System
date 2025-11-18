from rest_framework import serializers
from .models import Team, TeamTask
from api.models import CustomUser
import json
class TeamSerializer(serializers.ModelSerializer):
    members = serializers.ListField(write_only=True)

    class Meta:
        model = Team
        fields = ['id','name', 'members']

    def create(self, validated_data):
        member_ids = validated_data.pop('members')
        print(member_ids)
        team = Team.objects.create(**validated_data)
        for _id in member_ids:
            team.members.add(CustomUser.objects.get(id = int(_id)))

        return team

class TeamTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamTask
        fields = ['id', 'team', 'taskName', 'taskDescription', 'taskStatus', 'taskImportance']

    def to_representation(self, instance):
        """
        Convert complex data types to native Python datatypes for serialization.
        """
        representation = super(TeamTaskSerializer, self).to_representation(instance)
        representation['team'] = instance.team.name
        return representation

    def create(self, validated_data):
        """
        Create and return a new TeamTask instance, given the validated data.
        """
        return TeamTask.objects.create(**validated_data)