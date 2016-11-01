from django.db import models
import monitor.api as api

salt = api.Api()
salt.login()

# Create your models here.

##here start to get data from remote saltstack master host


# gettin list with connected minions or detailed description of selected minion.
def get_minion(name=False):
    if name:
        ret = salt.call_run(data={'fun':'manage.status'})
    else:
        ret =api.yaml_decode(salt.call_local(data={"fun":"test.ping" , 'tgt' : '*'}))

    return ret
def get_memory_usage(target):
    data= salt.call_local(data={"fun":"status.meminfo","tgt" : target})
    return api.yaml_decode(data)

def get_vmemory_usage(target):
    data= salt.call_local(data={"fun":"ps.virtual_memory","tgt" : target})
    return api.yaml_decode(data)

def get_online_users(target):
    data= salt.call_local(data={"fun":"ps.get_users","tgt" : target})
    return api.yaml_decode(data)

def get_hwos_info(target):
    data= salt.call_local(data={"fun":"cache.grains","tgt" : target})
    return api.yaml_decode(data)

def get_load_average(target):
    data= salt.call_local(data={"fun":"ps.cpu_times","tgt" : target})
    return api.yaml_decode(data)

def get_internet_traffic(target):
    data= salt.call_local(data={"fun":"ps.network_io_counters","tgt" : target})
    return api.yaml_decode(data)

def get_disk_ops(target):
    data= salt.call_local(data={"fun":"ps.disk_io_counters","tgt" : target})
    return api.yaml_decode(data)

def get_disk_usage(target):
    data= salt.call_local(data={"fun":"ps.disk_partition_usage","tgt" : target})
    return api.yaml_decode(data)