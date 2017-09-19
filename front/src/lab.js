import React, {Component} from "react";

class Campo extends Component{
constructor(){
	super();
	this.tablero;
	this.direccion;
	this.teclas ={
		UP:38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39
	};
	this.fondo  ={
		imagenURL:"https://villagrangto.files.wordpress.com/2014/01/fondo-verde-sin.jpg",
		imagenOK:false
	};
	this.tifis = {
		x:100,
		y:100,
		frenteURL: "https://afverdugo3348.github.io/proy1/images/diana-frente.png",
		frenteOK: false,
		atrasURL: "https://afverdugo3348.github.io/proy1/images/diana-atras.png",
		atraseOK: false,
		derURL: "https://afverdugo3348.github.io/proy1/images/diana-der.png",
		derOK: false,
		izqURL: "https://afverdugo3348.github.io/proy1/images/diana-izq.png",
		izqOK: false,
		velocidad : 20
	};
	this.liz ={
		LizURL: "liz.png",
		lizOK: false,
		x:400,
		y:200
	};
}
dibujar()
{
	// Capa 1: fondo
	if(this.fondo.imagenOK)
	{
		this.tablero.drawImage (this.fondo.imagen, 0, 0);
	}
	//Capa 2 : Tifis
	var tifiDibujo = this.tifis.frente;
	if(this.tifis.frenteOK && this.tifis.atrasOK && this.tifis.derOK && this.tifis.izqOK)
	{
		if(this.direccion == this.teclas.UP)
		{
			tifiDibujo = this.tifis.atras;
		}
		if(this.direccion == this.teclas.DOWN)
		{
			tifiDibujo = this.tifis.frente;
		}
		if(this.direccion == this.teclas.LEFT)
		{
			tifiDibujo = this.tifis.izq;
		}
		if(this.direccion ==this.teclas.RIGHT)
		{
			tifiDibujo = this.tifis.der;
		}
		this.tablero.drawImage (tifiDibujo, this.tifis.x, this.tifis.y);
	}
	
}
inicio()
{
	var canvas = document.getElementById("campo");
	this.tablero  = canvas.getContext("2d");

	this.fondo.imagen = new Image();
	this.fondo.imagen.src = this.fondo.imagenURL;
	this.fondo.imagen.onload = this.confirmarFondo();

	this.tifis.frente = new Image();
	this.tifis.frente.src = this.tifis.frenteURL;
	this.tifis.frente.onload = this.confirmarFrente();

	this.tifis.atras = new Image();
	this.tifis.atras.src = this.tifis.atrasURL;
	this.tifis.atras.onload = this.confirmarAtras();
	
		this.tifis.izq = new Image();
		this.tifis.izq.src = this.tifis.izqURL;
		this.tifis.izq.onload = this.confirmarIzq();

	this.tifis.der = new Image();
	this.tifis.der.src = this.tifis.derURL;
	this.tifis.der.onload = this.confirmarDer();



	document.addEventListener("keydown", this.teclado);
}
teclado(datos)
{
	var codigo = datos.keyCode;
	if(codigo == this.teclas.UP)
	{
		this.tifis.y  -=this.tifis.velocidad;
	}
	if(codigo == this.teclas.DOWN)
	{
		this.tifis.y += this.tifis.velocidad;
	}
	if(codigo == this.teclas.LEFT)
	{
		this.tifis.x -= this.tifis.velocidad;
	}
	if(codigo == this.teclas.RIGHT)
	{
		this.tifis.x += this.tifis.velocidad;
	}

	this.direccion = codigo;

	this.dibujar();
}
confirmarLiz()
{
	this.liz.lizOK = true;
	this.dibujar();
}
confirmarFondo()
{
	this.fondo.setimagenOK = true;
	this.dibujar();
}
confirmarFrente()
{
	this.tifis.frenteOK = true;
	this.dibujar();
}
confirmarAtras()
{
	this.tifis.atrasOK = true;
	this.dibujar();
}
confirmarIzq()
{
	this.tifis.izqOK = true;
	this.dibujar();
}
confirmarDer()
{
	this.tifis.derOK = true;
	this.dibujar();
}
render(){
	return (<canvas id="campo" width="500" height="500"></canvas>);
}
}
export default Campo;