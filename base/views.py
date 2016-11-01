
from django.shortcuts import render_to_response, HttpResponse
from django.template import RequestContext
from django.http import JsonResponse

# Create your views here.
from models import get_minion, \
    get_memory_usage, \
    get_disk_ops, \
    get_disk_usage, \
    get_hwos_info, \
    get_internet_traffic, \
    get_load_average, \
    get_online_users, \
    get_vmemory_usage


def get_index_tpl(request):
    return render_to_response("index.html")
def get_minions_tpl(request):
    return render_to_response("monitor.html")

#def get_minion_tpl(request):
#    return render_to_response(mi)

def get_minion_v(request):
    ret=True
    try:
        name = request.GET.get('name')
        ret = get_minion(name)
    except:
        ret = get_minion()
    return JsonResponse([ret], safe=False)


def handler404(request):
    response = render_to_response('templates/404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('templates/500.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response

def get_memory_usage_v(request):
    ret=get_memory_usage(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_vmemory_usage_v(request):
    ret=get_vmemory_usage(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_online_users_v(request):
    ret=get_online_users(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_hwos_info_v(request):
    ret=get_hwos_info(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_load_average_v(request):
    ret=get_load_average(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_internet_traffic_v(request):
    ret=get_internet_traffic(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_disk_ops_v(request):
    ret=get_disk_ops(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)

def get_disk_usage_v(request):
    ret=get_disk_usage(request.GET.get('minion'))
    return JsonResponse([ret], safe=False)