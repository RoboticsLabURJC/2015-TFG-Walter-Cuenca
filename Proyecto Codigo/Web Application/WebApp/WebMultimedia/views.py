from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect

#se puede quitar no se utiliza
from django.utils import timezone
from models import *
from forms import *

#importamos para trbjar con fechas
import datetime

## importamos los formularios #
from forms import *

## importamos la libreria de Python peticiones HTTP ##
import requests

#impottamos libreria para trabajar con formato JSON
import json


#importamos el ficheri setting
from django.conf import settings


from django.http import JsonResponse


from urllib3.contrib.appengine import AppEngineManager # ????????????


#comprobacion de la conectividad con attr de Django
from django.contrib.auth import login,logout,authenticate

#### Pagina Inicio APP ####

def PageInit(request):
	print request.session.values()
	#obtenemos la fecha de hoy
	dateTimerHoy = datetime.datetime.now()
	#obtenemos la fecha de hace 15 dias
	dateTimerPass = datetime.datetime.now()
	date=dateTimerPass.date();
	numDias = datetime.timedelta(days=15);
	datePass=dateTimerHoy-numDias
	#print request.session.get('has_commented', False)
	#request.session['fav_color'] = 'blue'
	print request.session.items()
	print '************************'
	print 'Fecha actual'
	print dateTimerHoy
	print 'Fecha antigua'
	print datePass
	print '************************'


	list_NewEvento=Evento.objects.filter(fechaModif__range=[datePass, dateTimerHoy])
	print list_NewEvento
	list_NewCantante=Cantante.objects.filter(fechaModif__range=[datePass, dateTimerHoy])
	print list_NewCantante
	context = {
		'eventos':list_NewEvento,
		'cantantes':list_NewCantante
	}
	return render(request, 'esqueletoWeb.html', context)

#### Individual Items Selection APP ####

def PageCantante(request,idCantante):
	print '>>> Peticion Cliente Evento'
	print idCantante
	cantanteSelec = Cantante.objects.get(id=idCantante)
	context = {
		'cantanteSelec':cantanteSelec
	}
	return render(request, 'Artista.html', context)

def PageEvent(request,idEvento):
	print '>>> Peticion Cliente Evento'
	print idEvento
	eventSelec = Evento.objects.get(id=idEvento)
	formCantidad = itemsCountsForm()
	context = {
		'evento':eventSelec,
		'form':formCantidad
	}
	return render(request, 'Evento.html', context)


#### Peticiones Asincronas ####

def SearchItem(request):
	print '>>> Peticion buscador de la web'
	text= request.POST['textRequest']
	print text
	infoCantante=Cantante.objects.filter(nombre__startswith=text)
	infoEvento=Evento.objects.filter(nombre__startswith=text)
	print infoEvento
	contexto={
		'ListEvento':infoEvento,
		'ListCantante':infoCantante
	}
	return render(request,'desplegable.html',contexto)
	

def WSRequest(request):
	'''
	clave de API: AIzaSyBliq3S6sQ0pJsT1xWJDiMtPuM1sn9xzaM
	'''
	nameSite= request.POST['site']
	r = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address='+nameSite+'&key=AIzaSyBliq3S6sQ0pJsT1xWJDiMtPuM1sn9xzaM')
	print r
	print r.text
	# obtenemos formato del mensaje y la codificacion #
	print r.headers
	return HttpResponse(r.text)

def WSRequestSite(request):
	'''
	urls : https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
	'''
	infoSite= request.POST['infoSite']
	r = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+infoSite+'&key=AIzaSyBliq3S6sQ0pJsT1xWJDiMtPuM1sn9xzaM')
	print r
	print r.text
	# obtenemos formato del mensaje y la codificacion #
	print r.headers
	return HttpResponse(r.text)


#### Formularios  APP ####

def PageContact(request):
	if request.method == 'POST':
		formContacta = ContactaForm(request.POST)
		#print formContacta
		print formContacta.is_valid()
		if formContacta.is_valid():
			#pasamos obtener los campos del form
			usuario = formContacta.cleaned_data['nombre']
			email = formContacta.cleaned_data['correo']
			tlf = formContacta.cleaned_data['numeroTlf']
			area = formContacta.cleaned_data['area']
			motivo = formContacta.cleaned_data['motivo']
			newContact = Contacta(nombre=usuario,email=email,telefono=tlf,motivo=area,texto=motivo);
			newContact.save()
			'''u = User.objects.create_user(username=usuario,email=email,password=password)
			#### Falta enviar la informacion de los errores cuando se producen 
			#### Y guardar la informaciond el area 
			u.save() #guardamos un usuario'''
			print 'save form OK'
			return HttpResponseRedirect('/WebMutimedia/')
	else:
		contacta = ContactaForm()
		context = {
			'form':contacta
		}
		print contacta
		return render(request, 'contacta.html', context)


def PageRegister(request):
	if request.method == 'POST':
		formRegister = RegisterForm(request.POST)
		print formRegister.is_valid()
		if formRegister.is_valid():
			#datos que guardamos en tabla User
			usuario = formRegister.cleaned_data['nick']
			email = formRegister.cleaned_data['correo']
			nombre = formRegister.cleaned_data['nombre']
			apellido = formRegister.cleaned_data['apellido']
			password = formRegister.cleaned_data['password2']
			password2 = formRegister.cleaned_data['password2']
			#guardamos el usuario
			newUser = User.objects.create_user(username=usuario,email=email,password=password,first_name=nombre,last_name=apellido)
			newUser.save()
			print newUser
			#datos que se guardaran en el perfil del User
			edad = formRegister.cleaned_data['edad']
			tlf = formRegister.cleaned_data['telefono']
			direccion = formRegister.cleaned_data['direccion']
			sexo = formRegister.cleaned_data['sexo']
			pais = formRegister.cleaned_data['pais']
			provincia = formRegister.cleaned_data['provincia']
			perfilNewUser = PerfilUser(usuario=newUser,telefono=tlf,direccion=direccion,sexo=sexo,pais=pais,provincia=provincia,edad=edad)
			perfilNewUser.save()
			print 'save form OK'
			return HttpResponseRedirect('/WebMutimedia/')
	else:
		register = RegisterForm()
		context = {
			'form':register
		}
		print register
		return render(request,'register.html',context)
		 

def PageLogin(request): # OK
	# no hace falta tener un request  tenemos una respuesta POST # 
	if request.method == 'POST':
		print '>>> Usuario intentando Login'
		user = request.POST['usuario']
		passw = request.POST['pass']
		print request.POST
		print 'Usuario:'+user
		print 'Password:'+passw
		data = {'nick': user, 'password': passw}
		Formlogin = LoginForm(data)
		if Formlogin.is_valid():
			user = Formlogin.cleaned_data['nick']
			password = Formlogin.cleaned_data['password']
			usuario = authenticate(username=user,password=password) #en esta variable veremos si esta atenticado
			if usuario is None:
				print 'usuario no registrado'
				mensaje = False
				return  HttpResponse(mensaje)
			else:
				print 'usuario registrado realizamos login'
				mensaje = True
				login(request, usuario)
				return HttpResponse(mensaje)				

def PagePerfil(request):
	nameUser = request.user
	print nameUser.email
	infoUser = User.objects.get(username=nameUser)
	perfilUser= PerfilUser.objects.get(usuario=infoUser)

	print perfilUser.telefono
	print perfilUser.usuario.last_name
	print perfilUser.listCompra
	if request.method == 'POST':
		print 'envio form + datos'
	context = {
		'infoUser': perfilUser
	}
	return render(request,'perfil.html',context)

def ModifPerfil(request):
	nameUser = request.user
	print nameUser.email
	infoUser = User.objects.get(username=nameUser)
	perfilUser= PerfilUser.objects.get(usuario=infoUser)
	print perfilUser
	print  perfilUser.telefono
	print PersonaForm
	''' Generamos un formulario del tipo del modelo '''	
	formUser = UserForm(instance=infoUser)
	formPerfil = PersonaForm(instance=perfilUser)
	print formPerfil
	context = {
		'infoPerfil':formPerfil
	}
	return render(request,'perfil.html',context)


def PageLogout(request):
	logout(request)
	return HttpResponseRedirect('/WebMutimedia/')


'''
	VISTAS RELACIONADAS CON EL CARRITO DE LA COMPRA
	BASADA EN LA SESION DE LOS USUARIOS 
'''

def AddCarShop(request,idEvento,idTicket):
	#obtenemos la cantidad de entradas
	print request
	print request.POST
	print 'num Entradas'
	numEntradas = request.POST['quantity']
	print numEntradas
	print 'addCar elementos'
	#print nameEvento
	v_Evento = Evento.objects.get(id=idEvento)
	ticket = Entradas.objects.get(id=idTicket)
	#calculamos el precio por entrada
	print 'Info Ticket'
	precio = ticket.precio
	print precio
	tipoTicket = ticket.tipoEntrada
	print tipoTicket
	print 'Precio total compra'
	Total = int(numEntradas)*precio
	print Total
	'''
	obtenemos:
		precio
		cantidad : cuerpo del form
		evento : nombre de momento
	'''
	#pasamos a aadirlo a nuestra session
	print request.session
	#self,idProducto,idTicket,cantidad,total

	cart = CartShop(request)
	cart.add(v_Evento.nombre,str(v_Evento.imgCartel),idTicket,tipoTicket,numEntradas,Total)
	return HttpResponseRedirect('/WebMutimedia/Eventos/'+idEvento+'/')

def DetailCarShop(request):
  # /* ontenemos la informacion del carrito */
	objCart = CartShop(request)
	formCantidad = itemsCountsForm(initial={'update': True})
	print formCantidad
	'''
	cart= objCart.cart
  valueCar=objCar.values() {}
  for key, value in objCart.cart:
  	event = Evento.objects.get(name=value['name'])
  	value['link']

	'''
	context = {'objCart':objCart,'formCantidad':formCantidad}
	return render(request,'CartDetail.html',context)

def UpdateCart(request,idEvento,idTicket):
	#pasamos a actualizar la cantidad de unidades
	newNumEntradas = request.POST['quantity']
	print newNumEntradas
	#obtenemos la inforacion necesaria del evento y lo demas
	ticket = Entradas.objects.get(id=idTicket)
	v_Evento = Evento.objects.get(id=idEvento)
	print ticket
	Total = int(newNumEntradas)*ticket.precio
	print Total
	#SIguiente pasamos a encontrar la clave 
	instCart = CartShop(request)
	#v_Cart = instCart.cart
	nameKey = instCart.getNameKey(v_Evento.nombre,idTicket)
	print nameKey
	instCart.update(nameKey,newNumEntradas,Total)
	return HttpResponseRedirect('/WebMutimedia/DetailCar/')

def deleteItemCar(request,idEvento,idTicket):
	instCart = CartShop(request)
	v_Cart = instCart.cart
	v_Evento = Evento.objects.get(id=idEvento)
	nameKey = instCart.getNameKey(v_Evento.nombre,idTicket)
	print nameKey
	instCart.remove(nameKey)
	return HttpResponseRedirect('/WebMutimedia/DetailCar/')


def Pagecheckout(request):
	objCart = CartShop(request)
	v_cart = objCart.cart
	if request.method == 'POST':
		print 'terminar compra'
		print request.POST
		#validamos que el formulario sea correcto
		nombre=request.POST['nombre']
		apellido=request.POST['apellido']
		email=request.POST['email']
		telefono=request.POST['telefono']
		direccion=request.POST['direccion']
		cp=request.POST['codigo_postal']
		pais=request.POST['pais']
		data={
			'nombre': nombre, 
			'apellido': apellido,
			'email':email,
			'telefono':telefono,
			'direccion':direccion,
			'codigo_postal':cp,
			'pais':pais
		}
		formOrder=OrdenForm(data)
		print formOrder
		print formOrder.is_valid()
		if formOrder.is_valid() :
			#si es valido pasamos a guardar la informacion en BBDD
			orden=Order(nombre=nombre,apellido=apellido,email=email,telefono=telefono,direccion=direccion,codigo_postal=cp,pais=pais)
			orden.save()
			itemOrden = orderItems(order=orden)
			itemOrden.save()
			for item in objCart.cart.values():
				#buscamos el evento den BBDD
				event=Evento.objects.get(nombre=item['name'])
				itemOrden.producto.add(event)
				itemOrden.save()
				#asignamos el usuario de la compra
			print request.user
			return HttpResponseRedirect('/WebMutimedia/')
	else:
		formOrder = OrdenForm()
		context = {
			'form':formOrder,
			'objCart':objCart
		}
		return render(request,'Orden.html',context)
