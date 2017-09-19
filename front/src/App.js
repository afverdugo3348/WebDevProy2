import React, { Component } from 'react';
import Solution from "./Component2.js";
	var numLab = Math.floor(Math.random() * (1 - 0)) + 0;
	var atributos={
		cantObstaculos:1,
		cantSolucion:1,
		id:1,
		llegadaX:0,
		llegadaY:0,
		obstaculos:{1: 100, 2: 100, 3: 100, 4: 500},
		posInicialX:0,
		posInicialY:400,
		solucion:{1: 50, 2: 50, 3: 50, 4: 500},
		velocidad:100};
  var tablero;
  var tabSolution;
	var direccion;
	var teclas ={
		UP:38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39
	};
	var fondo  ={
		imagenURL:"https://villagrangto.files.wordpress.com/2014/01/fondo-verde-sin.jpg",
		imagenOK:false
	};
	var tifis = {
		x:atributos.posInicialX,
		y:atributos.posInicialY,
		frenteURL: "https://afverdugo3348.github.io/proy1/images/diana-frente.png",
		frenteOK: false,
		atrasURL: "https://afverdugo3348.github.io/proy1/images/diana-atras.png",
		atraseOK: false,
		derURL: "https://afverdugo3348.github.io/proy1/images/diana-der.png",
		derOK: false,
		izqURL: "https://afverdugo3348.github.io/proy1/images/diana-izq.png",
		izqOK: false,
		velocidad : atributos.velocidad
	};

function dibujar()
{
	// Capa 1: fondo
	if(fondo.imagenOK)
	{
		tablero.drawImage (fondo.imagen, 0, 0);
	}
	//Capa 2 : Tifis
	var tifiDibujo = tifis.frente;
	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		if(direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		}
		if(direccion == teclas.DOWN)
		{
			tifiDibujo = tifis.frente;
		}
		if(direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izq;
		}
		if(direccion ==teclas.RIGHT)
		{
			tifiDibujo = tifis.der;
		}
		tablero.drawImage (tifiDibujo, tifis.x, tifis.y);
	}
	//Capa 3:Obstaculos
	for (var i = 1; i <= atributos.cantObstaculos+1; i++) {
		tablero.moveTo(atributos.obstaculos[i],atributos.obstaculos[i*2]);
		tablero.lineTo(atributos.obstaculos[i*3],atributos.obstaculos[i*4]);
		tablero.strokeStyle ="#F00";
		tablero.stroke();
	}
	
}

function dibujarSolution()
{
	// Capa 1: fondo
	if(fondo.imagenOK)
	{
		tabSolution.drawImage (fondo.imagen, 0, 0);
	}
	//Capa 2 : Tifis
	var tifiDibujo = tifis.frente;
	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		if(direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		}
		if(direccion == teclas.DOWN)
		{
			tifiDibujo = tifis.frente;
		}
		if(direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izq;
		}
		if(direccion ==teclas.RIGHT)
		{
			tifiDibujo = tifis.der;
		}
		tabSolution.drawImage (tifiDibujo, atributos.llegadaX,atributos.llegadaY);
	}
	//Capa 3:Obstaculos
	for (var i = 1; i <= atributos.cantObstaculos+1; i++) {
		tabSolution.moveTo(atributos.obstaculos[i],atributos.obstaculos[i*2]);
		tabSolution.lineTo(atributos.obstaculos[i*3],atributos.obstaculos[i*4]);
		tabSolution.strokeStyle ="#000";
		tabSolution.stroke();
	}
	//Capa solutiom

	for (var i = 1; i <= atributos.cantSolucion+1; i++) {
		tabSolution.moveTo(atributos.solucion[i],atributos.solucion[i*2]);
		tabSolution.lineTo(atributos.solucion[i*3],atributos.solucion[i*4]);
		tabSolution.strokeStyle ="#F00";
		tabSolution.stroke();
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state ={
			odbstaculos : [
			
			]
		};
		
}
	componentDidMount(){
		fetch("/tweets", {method:"GET",headers:{accept:"application/json"}})
		.then((res)=>{
			if(res.ok){
				return res.json();
			}
		})
		.then((obs)=>{			
			console.log(atributos);
			console.log(obs[numLab]);
			atributos = obs[numLab];
			console.log(numLab);
			console.log(atributos);
			tifis.x=atributos.posInicialX;
			tifis.y=atributos.posInicialY;
			tifis.velocidad = atributos.velocidad;
			dibujar();
			this.setState({
				obstaculos:obs
			})
		})
		.then(this.inicio());
	}
  render() {
    return (
      <div>
		<h1>Laberinto</h1>
		<div>
		</div>		
		<div>
			<canvas id="campo" width="500" height="500"></canvas>
		</div>
			<div>
				<Solution/>
			</div>	
		</div>

		 );
  }

inicio()
{
	this.canvas = document.getElementById("campo");
	this.solution = document.getElementById("solution");
	tablero  = this.canvas.getContext("2d");
	tabSolution = this.solution.getContext("2d");


	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = this.confirmarFondo();
	
	tifis.frente = new Image();
	tifis.frente.src = tifis.frenteURL;
	tifis.frente.onload = this.confirmarFrente();

	tifis.atras = new Image();
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = this.confirmarAtras();

	tifis.izq = new Image();
	tifis.izq.src = tifis.izqURL;
	tifis.izq.onload = this.confirmarIzq();

	tifis.der = new Image();
	tifis.der.src = tifis.derURL;
	tifis.der.onload = this.confirmarDer();

	



	document.addEventListener("keydown", this.teclado);
	dibujar();
}
teclado(datos)
{
	
	var codigo = datos.keyCode;
	if(codigo == 38)
	{
		tifis.y -=tifis.velocidad;
	}
	if(codigo == teclas.DOWN)
	{
		tifis.y += tifis.velocidad;
	}
	if(codigo == teclas.LEFT)
	{
		tifis.x -= tifis.velocidad;
	}
	if(codigo == teclas.RIGHT)
	{
		tifis.x += tifis.velocidad;
	}
	if(tifis.x == atributos.llegadaX && tifis.y == atributos.llegadaY){
		alert("Felicidades has resuelto el laberinto");
		dibujarSolution();
	}

	direccion = codigo;

	dibujar();

}
confirmarFondo()
{	fondo.imagenOK = true;
	dibujar();
}
confirmarFrente()
{
	tifis.frenteOK = true;
	dibujar();
}
confirmarAtras()
{
	tifis.atrasOK = true;
	dibujar();
}
confirmarIzq()
{
	tifis.izqOK = true;
	dibujar();
}
confirmarDer()
{
	tifis.derOK = true;
	dibujar();
}

}

export default App;
