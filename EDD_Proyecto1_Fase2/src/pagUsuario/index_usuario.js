import * as DB from "./db.js"
import Arbol_avl from "../pagAdmin/estudiante/arbolAVL.js";
import CircularJSON from "../circular-json.js";
import Matriz from "./ArbolCarpetas/matriz.js";

/* LLAMADO DE DOCUMENTO */
const texto = document.getElementById("usuario_id");
var carpetaN = document.getElementById("CrearCarpeta");
var btn_crearCarpeta = document.getElementById("crear_carpeta");
var repoteCarpeta = document.getElementById("img_archivos");
var ReporteArchivos = document.getElementById("ReporteArchivos");
const inputElement = document.getElementById("input-file");
var CarpetaActual = document.getElementById("buscadorCarpetas");
var cargar_archivos = document.getElementById("cargar_archivos");
var botonBusqueda = document.getElementById("botonBusqueda");
var btn_eliminarCarpeta = document.getElementById("eliminarCarpeta");
var btn_login = document.getElementById("btn4")

texto.innerText = localStorage.getItem("estudiante")

/* REGRESO AL LOGIN */
btn_login.addEventListener("click", function (event){
    location.href = "/EDD_Proyecto1_Fase2/src/index.html";
})

/*
        --------------- CREACIÓN DE UNA CARPETA ---------------
*/
carpetaN.addEventListener('show.bs.modal', function (event) {
    document.getElementById("recipient-directory").value = ""
    document.getElementById("recipient-name").value = ""
    document.getElementById("ALERTA_CARPETA").className = "alert-secondary"
    document.querySelector('#ALERTA_CARPETA').textContent = ""
})


btn_crearCarpeta.addEventListener("click", function (event) {
    var directorio = document.getElementById("recipient-directory").value
    var nombre = document.getElementById("recipient-name").value
    var carnet = localStorage.getItem("estudiante")

    var respuesta_alerta = DB.agregarCarpeta_user(carnet, directorio, nombre)

    var claseALERTA = document.getElementById("ALERTA_CARPETA");
    var textoALERTA = document.querySelector('#ALERTA_CARPETA');

    if(respuesta_alerta == "Carpeta creada correctamente!"){
        claseALERTA.className = "alert alert-success";
        textoALERTA.textContent = respuesta_alerta;
    }else{
        claseALERTA.className = "alert alert-danger";
        textoALERTA.textContent = respuesta_alerta;
    }
})

/* 
        --------------- GRAFICACIÓN DE ARBOL NARIO ---------------
*/
repoteCarpeta.addEventListener("show.bs.modal", function (event){
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var estudiante = localStorage.getItem("estudiante");

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var grafica =  struct.reporte_carpetas(ObjEstudiantes.raiz, estudiante)
    
    let url = 'https://quickchart.io/graphviz?graph=';
    document.getElementById("report_carpetas").src = url+grafica
})

/* 
        --------------- CARGA DE ARCHIVOS A MATRIZ DISPERSA ---------------
*/
let nombreArchivo = ""
let base64String = ""
inputElement.addEventListener("change", onChange, false);

// INPUT DE ARCHIVOS
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    nombreArchivo = event.target.files[0].name
    reader.readAsDataURL(event.target.files[0]);
}

function onReaderLoad(event){
    base64String = event.target.result
}

cargar_archivos.addEventListener("click", function (event){
    var textoSearch = CarpetaActual.value

    DB.agregarMatrizD(nombreArchivo, textoSearch, 1);
    console.log(nombreArchivo+" ->  "+textoSearch);
    depliegueDeCarpetas()
})

/* 
        --------------- BUSQUEDA DE ARCHIVOS Y CARPETAS POR MEDIO DE RUTA ---------------
*/
botonBusqueda.addEventListener("click", function (event){
    depliegueDeCarpetas()
})

function depliegueDeCarpetas(){
    var ruta = CarpetaActual.value
    var lista_carpeta = ruta.split('/')
    var carpeta

    if(ruta === "/"){
        carpeta = "/"
    }else{
        carpeta = lista_carpeta[lista_carpeta.length - 1];
    }

    DB.tablaCarpetas(carpeta, lista_carpeta)
}

/* 
        --------------- GRAFICACIÓN DE MATRIZ CON ARCHIVOS DE DETERMINADA CARPETA ---------------
*/
ReporteArchivos.addEventListener("show.bs.modal", function (event){
    var ruta = CarpetaActual.value
    let carpetasSeparadas = ruta.split('/')
    var carpeta

    if(ruta === "/"){
        carpeta = "/"
    }else{
        carpeta = carpetasSeparadas[carpetasSeparadas.length - 1];
    }

    var NodoCarpeta = DB.graficacionMatriz(carpeta, carpetasSeparadas)

    if(NodoCarpeta != ""){
        var matriz = new Matriz()

        matriz.principal = CircularJSON.parse(JSON.parse(NodoCarpeta)).principal
        matriz.coordenadaX = CircularJSON.parse(JSON.parse(NodoCarpeta)).coordenadaX
        matriz.coordenadaY = CircularJSON.parse(JSON.parse(NodoCarpeta)).coordenadaY

        let url = 'https://quickchart.io/graphviz?graph=';
        document.getElementById("report_archivos").src = url+matriz.reporte()

    }else{
        alert("revise la ruta por favor!")
    }
})


/* 
        --------------- ELIMINACIÓN DE CAREPTA ---------------
*/
btn_eliminarCarpeta.addEventListener("click", function (event){
    var ruta = CarpetaActual.value
    let carpetasSeparadas = ruta.split('/')
    DB.eliminarCarpeta(carpetasSeparadas)
})