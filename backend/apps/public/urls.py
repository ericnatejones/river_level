from django.conf.urls import patterns, url
from django.conf import settings
from views import *

urlpatterns = patterns(
    '',

    url(r'^sites/$', SiteList.as_view(), name='site-list'),
    url(r'^site_detail/(?P<pk>[0-9]+)$', SiteDetail.as_view(), name='site-detail'),
    url(r'^user_detail/(?P<pk>[0-9]+)$', UserDetail.as_view(), name='user-detail'),
    url(r'^add_river/(?P<pk>[0-9]+)$', UserDetail.as_view(), name='add-river'),
    url(r'^add-site/$', AddSite.as_view(), name='add-site'),
    url(r'^add-user/$', AddUser.as_view(), name='add-user'),
)
