README

ANGULAR 12 + Laravel 7


Ejemplo inicio de sesión con router, auth guards, tablas, angualr material + bootstrap.
Secciones de home, facturas y datos personales. 

Funciones de imprimir, obtención y editar datos.
Formato en Angular tables

PROYECTO

	Frontend: ANGULAR 12.2.10 
	Backend: LARAVEL 7 - PHP 7.4 - MySQL

	User:		admin
	Pasword:	emc2

	Angular

		- Se crea proyecto nuevo de Angular con router y login.
		- Se instala Angular Material, Component Dev Kit(CDK) y Angular Animations
		- Se usa Boostrap y Fontawesome
		- Habrá sección login y área privada
		- Habrán 3 secciones: header, body(Inicio, facturas, d.personales) y footer
		- Se crean componentes: login/ logout /navbar/ footer/ home/ tablas /  						       facturas / datos_personales.
		- Se añade nuevo routing module para home.
		- Se genera auth.guards para autenticación de login, canActivate...
		- Se crea service para realizar llamadas HTTP a la api de Laravel.
		- Se crea un pipe para capitalize strings.
		- Se crea modelo de datos para datos_personales y facturas.
		- Se crean la tablas y funcionalidades para mostrar los datos
		- Se podrán ver, editar, e impimir los datos de facturas y datos personales
		

			
	Laravel
		- Se crea nuevo proyecto Laravel para servidor.
		- Se configura .env y .htaccess
		- Se crear routes para la api.
		- Se configuran los CORS. 
		- Se crea modelo para facturas y datos_personales
		- Se crea controladores para facturas y datos_personales
		
	MySQL
		- Se crea EER Diagrama de las tablas facturas/datos_personales
		- Se crea db MySQL con tablas: facturas / datos_personales

	
	- Se sube proyecto Angular, con ficheros Laravel a servidor y github
