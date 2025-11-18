from rest_framework import serializers
from .models import CustomUser, PersonalTask

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'name', 'email', 'about']
        extra_kwargs = {'password' : {'write_only': True}}
    
    def create(self, validated_data):
        user = CustomUser(username=validated_data['username'], 
                          email=validated_data['email']
                          )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PersonalTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalTask
        fields = ['id', 'title', 'description', 'status', 'importance', 'created_at', 'end_by']
    
    def create(self, validated_data):
        user = self.context['request'].user
        task = PersonalTask(user=user, title=validated_data['title'], description=validated_data['description'], status=validated_data['status'], importance = validated_data['importance'], end_by=validated_data['end_by'])
        task.save()
        return task

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.importance = validated_data.get('importance', instance.importance)
        instance.save()
        return instance