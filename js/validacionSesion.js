window.addEventListener('load',(e)=>{
    const url = window.location.pathname;
    console.log(url);
    if(url === "/index.html" || url==="/"){
        operacionLoguear();
        login();
    }else{
        validarSesssion();
        cerrarSesion();
    }
});

function cerrarSesion(){
    btnCerrarSesion.addEventListener('click',(e)=>{
        sessionStorage.setItem("idEmpleado", null);
        window.location.href = "/";
    });
    
}

function validarOperaciones(idCargo){
    const valores = document.querySelectorAll('#main-nav li');
    if(idCargo === 1){
        valores[0].style.display = "none";
        valores[1].style.display = "none";
        valores[5].style.display = "none";
    }else{
        valores[2].style.display = "none";
        valores[3].style.display = "none";
        valores[4].style.display = "none";
        valores[6].style.display = "none";
    }
}

function validarSesssion(){
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if(idEmpleado === 'null'){
        window.location.href = "/index.html";
    }else{
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                validarOperaciones(data["resultado"]["idCargo"]);
            }
        });
        
    }
}

function operacionLoguear(){
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if(idEmpleado !== null){
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                if(data["exito"] === true){
                    window.location.href = "pages/cuentasAdmin.html";
                    validarOperaciones(data["resultado"]["idCargo"]);
                }
            }
        });
    }

}

function login(){
    const txtCorreo = document.getElementById('txtCorreo');
    const txtPassword = document.getElementById('txtPassword');
    const logIncorrecto = document.getElementById('logIncorrecto');
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click',(e)=>{
        e.preventDefault();
        const registro = new FormData();
        registro.append("txtCorreo", txtCorreo.value);
        registro.append("txtPassword", txtPassword.value);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/empleados/login/",
            data: registro,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function (data) {
                if(data["exito"]===true){
                    sessionStorage.setItem("idEmpleado", data["resultado"]["idEmpleado"]);
                    window.location.href = "pages/cuentasAdmin.html";
                    validarOperaciones(data["resultado"]["idCargo"]);
                }else{
                    logIncorrecto.textContent = data["resultado"]
                }
            }
        });
    });
}
