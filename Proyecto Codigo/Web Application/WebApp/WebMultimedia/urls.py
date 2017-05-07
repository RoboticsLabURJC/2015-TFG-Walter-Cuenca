from django.conf.urls import url
from django.conf import settings
from . import views
from django.conf.urls.static import static
### URLS de nuestra aplicacion ###

urlpatterns = [
    url(r'^$',views.PageInit),
    url(r'^Cantantes/(?P<idCantante>[0-9]+)/$',views.PageCantante),
    url(r'^Eventos/(?P<idEvento>[0-9]+)/$',views.PageEvent),

    # url asincronas#
    url(r'^Search/$',views.SearchItem),
    url(r'^WebServRequest/$',views.WSRequest),
    url(r'^WebServInfoSite/$',views.WSRequestSite),
    url(r'^Contacta/$',views.PageContact),
    url(r'^Register/$',views.PageRegister),
    url(r'^Login/$',views.PageLogin),
    url(r'^Perfil/$',views.PagePerfil),
    url(r'^ModifPerfil/$',views.ModifPerfil),
    url(r'^Logout/$',views.PageLogout),
    # url event #
    url(r'^AddCar/(?P<idEvento>[0-9]+)/(?P<idTicket>[0-9]+)/$',views.AddCarShop),
    url(r'^UpdateCart/(?P<idEvento>[0-9]+)/(?P<idTicket>[0-9]+)/$',views.UpdateCart),
    url(r'^RemoveCart/(?P<idEvento>[0-9]+)/(?P<idTicket>[0-9]+)/$',views.deleteItemCar),
    url(r'^DetailCar/$',views.DetailCarShop),
    #url(r'^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/$', views.month_archive),
    #Orden de cmpra
    url(r'^Checkout/$',views.Pagecheckout),
]