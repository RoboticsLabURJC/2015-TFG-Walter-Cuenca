from .models import Cantante,Evento,CartShop

def Carshop_items(request):
	precio = 0
	numItems = 0
	if not request.user.is_anonymous():
		car_items = CartShop(request)
		print car_items
		precio = car_items.totalPrice()
		numItems = car_items.numItems()
	return {'precio':precio , 'items':numItems}