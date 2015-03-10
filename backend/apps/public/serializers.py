from rest_framework import serializers
from models import *


class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

class AlertSerializer(serializers.ModelSerializer):

    class Meta:
        model = Alert

