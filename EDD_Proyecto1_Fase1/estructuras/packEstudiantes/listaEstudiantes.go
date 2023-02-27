package packEstudiantes

import "fmt"

// ESTRUCTURA DE UNA LISTA DOBLEMENTE ENLAZADA
type ListaDoble struct {
	Inicio *Nodo
	Final  *Nodo
	Size   int
}

// FUNCIONES PARA VERIFICAR SI ESTA VACIA LA LISTA
func (l *ListaDoble) isEmpty() bool {
	if l.Size == 0 {
		return true
	}
	return false
}

// FUNCIONES PARA LA CREACION DE LOS NUEVOS NODOS PARA LAS LISTAS
func (l *ListaDoble) newNodo(estudiante *Estudiante) *Nodo {
	return &Nodo{estudiante, nil, nil}
}

// PARA AGREAGAR ESTUDIANTES
func (l *ListaDoble) AddEstudiante(nombre string, apellido string, carnet string, pass string) {
	newEstudiante := &Estudiante{nombre, apellido, carnet, pass}
	if l.isEmpty() {
		nuevoNodo := l.newNodo(newEstudiante)
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Size++
	} else {
		nuevoNodo := l.newNodo(newEstudiante)

		if l.Final.anterior == nil {
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else {
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Size++
	}
}

// MOSTRAR TODOS LOS NODOS QUE ESTAN DENTRO DE LA LISTA
func (l *ListaDoble) MostrarLista() {
	current := l.Inicio

	for current != nil {
		fmt.Printf("Nombre: %s %s, Carnet: %s\n", current.estudiante.nombre, current.estudiante.apellido, current.estudiante.carnet)
		fmt.Println("*****************************************")
		current = current.siguiente
	}
}

// VERIFICAR SI SE REPITE UN ESTUDIANTE
func (l *ListaDoble) EstudianteRepetido(nombre string) bool {
	current := l.Inicio
	for current != nil {
		if nombre == current.estudiante.nombre {
			return true
		}
		current = current.siguiente
	}
	return false
}
