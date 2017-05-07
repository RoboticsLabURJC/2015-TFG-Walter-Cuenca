from .models import Cantante,Evento,CartShop

def datos_globales(request):
	listCantantes=Cantante.objects.all()
	listFestivales=Evento.objects.all()
	dict = {'listCantantes':listCantantes,'listFestivales':listFestivales}
	return dict


