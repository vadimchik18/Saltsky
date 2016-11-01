
from django.shortcuts import render_to_response, HttpResponse
from django.template import RequestContext
from django.http import JsonResponse

# Create your views here.
from models import get_minion


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
        print "lolololololol"
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