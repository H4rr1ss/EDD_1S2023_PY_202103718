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
    if(files.length == undefined){
        processFiles(files);
    }else{
        for(const file of files){
            processFiles(file);
        }
    }
}

function processFiles(file){
    const docType = file.type;
    const validExtension = ["application/json"];

    if(validExtension.includes(docType)){


    }else{
        alert("No es un archivo válido");
    }
}