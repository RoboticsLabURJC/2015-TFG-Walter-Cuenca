from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

#importamos para trbjar con fechas
import datetime
from django.utils import timezone

#importamos el ficheri setting
from django.conf import settings

#########################################
## Definicion de los modelos de la APP ##
#########################################


class CartShop(models.Model):

	def __init__(self,request):
		self.session = request.session
		print self.session
		cart = self.session.get(settings.CART_SESSION_ID)
			#print request.session.get('has_commented', False)
		print cart
		if not cart :
			cart = self.session[settings.CART_SESSION_ID] = {}
		self.cart = cart

	def add(self,nameProduct,ImgLink,idTicket,typeTicket,cantidad,total):
		#pasamos a guardar el contenido en la sesion del usuario
		itemCar = {
			'name':nameProduct,
			'imgUrl':ImgLink,
			'idTicket':idTicket,
			'typeTicket':typeTicket,
			'unidades':cantidad,
			'precio':total
		}
		print itemCar
		strlong = str(len(self.cart))
		self.cart[strlong] = itemCar
		print self.cart
		self.save()

	'''
		Eliminamos un producto
	'''

	def remove(self,key):
		del self.cart[key]
		self.save()

	'''
		Actualizamos el cotenido de un producto
	'''
	def update(self,key,cantidad,total):
	 self.cart[key]['unidades'] = cantidad
	 self.cart[key]['precio'] = total
	 self.save()

	 '''
		obtenemos la clave asociaciad a un valor
	 '''
	def getNameKey(self,nameProduct,idTickets):
		print 'getNnameKey'
		print nameProduct
		print idTickets
		ticket = Entradas.objects.get(id=idTickets)
		key = ''
		print self.cart
		for items in self.cart:
			print 'buvle'
			print items
			if(self.cart[items]['idTicket'] == idTickets and self.cart[items]['name'] == nameProduct): #ticket.tipoEntrada ):#and self.cart[items]['name'] == nameProduct):
				print items
				key = items
				break
		return key

	'''
  length items car
	'''
	def totalPrice(self):
		#items
		price = 0
		for items in self.cart.values():
			price += int(items['precio'])
		return price

	def numItems(self):
		numItems = 0
		for items in self.cart.values():
			numItems += int(items['unidades'])
		return numItems
 	
	def save(self):
		#actualizamos el contenido del carrito
		self.session[settings.CART_SESSION_ID] = self.cart
		self.session.modified = True

class Entradas(models.Model):
	selecEntrada= (
		('Estandar','Estandar'),
		('Vip 1','Vip 1'),
		('Vip 2','Vip 2'),
	)
	tipoEntrada=models.CharField(max_length=8,choices=selecEntrada)
	precio=models.IntegerField()
	descrip=models.CharField(max_length=200)
	numEntradas=models.IntegerField(default=0)
	stock=models.BooleanField(default=True)

	def __str__(self):
		return self.tipoEntrada

class Contacta(models.Model): # OK #
	typeDepartament=(
		('Eventos','Eventos'),
		('Entrada','Entrada'),
		('Tecnico','Tecnico'),
		('Otro','Otro'),
	)
	nombre=models.CharField(max_length=200)
	email=models.EmailField()
	fecha=models.DateTimeField(default=datetime.datetime.now)
	telefono=models.IntegerField()
	motivo=models.CharField(max_length=8,choices=typeDepartament)
	texto=models.CharField(max_length=200)
	
class Video(models.Model):
	sourceVideo = (
		('iframe','iframe'),
		('video','video'),
	)
	nombre=models.CharField(max_length=200)
	fechaModif=models.DateTimeField(default=timezone.now)
	typeFile=models.CharField(max_length=6,choices=sourceVideo)
	fileVideo=models.FileField(upload_to='videos/',blank=True,max_length=200,)
	urlVideo=models.URLField(max_length=200,blank=True)
	
	def __str__(self):
		return self.nombre


class Galeria(models.Model):
	name=models.CharField(max_length=200)
	fileImg=models.ImageField(upload_to='img_galeria/')
	
	def __str__(self):
		return self.name

class Compra(models.Model): # OK #
	nameProduct=models.CharField(max_length=200)
	typeProduct=models.CharField(max_length=100)
	typeTicket=models.CharField(max_length=50,blank=True)
	cantidad=models.IntegerField()
	precio=models.IntegerField()

	def __str__(self):
		return '%s  %s' % (self.nameProduct, self.typeProduct)	

class Cancion(models.Model): # OK #
	nombre=models.CharField(max_length=200)
	fileCancion=models.FileField(upload_to='canciones/')
	def __str__(self):
		return self.nombre

class Disco(models.Model): # Ok #
	nombre=models.CharField(max_length=200)
	imgDisco=models.ImageField(upload_to='img_disco/')
	fechaModif=models.DateTimeField(default=timezone.now)
	listCanciones=models.ManyToManyField(Cancion,blank=True)
	
	def __str__(self):
		return self.nombre

class Cantante(models.Model): # OK #
	nombre=models.CharField(max_length=200)
	imgCantante=models.ImageField(upload_to='img_Cantante/')
	nacionalidad=models.CharField(max_length=200)
	edad=models.IntegerField()
	tipoArtista=models.CharField(max_length=200)
	inf=models.TextField()
	url=models.URLField(max_length=100,null=True)
	twitter=models.URLField(max_length=100,null=True)
	instagram=models.URLField(max_length=100,null=True)
	fechaModif=models.DateTimeField(default=timezone.now)
	listDiscos=models.ManyToManyField(Disco,blank=True)
	listImagenes=models.ManyToManyField(Galeria,blank=True)
	listVideos=models.ManyToManyField(Video,blank=True)

	def __str__(self):
		return self.nombre

class Evento(models.Model):

	event = (
		('festival','Festival'),
		('concierto','Concierto'),
		('funcion-Teatro','funcion-Teatro'),

	)

	nombre=models.CharField(max_length=200)
	imgCartel=models.ImageField(upload_to='img_Cartel/')
	fecha=models.DateTimeField('fecha concierto')
	pais=models.CharField(max_length=200)
	ciudad=models.CharField(max_length=200)
	lugar=models.CharField(max_length=200)
	tipoEvento= models.CharField(max_length=20,choices=event,default='Festival')
	enable=models.BooleanField(default=True)
	fechaModif=models.DateTimeField(default=timezone.now)
	listEntradas=models.ManyToManyField(Entradas,blank=True)
	listcantantes=models.ManyToManyField(Cantante,blank=True)

	def __str__(self):
		return self.nombre

class Order(models.Model):
	nombre=models.CharField(max_length=60)
	apellido=models.CharField(max_length=50)
	email=models.EmailField()
	telefono=models.IntegerField()
	direccion=models.CharField(max_length=100)
	codigo_postal=models.IntegerField()
	pais=models.CharField(max_length=50)

class orderItems(models.Model):
	order=models.ForeignKey(Order,blank=True,null=True)
	user=models.OneToOneField(User,blank=True,null=True)
	producto=models.ManyToManyField(Evento,blank=True,null=True)

class PerfilUser(models.Model):
	usuario=models.OneToOneField(User)
	perfilImg=models.ImageField(upload_to='img_perfil/',null=True,blank=True,default='perfilFault.jpeg')
	telefono=models.IntegerField(null=True)
	direccion=models.CharField(max_length=150,null=True)
	sexo=models.CharField(max_length=10,null=True)
	edad=models.IntegerField(null=True)
	pais=models.CharField(max_length=50,null=True)
	provincia=models.CharField(max_length=50,null=True)
	listCompra=models.ManyToManyField(orderItems,blank=True)
