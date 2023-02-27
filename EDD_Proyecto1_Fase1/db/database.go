package db

import (
	"EDD_1S2023_PY_202103718/estructuras/packCola"
	"EDD_1S2023_PY_202103718/estructuras/packEstudiantes"
	"fmt"
)

var listaEstudiantes = &packEstudiantes.ListaDoble{Inicio: nil, Final: nil, Size: 0}
var colaDeEspera = &packCola.Cola{Primero: nil, Size: 0}

func AgregarEstudiante(nombre string, apellido string, carnet string, pass string) bool {
	if colaDeEspera.EstudianteRepetido(carnet) {
		return false
	}

	colaDeEspera.Encolar(nombre, apellido, carnet, pass)
	colaDeEspera.Graficar()
	return true
}

func ReturnPrimerEstudiante() string {
	if colaDeEspera.MostrarPrimero() {
		return "1"
	}
	return "2"
}

func AprobarEstudiante() {
	nombre, apellido, carnet, pass := colaDeEspera.RetunPrimero()
	listaEstudiantes.AddEstudiante(nombre, apellido, carnet, pass)
	colaDeEspera.Descolar()
	colaDeEspera.Graficar()
}

func ListaDeEstudiantesRegistrados() {
	fmt.Println("\n-------------------- Listado de Estudiantes --------------------")
	fmt.Print("\n")
	listaEstudiantes.MostrarLista()
}
