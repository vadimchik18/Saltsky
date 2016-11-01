from django.db import models
import monitor.api as api

salt = api.Api()
salt.login()

# Create your models here.

##here start to get data from remote saltstack master host


# gettin list with connected minions or detailed description of selected minion.
def get_minion(name=False):
    if name:
        ret = salt.call_run(data={'fun':'cache.mine'})
    else:
        ret =api.yaml_decode(salt.call_local(data={"fun":"test.ping" , 'tgt' : '*'}))

    return ret