from django.shortcuts import render
from rest_framework import generics
from serializers import *


class SiteList(generics.ListAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()

class AddSite(generics.CreateAPIView):
    serializer_class = SiteSerializer

class SiteDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class AddUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()



