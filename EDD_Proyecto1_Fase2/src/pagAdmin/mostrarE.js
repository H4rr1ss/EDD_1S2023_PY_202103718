import Arbol_avl from "./estudiante/arbolAVL.js"

/* EXTRACCION DE INFORMACION PARA TABLA */
var ObjEstudiantes = JSON.parse(localStorage.getItem("structEstudiantes"));
var StructEstudiante = new  Arbol_avl();
StructEstudiante.raiz = ObjEstudiantes.raiz;

const tablaBody = document.getElementById("tableBody_users");
tablaBody.innerHTML = StructEstudiante.recorridoPostOrden(ObjEstudiantes.raiz);

var contador = 0
console.log("\n\nINFO MOVIDA:\n"+ StructEstudiante.recorridoPostOrden(ObjEstudiantes.raiz, contador))