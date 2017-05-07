from django.contrib import admin

# Register your models here.
from .models import * 

class EntradasAdmin(admin.ModelAdmin):
	list_display = ['tipoEntrada', 'precio', 'stock']
	#search_fields = ('typeEntrada')
	ordering = ['precio']
	#search_fields = ('typeEntrada')

class ContactaAdmin(admin.ModelAdmin):
	list_display = ['nombre','email', 'fecha', 'motivo']
	ordering = ['motivo']

class VideoaAdmin(admin.ModelAdmin):
	list_display = ['nombre','typeFile']
	ordering = ['typeFile']

class GaleryaAdmin(admin.ModelAdmin):
	list_display = ['name','fileImg']
	ordering = ['name']

class BuyaAdmin(admin.ModelAdmin):
	list_display = ['nameProduct','typeProduct','cantidad']
	ordering = ['typeProduct']

class BuyaAdmin(admin.ModelAdmin):
	list_display = ['nameProduct','typeProduct','cantidad']
	ordering = ['typeProduct']

class PerfilUserAdmin(admin.ModelAdmin):
	list_display = ['usuario','telefono']
	ordering = ['usuario']

class CancionAdmin(admin.ModelAdmin):
	list_display = ['nombre','fileCancion']
	ordering = ['nombre']

class DiscoAdmin(admin.ModelAdmin):
	list_display = ['nombre']
	ordering = ['nombre']

class CantanteAdmin(admin.ModelAdmin):
	list_display = ['nombre','edad','nacionalidad','tipoArtista']
	ordering = ['nombre']

class EventoAdmin(admin.ModelAdmin):
	list_display = ['nombre','fecha','pais','enable']
	ordering = ['nombre']

class OrderItemsAdmin(admin.ModelAdmin):
	list_display = ['nombre','apellido','email','telefono','direccion','codigo_postal','pais']
	ordering = ['nombre']
'''
class OrderAdmin(admin.ModelAdmin):
	list_display = ['order']
	#ordering = ['nombre']
'''
admin.site.register(Entradas,EntradasAdmin)
admin.site.register(Contacta,ContactaAdmin)
admin.site.register(Video,VideoaAdmin)
admin.site.register(Galeria,GaleryaAdmin)
admin.site.register(Compra,BuyaAdmin)
admin.site.register(PerfilUser,PerfilUserAdmin)
admin.site.register(Cancion,CancionAdmin)
admin.site.register(Disco,DiscoAdmin)
admin.site.register(Cantante,CantanteAdmin)
admin.site.register(Evento,EventoAdmin)
admin.site.register(Order)
admin.site.register(orderItems)
