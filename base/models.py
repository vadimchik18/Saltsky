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
        ret =api.yaml_decode(salt.call_local(data={"fun":"test.ping","tgt":"*"}))

    return ret
def get_memory_usage(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.virtual_memory())"]})
    return api.yaml_decode(data)

def get_vmemory_usage(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.virtual_memory())"]})
    return api.yaml_decode(data)

def get_online_users(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.users())"]})
    return api.yaml_decode(data)

def get_hwos_info(target):
    data= salt.call_local(data={"fun": "cache.grains","tgt": target})
    return api.yaml_decode(data)

def get_load_average(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt":target,"arg":["python2","import psutil;print(psutil.cpu_percent(interval=5))"]})
    return api.yaml_decode(data)

def get_internet_traffic(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.net_io_counters(pernic=True))"]})
    return api.yaml_decode(data)

def get_disk_ops(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.disk_io_counters(perdisk=True))"]})
    return api.yaml_decode(data)

def get_disk_usage(target):
    data= salt.call_local(data={"fun":"cmd.exec_code","tgt" : target ,"arg":["python2","import psutil;print(psutil.disk_partitions(all=True))"]})
    return api.yaml_decode(data)