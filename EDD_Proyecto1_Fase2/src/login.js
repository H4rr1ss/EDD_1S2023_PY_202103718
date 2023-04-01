function ingresar() {
    var username = document.getElementById("usuario").value;
    var userpass = document.getElementById("contra").value;


    if(username == "admin" && userpass == "admin"){
        alert("Bienvenido");
        location.href = "pagAdmin/admin.html";
        alert("Bienvenido2.0");
    }else{
        alert("Usuario y/o contraseña invalidos");
    }
}