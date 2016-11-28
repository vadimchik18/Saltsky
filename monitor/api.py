__author__ = 'InshinA'

import requests
import ssl
import json
import sys
import time
import yaml
try:
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Loader

from requests.packages import urllib3
urllib3.disable_warnings()

#Configuration
#Server with working Salt-API and RET API
#Format is srv="https://127.0.0.1:8000"
from pandemonium.settings import SALT_REST_LOGIN, SALT_REST_PASSWORD, SALT_REST_SERVER_ADDR

#module for get readable content from remote salt master master

class Api(object):


    def __init__(self, rest_api_server = ""):

        self.response          = ""
        self.authorized        = False
        self.rest_api_server   = SALT_REST_SERVER_ADDR
        self.headers           = {'Accept': 'application/x-yaml'}

    def login(self,username=SALT_REST_LOGIN, password=SALT_REST_PASSWORD,key=None):
        self.data              = False
        self.data          = {'username': username , 'password': password, 'eauth': 'pam'}
        headers          = {'Accept': 'application/json'}
        url           = self.rest_api_server + "/login"
        self.response = requests.post( url=url, data=self.data, headers=headers, verify=False)

        if self.is_authorized()==False :

            return False

        elif key=="True":
            key=self.response.json()['return'][0]['token']
            return key

        else:

            self.authorized=True

            return True

    def is_authorized(self):

        if self.response.status_code == 200: 

            return True

        else:

            return False

    def logout(self):

        connection    = self.response

        if self.authorized == True:

            connection.__delattr__('cookies')
            connection.__delattr__('headers')

            return True

        else:

            return False

    def call_get(self,sub_url,sub_url_arg=""):

        cookies = self.response.cookies

        response = ""

        if self.authorized == False: return "Not authorized "

        if sub_url_arg!= "":

            sub_url=sub_url+"/"
        
        try:

            response = requests.get( self.rest_api_server + sub_url + sub_url_arg , verify = False, cookies = cookies ).json()

        except:

            return response

        return response


    def call_post(self, sub_url, post_data={}):

        # incomplete

        cookies = self.response.cookies

        if self.authorized == False: return "Not authorized "

        response = ""

        try:

            response = requests.get( self.rest_api_server + sub_url, self.headers , verify = False, cookies = cookies ).json()

        except:

            return response

        return response


    def call_run(self,data={},json_data=False):

        self.__init__()
        self.login()
        begin_cycle=time.time()
        run_url = "/run/"
        cookies = self.response.cookies
        response = ""
        data_orig = dict(self.data)

        for key in data.keys():

            self.data[key]=data[key]

        
        self.data['client']='runner'
        try:
       
            print "::call run data::"
            print self.data
            print "::             ::"
            print "::  self headers ::"
            print self.headers
            print "::"
            if json_data == True:
                self.data     = json.dumps(self.data)
                self.headers  = {'Accept': 'application/json'}
            begin_request=time.time()
            response = requests.post( self.rest_api_server + run_url,headers = self.headers , data=self.data , verify=False, cookies=cookies )   # old working
            end=time.time()
            timer_cycle=end - begin_cycle
            timer_request=end - begin_request
            print ":: Cycle successfulle end for " + timer_cycle.__str__() + "::"
            print ":: Request data completed for " + timer_request.__str__() + "::"
            print response.elapsed
            print response

        except:

            self.data = data_orig

            return response

        self.data = dict(data_orig)


        return response.content

    def call_local(self,data={},data_as_json=False):

        self.__init__()
        self.login()
        begin_cycle=time.time()
        run_url = "/run/"
        print (self.response)
        cookies = self.response.cookies
        response = ""
        data_orig = self.data

        for key in data.keys():

            self.data[key]=data[key]

        self.data['client']='local'
        try:

            print "::call local data::"
            print self.data
            print "::             ::"
            print "::  self headers ::"
            print self.headers
            print "::"
            if data_as_json == True:
                self.data=json.dumps(self.data)
            begin_request=time.time()
            response = requests.post( self.rest_api_server + run_url,headers = self.headers , data=self.data , verify=False, cookies=cookies )   # old working
            print (response._content)
            end=time.time()
            timer_cycle=end - begin_cycle
            timer_request=end - begin_request
            print ":: Cycle successfulle end for" + timer_cycle.__str__() + "::"
            print ":: Request data completed for " + timer_request.__str__() + "::"

        except:

            self.data = data_orig

            return response

        self.data = data_orig

        return response.content


def yaml_decode(dirty, all_data = False):

    data = {}

    try:
        if all_data == True:
            data=(yaml.load(dirty, Loader=Loader)).get('return')
        else:
            data=(yaml.load(dirty, Loader=Loader)).get('return')[0]
    except:
        return data
    return data
