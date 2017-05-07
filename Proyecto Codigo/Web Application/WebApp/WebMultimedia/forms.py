from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from models import *

## formularios de la App ##

class ContactaForm(forms.Form):
	typeArea = (
		('Compra','Compra'),
		('Tecnica','Tecnica'),
		('Eventos','Eventos'),
		('Otros','Otros'),
	)
	nombre=forms.CharField()
	correo=forms.EmailField(required=True,label='Correo electronico')
	numeroTlf=forms.IntegerField(label='Numero telefono')
	area=forms.ChoiceField(widget=forms.RadioSelect, choices=typeArea)
	#area=forms.CharField(widget=forms.SelectDateWidget(areas=typeArea))
	motivo=forms.CharField(widget=forms.Textarea)

	#  validaciones  #

	def clean_numeroTlf(self):
		tlf = self.cleaned_data['numeroTlf']
		digiTlf = len(str(tlf))
		if digiTlf > 9:
			print 'mayor de 9 dig'
			raise forms.ValidationError("Introduzca un numero de telefono valido")
		print 'menor de 9 dig'
		return tlf

	def clean_motivo(self):
		mensaje = self.cleaned_data['motivo']
		num_palabras = len(mensaje.split())
		if num_palabras < 4:
			print 'poco texto'
			raise forms.ValidationError("Se requiere minimo 4 palabras")
		print 'texto bueno'
		return mensaje

class RegisterForm(forms.Form):
	typeSexo = (
		('M','Mujer'),
		('H','Hombre'),
	)

	nick=nombre=forms.CharField()
	correo=forms.EmailField(required=True)
	nombre=forms.CharField()
	apellido=forms.CharField()
	password=forms.CharField(widget=forms.PasswordInput())
	password2=forms.CharField(widget=forms.PasswordInput())
	# campos para el perfil #
	telefono=forms.IntegerField()
	direccion=forms.CharField()
	sexo=forms.ChoiceField(widget=forms.RadioSelect, choices=typeSexo)
	edad=forms.IntegerField()
	pais=forms.CharField()
	provincia=forms.CharField()

	#  validaciones  #

	'''def clean_nick(self):
		nickUser = self.cleaned_data['nick']
		num_palabras = len(mensaje.split())
		if num_palabras < 4:
			raise forms.ValidationError("Nick no disponible")
		return nickUser
	
	def clean_correo(self):
		email = self.cleaned_data['correo']
		if num_palabras < 4:
			raise forms.ValidationError("Correo ya utilizado")
		return email
	'''
	def clean_password2(self):
		passw1 = self.cleaned_data['password']
		passw2 = self.cleaned_data['password2']
		if passw1 != passw2:
			raise forms.ValidationError("Los passwords no coinciden")
		return passw2

class LoginForm(forms.Form):
	nick=forms.CharField()
	password=forms.CharField(widget=forms.PasswordInput())

	# validaciones #
	'''
	def clean_nick(self):
		nickUser = self.cleaned_data['nick']
		if len(nickUser) < 4:
			raise forms.ValidationError("Nick no disponible")
		return nickUser

	def clean_password(self):
		passw = self.cleaned_data['password']
		if len(passw) > 4:
			raise forms.ValidationError("Los passwords no coinciden")
		return passw
	'''

class UserForm(forms.ModelForm):
	class Meta:
		model = User
		fields = '__all__'

class PersonaForm(forms.ModelForm):
	class Meta:
		model = PerfilUser
		fields = '__all__'

class OrdenForm(forms.ModelForm):
	class Meta:
		model = Order
		fields = '__all__'

class itemsCountsForm(forms.Form):
	PRODUCT_QUANTITY_CHOICES = [(i, str(i)) for i in range(1, 21)]
	"""docstring for itemsCounts"""
	quantity = forms.TypedChoiceField(label='Num.Entradas',choices=PRODUCT_QUANTITY_CHOICES,coerce=int)
	update = forms.BooleanField(required=False,initial=False,widget=forms.HiddenInput)