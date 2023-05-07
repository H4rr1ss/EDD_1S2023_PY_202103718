import { encryptSHA256 } from "../encriptacion/encriptarPass.js"
import CircularJSON from "../../EDD_Proyecto1_Fase2/src/circular-json.js";
import ArbolNArio from "../../EDD_Proyecto1_Fase2/src/pagUsuario/ArbolCarpetas/arbolN.js";
import grafoDirigido from "../GrafoDirigido/grafo.js";

export async function insertarHash(avl, hash){
    const lista = avl.recorridoArbol(avl.raiz)

    for (const alum of lista){
        const hashPass = await encryptSHA256(alum.password);
        hash.insertar(alum.carnet, alum.nombre, hashPass, CircularJSON.stringify(alum.archivos))
    }

    const table = JSON.stringify(hash)
    localStorage.setItem("structHash", table)

    const tablaBody = document.getElementById("tableBody_users");
    tablaBody.innerHTML = hash.tablaEstudiantes();

}

export function buildDirectedGraph(hashTable) {
    // Recorremos la Hash Table
    for (let i = 0; i < hashTable.capacidad; i++) {
        const node = hashTable.tabla[i]
        
        if(node){
            console.log(JSON.parse(node.archivos))
            // Exportamos el N-Ary Tree
            const rootNAry = (JSON.parse(node.archivos)).raiz;
            const nodesNAry = (JSON.parse(node.archivos)).nodo_creados;

            // Seteamos el N-Ary Tree
            const newNAry = new ArbolNArio();
            newNAry["raiz"] = rootNAry;
            newNAry["nodo_creados"] = nodesNAry;
            //console.log(node.user, newNAry);

            // Creamos el grafo dirigido
            const newGraph = new grafoDirigido();

            // Insertamos los nodos del N-Ary Tree en el grafo dirigido
            newNAry.toDirectedGraph(newGraph);

            if (newGraph.principal != null) {
                console.log(newGraph);
                //newGraph.graphDirectedGraph()
                console.log(newGraph.grafica());
                return newGraph.grafica()
            }
        }
    }
}