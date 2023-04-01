class Estudiante{
    constructor(carnet){
        this.nombre = "";
        this.carnet = carnet;
        this.password = "";

        this.izq = null;
        this.der = null;
        this.altura = 1;
        this.f_equilibrio = 0;
    }

    get getNombre(){
        return this.nombre
    }

    get getPassword(){
        return this.password
    }

    get getCarnet(){
        return this.carnet
    }

    set setNombre(name){
        this.nombre = name
    }

    set setPassword(pass){
        this.password = pass
    }
}

export default class Arbol_avl{
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

    insertarValorHijo(nodo, raiz){
        if(raiz == null){
            raiz = nodo;
        }else{
            if(raiz.carnet == nodo.carnet){
                raiz.carnet = nodo.carnet

            }else if(raiz.carnet < nodo.carnet){
                raiz.der = this.insertarValorHijo(nodo, raiz.der)

            }else{
                raiz.izq = this.insertarValorHijo(nodo, raiz.izq)
            }
        }

        raiz.altura = 1 + Math.max(this.Altura(raiz.izq), this.Altura(raiz.der))
        let balanceo = this.Equilibrio(raiz)
        raiz.f_equilibrio = balanceo

        /* ROTACION SIMPLE A LA IZQUIERDA */
        if(balanceo > 1 && nodo.carnet > raiz.der.carnet){
            return this.RotacionI(raiz)
        }

        /* ROTACION SIMPLE A LA DERECHA */
        if(balanceo < -1 && nodo.carnet < raiz.izq.carnet){
            return this.RotacionD(raiz)
        }

        /* ROTACION DOBLE A LA IZQUIERDA */
        if(balanceo > 1 && nodo.carnet < raiz.der.carnet){
            raiz.der = this.RotacionD(raiz.der)
            return this.RotacionI(raiz)
        }

        /* ROTACION DOBLE A LA DERECHA */
        if(balanceo < -1 && nodo.carnet > raiz.izq.carnet){
            raiz.izq = this.RotacionI(raiz.izq)
            return this.RotacionD(raiz)
        }

        return raiz
    }

    push(carnet, nombre, password){
        const newNodo = new Estudiante(carnet);
        newNodo.setNombre = nombre;
        newNodo.setPassword = password;
        this.raiz = this.insertarValorHijo(newNodo, this.raiz);
        console.log(newNodo.getNombre+" "+newNodo.getPassword+" "+newNodo.getCarnet)
    }

    returnRaiz(){
        console.log(this.recorridoPostOrden(this.raiz)) 
    }

    returnRaizObj(){
        console.log("pepinillo")
        return this.raiz
    }


    recorridoPostOrden(raiz){
        var cadena = ""

        if(raiz !== null){

            if(raiz.izq !== null){
                cadena += this.recorridoPostOrden(raiz.izq)
                
            }
            
            if(raiz.der !== null){
                cadena += this.recorridoPostOrden(raiz.der)
                
            }
            cadena += "<tr>\n"
            cadena += "\t<td>"+raiz.carnet+"</td>\n"
            cadena += "\t<td>"+raiz.nombre+"</td>\n"
            cadena += "</tr>\n\n"
        }
        
        return cadena
    }

    recorridoPreorden(raiz){
        var cadena = ""
        if(raiz !== null){

            cadena += "<tr>\n"
            cadena += "<td>"+raiz.carnet+"</td>\n"
            cadena += "<td>"+raiz.nombre+"</td>\n"
            cadena += "</tr>\n\n"

            if(raiz.izq !== null){
                cadena = cadena + this.recorridoPreorden(raiz.izq)
            }
            if(raiz.der !== null){
                cadena = cadena + this.recorridoPreorden(raiz.der)
            }
        }
        return cadena
    }

    recorridoInorden(raiz){
        var cadena = ""
        if(raiz !== null){
            if(raiz.izq !== null){
                cadena += this.recorridoInorden(raiz.izq)
            }

            cadena += "<tr>\n"
            cadena += "\t<td>"+raiz.carnet+"</td>\n"
            cadena += "\t<td>"+raiz.nombre+"</td>\n"
            cadena += "</tr>\n"

            if(raiz.der !== null){
                cadena += this.recorridoInorden(raiz.der)
            }
        }
        return cadena
    }

    retornarValoresArbol(raiz, id){
        var cadena = "";
        var numero = id + 1;
        if(raiz !== null){
            cadena += "\"";
            cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
            cadena += "\" ;";
            if(!(raiz.izq === null) && !(raiz.der === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izq, numero)
                cadena += "\"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.der, numero)
                cadena += "{rank=same" + "\"" + raiz.izq.carnet+"\\n"+raiz.izq.nombre +"\\nAltura: "+raiz.izq.altura+ "\"" + " -> " + "\"" + raiz.der.carnet +"\\n"+raiz.der.nombre+ "\\nAltura: "+raiz.der.altura+"\""  + " [style=invis]}; "
            }else if(!(raiz.izq === null) && (raiz.der === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izq, numero)
                cadena += "\"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izq.carnet+"\\n"+raiz.izq.nombre +"\\nAltura: "+raiz.izq.altura+ "\"" + " -> " + "x" + numero + " [style=invis]}; "
            }else if((raiz.izq === null) && !(raiz.der === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.carnet+"\\n"+raiz.nombre+"\\nAltura: "+raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.der, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.der.carnet +"\\n"+raiz.der.nombre+"\\nAltura"+raiz.der.altura+"\"" +  " [style=invis]}; "
            }
        }
        return cadena;
    }


    grafica_arbol(){
        var graphviz = "";
        if(!(this.raiz === null)){
            graphviz = "digraph arbol{\n";
            graphviz += this.retornarValoresArbol(this.raiz, 0);
            graphviz = graphviz + "\n}";
        }else{
            graphviz = "No hay carnetes en el arbol";
        }
        return graphviz;
    }

    returncarnetsArbol(raiz, id){
        var graphviz = "";
        var numero = id + 1;

        if(!(raiz === null)){
            graphviz += "\"";
            graphviz += raiz.carnet;
            graphviz += "\" ;";

            if(!(raiz.izq === null) && !(raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += this.returncarnetsArbol(raiz.izq, numero)
                graphviz += "\"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += this.returncarnetsArbol(raiz.der, numero)
                graphviz += "{rank=same" + "\"" + raiz.izq.carnet + "\"" + " -> " + "\"" + raiz.der.carnet + "\""  + " [style=invis]}; "

            }else if(!(raiz.izq === null) && (raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += this.returncarnetsArbol(raiz.izq, numero)
                graphviz += "\"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += "x" + numero + "[style=invis]";
                graphviz += "{rank=same" + "\"" + raiz.izq.carnet + "\"" + " -> " + "x" + numero + " [style=invis]}; "

            }else if((raiz.izq === null) && !(raiz.der === null)){
                graphviz += " x" + numero + " [label=\"\",width=.1,style=invis];"
                graphviz += "\"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += "x" + numero + "[style=invis]";
                graphviz += "; \"";
                graphviz += raiz.carnet;
                graphviz += "\" -> ";
                graphviz += this.returncarnetsArbol(raiz.der, numero)
                graphviz += "{rank=same" + " x" + numero + " -> \"" + raiz.der.carnet + "\"" +  " [style=invis]}; "
            }
        }
        return graphviz;
    }

    eliminarTodo(){
        this.raiz = null;
    }

    
}