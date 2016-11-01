__author__ = 'veremii'

from django.conf.urls import patterns, url, include
from views import get_minion_v, get_index_tpl, handler404, handler500, get_minions_tpl
from base import views

urlpatterns = patterns('',
                      (r'^$', get_index_tpl),
                      (r'^data/minions', get_minion_v),
                      (r'^tpl/minions', get_minions_tpl),
                      (r'^404/$', handler404),
                      (r'^500/$', handler500),


)