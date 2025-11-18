from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255, default='Null')
    members = models.ManyToManyField("api.CustomUser")

    def __str__(self):
        return self.name


class TeamTask(models.Model):
    STATUS = (
        ('INCOMPLETE', 'INCOMPLETE'),
        ('ONGOING', 'ONGOING'),
        ('COMPLETE', 'COMPLETE'),
        )
    IMPORTANCE_STATUS = (
        ('REGULAR', 'REGULAR'),
        ('IMPORTANT', 'IMPORTANT'),
        ('URGENT', 'URGENT'),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    taskName = models.CharField(max_length=255, default='Null')
    taskDescription = models.CharField(max_length=1000, default='Null')
    taskStatus = models.CharField(max_length=30, default='Null',choices=STATUS)
    taskImportance = models.CharField(max_length=30, choices=IMPORTANCE_STATUS, default='Null')

    def __str__(self):
        return self.taskName

    
class TeamTaskCompletion(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    task = models.ForeignKey(TeamTask, on_delete=models.CASCADE)
    member = models.ForeignKey('api.CustomUser', on_delete=models.CASCADE)
    completionStatus = models.CharField(max_length=3, default='NO')

    def __str__(self):
        return f"{self.team.name} with task {self.task.taskName} - candidate done {self.member.username}"