from django.db import models
from django.contrib.auth.models import User, Group, Permission


class Site(models.Model):
    site = models.CharField(max_length=8, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.description


class Alert(models.Model):
    site = models.CharField(max_length=50, unique=True )
    upper_limit = models.IntegerField()
    lower_limit = models.IntegerField()
    user = models.ForeignKey(User, null=True)
