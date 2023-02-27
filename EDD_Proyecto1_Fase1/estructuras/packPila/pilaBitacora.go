package packPila

import (
	"fmt"
)

type Pila struct {
	Primero *nodo
	Size    int
}

func (p *Pila) estaVacia() bool {
	if p.Size == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(texto string, fechatexto string) {
	if p.estaVacia() {
		nuevoNodo := &nodo{texto, fechatexto, nil}
		p.Primero = nuevoNodo
		p.Size++
	} else {
		nuevoNodo := &nodo{texto, fechatexto, p.Primero}
		p.Primero = nuevoNodo
		p.Size++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Size--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.texto, " ", p.Primero.fechaSesion)
	}
}
