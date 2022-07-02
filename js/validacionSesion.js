window.addEventListener('load',(e)=>{
    const url = window.location.pathname;
    if(url === "/index.html" || url==="/"){
        operacionLoguear();
        login();
        visualizarPassword();
    }else{
        validarSesssion();
        cerrarSesion();
        llenarPerfil();
    }
});

function redireccionDefecto(idCargo){
    if(idCargo === 1) window.location.href = "/pages/cuentasAdmin.html";
    else window.location.href = "/pages/moduloEncuesta.html";
}

function cerrarSesion(){
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click',(e)=>{
        sessionStorage.setItem("idEmpleado", null);
        window.location.href = "/";
    });
}

function visualizarPassword(){
    btnPasswordVision = document.getElementById('btnPasswordVision');
    txtPassword = document.getElementById('txtPassword');
    icono = document.querySelector('#btnPasswordVision i');
    btnPasswordVision.addEventListener('click',(e)=>{
        if(txtPassword.type === 'password'){
            txtPassword.type = 'text';
            icono.className = 'bx bxs-show';
        }else{
            txtPassword.type = 'password';
            icono.className = 'bx bxs-hide';
        }
    });
    
}

function validarOperaciones(idCargo){
    let cadena = "";
    if(idCargo === 1){
        cadena = '<li>'+
                    '<a href="ofertas.html">'+
                        '<i class="fa fa-utensils"></i>Ofertas'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="trabajadores.html">'+
                        '<i class="fa fa-user-tie"></i>Trabajadores'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="encuesta.html">'+
                        '<i class="fa fa-check-square-o"></i>Encuestas'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="cuentasAdmin.html">'+
                        '<i class="fa fa-lock-open"></i>Cuentas Admin'+
                    '</a>'+
                '</li>';
    }else{
        cadena = '<li>'+
                    '<a href="pedidos.html">'+
                        '<i class="fa fa-utensils"></i>Pedidos'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="carta.html">'+
                        '<i class="fa fa-utensils"></i>Carta'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="moduloEncuesta.html">'+
                        '<i class="fa fa-check-square-o"></i>Modulo de encuestas'+
                    '</a>'+
                '</li>';
    }
    $('#main-nav').html(cadena);
}

function validarSesssion(){
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if(idEmpleado === null){
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
                    redireccionDefecto(data["resultado"]["idCargo"]);
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
                    redireccionDefecto(data["resultado"]["idCargo"]);
                    validarOperaciones(data["resultado"]["idCargo"]);
                }else{
                    logIncorrecto.textContent = data["resultado"]
                }
            }
        });
    });
}

function llenarPerfil(){
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if(idEmpleado !== null){
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/empleados/loginget/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                if(data["exito"] === true){
                    let carta = `<div>Correo: ${data["resultado"]["correoEmpleado"]}</div>`
                    carta += `<div>Nombre: ${data["resultado"]["nombreEmpleado"]}
                    </div>`
                    carta += `<div>Encuestas realizadas: ${data["resultado"]["encuestasRealizadas"]}
                    </div>`
                    carta += `<div>Cargo: ${data["resultado"]["nombreCargo"]}
                    </div>`
                    $('#perfil').html(carta)
                }
            }
        });
    }
}