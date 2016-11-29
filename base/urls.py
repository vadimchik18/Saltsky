__author__ = 'veremii'

from django.conf.urls import patterns, url, include
from views import get_minion_v, get_index_tpl, handler404, handler500, \
    get_minions_tpl, \
    get_memory_usage_v, \
    get_vmemory_usage_v, \
    get_disk_ops_v, \
    get_disk_usage_v, \
    get_hwos_info_v, \
    get_internet_traffic_v, \
    get_load_average_v, \
    get_online_users_v,\
    get_cpu_usage_v
from base import views

urlpatterns = patterns('',
                      (r'^$', get_index_tpl),
                      (r'^data/minions', get_minion_v),
                      (r'^tpl/minions', get_minions_tpl),
                      (r'^404/$', handler404),
                      (r'^500/$', handler500),
                      (r'^data/minion/memory', get_memory_usage_v),
                      (r'^data/minion/vmemory', get_vmemory_usage_v),
                      (r'^data/minion/disk', get_disk_ops_v),
                      (r'^data/minion/usdisk', get_disk_usage_v),
                      (r'^data/minion/hwos', get_hwos_info_v),
                      (r'^data/minion/ifops', get_internet_traffic_v),
                      (r'^data/minion/loadav', get_load_average_v),
                      (r'^data/minion/users', get_online_users_v),
                      (r'^data/minion/cpu', get_cpu_usage_v),

)