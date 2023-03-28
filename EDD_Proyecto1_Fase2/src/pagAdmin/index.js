import DB from "./db.js"

const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener("click", (e) => {
    input.click();
}); 

input.addEventListener("change", (e) => {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});


dropArea.addEventListener("dragover", (e) =>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelte para cargar los archivos";
});

dropArea.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastre y suelte los archivos aquí para subirlos";
});

dropArea.addEventListener("drop", (e) =>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active"); 
    dragText.textContent = "Arrastre y suelte los archivos aquí para subirlos";
});


function showFiles(files){
    /*if(files.length == undefined){
        
    }else{
        for(const file of files){
            processFiles(file);
        }
    }*/
}





const inputElement = document.getElementById("input-file");
inputElement.addEventListener("change", onchange, false);
function onchange(event){
var reader = new FileReader();
reader.onload = onReaderLoad;
reader.readAsText(event.target.files[0]);
}   

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);

    for(var i = 0; i<obj.alumnos.length; i++){
        /* ACÁ SE INGRESARAN LOS DATOS AL ARBOL AVL */ 
        console.log(obj.alumnos[i].nombre);
    }
    //DB.nombre()
}