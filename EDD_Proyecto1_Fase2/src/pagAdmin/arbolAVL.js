class nodoArbol{
    constructor(entrada){
        this.izq = null;
        this.der = null;
        this.entrada = entrada;
        this.altura = 1;
        this.f_equilibrio = 0;
    }
}

class Arbol_avl{
    constructor(){
        this.raiz = null;
    }

    Altura(raiz){
        return raiz === null ? 0: raiz.altura
    }

    Equilibrio(raiz){
        return raiz === null ? 0: (this.Altura(raiz.der)-this.Altura(raiz.izq))
    }

    RotacionI(raiz){
        let raiz_der = raiz.der
        let hijo_izq = raiz_der.izq

        raiz_der.izq = raiz
        raiz.der = hijo_izq
        raiz.altura = 1 + Math.max(this.Altura(raiz.izq), this.Altura(raiz.der))
        raiz_der.altura = 1+ Math.max(this.Altura(raiz_der.izq), this.Altura(raiz_der.der))
        raiz.f_equilibrio = this.Equilibrio(raiz)
        raiz_der.f_equilibrio = this.Equilibrio(raiz_der)
         
        return raiz_der
    }

    RotacionD(raiz){
        let raiz_izq = raiz.izq
        let hijo_der = raiz_izq.der

        raiz_izq.der = raiz
        raiz.izq = hijo_der
        raiz.altura = 1 + Math.max(this.Altura(raiz.izq), this.Altura(raiz.der))
        raiz_izq.altura = 1 + Math.max(this.Altura(raiz_izq.izq), this.Altura(raiz_izq.der))
        raiz.f_equilibrio =  this.Equilibrio(raiz)
        raiz_izq.f_equilibrio = this.Equilibrio(raiz_izq)

        return raiz_izq
    }

    insertar(nodo, raiz){
        if(raiz == null){
            raiz = nodo;
        }else{
            if(raiz.entrada == nodo.entrada){
                raiz.entrada = nodo.entrada

            }else if(raiz.entrada < nodo.entrada){
                raiz.der = this.insertar(nodo, raiz.der)

            }else{
                raiz.izq = this.insertar(nodo, raiz.izq)
            }
        }

        raiz.altura = 1 + Math.max(this.Altura(raiz.izq), this.Altura(raiz.der))
        let balanceo = thos.Equilibrio(raiz)
        raiz.f_equilibrio = balanceo

        /* ROTACION SIMPLE A LA IZQUIERDA */
        if(balanceo > 1 && nodo.entrada > raiz.der.entrada){
            return this.RotacionI(raiz)
        }

        /* ROTACION SIMPLE A LA DERECHA */
        if(balanceo < -1 && nodo.entrada < raiz.izq.entrada){
            return this.RotacionD(raiz)
        }

        /* ROTACION DOBLE A LA IZQUIERDA */
        if(balanceo > 1 && nodo.entrada < raiz.der.entrada){
            raiz.der = this.RotacionD(raiz.der)
            return this.RotacionI(raiz)
        }

        /* ROTACION DOBLE A LA DERECHA */
        if(balanceo < -1 && nodo.entrada > raiz.izq.entrada){
            raiz.izq = this.RotacionI(raiz.izq)
            return this.RotacionD(raiz)
        }

        return raiz
    }

    insertar(val){
        const newNodo = new nodoArbol(val);
        this.raiz = this.insertar(newNodo, this.raiz);
    }


    grafica_arbol(){
        var graphviz = "";
        if(!(this.raiz === null)){
            graphviz = "digraph arbol{ ";
            graphviz = graphviz + this.retornarentradaesArbol(this.raiz, 0);
            graphviz = graphviz + "}";
        }else{
            graphviz = "No hay entradaes en el arbol";
        }
        return graphviz;
    }

    returnEntradasArbol(raiz, id){
        var graphviz = "";
        var numero = id + 1;

        if(!(raiz === null)){
            graphviz += "\"";
            graphviz += raiz.entrada;
            graphviz += "\" ;";

            if(!(raiz.izq === null) && !(raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += this.returnEntradasArbol(raiz.izq, numero)
                graphviz += "\"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += this.returnEntradasArbol(raiz.der, numero)
                graphviz += "{rank=same" + "\"" + raiz.izq.entrada + "\"" + " -> " + "\"" + raiz.der.entrada + "\""  + " [style=invis]}; "

            }else if(!(raiz.izq === null) && (raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += this.returnEntradasArbol(raiz.izq, numero)
                graphviz += "\"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += "x" + numero + "[style=invis]";
                graphviz += "{rank=same" + "\"" + raiz.izq.entrada + "\"" + " -> " + "x" + numero + " [style=invis]}; "

            }else if((raiz.izq === null) && !(raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += "x" + numero + "[style=invis]";
                graphviz += "; \"";
                graphviz += raiz.entrada;
                graphviz += "\" -> ";
                graphviz += this.returnEntradasArbol(raiz.der, numero)
                graphviz += "{rank=same" + " x" + numero + " -> \"" + raiz.der.entrada + "\"" +  " [style=invis]}; "
            }
        }
        return graphviz;
    }

    eliminarTodo(){
        this.raiz = null;
    }

}