window.addEventListener('load', (e) => {
    const url = window.location.pathname;

    const boton1 = document.getElementById('btnEnviarE');
    boton1.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html") {
            console.log("la url dentro del pages es:", url);
            cursoUpdate();
        }
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            console.log("la url dentro del pages es:", url);
            cursoUpdate();
        }
    });

    switch(url){
        case "/pages/cuentasAdmin.html": AdminSelect(); break;
        case "/pages/trabajadores.html": empSelect(); break;
    }
});

window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const boton2 = document.getElementById('btnEnviarI');
    boton2.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            console.log("la url dentro del pages es:", url);
            AdminInsert();
        }
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            console.log("la url dentro del pages es:", url);
            empInsert();
        }
    });
});





function empSelect() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/empleados/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["idEmpleado"] + '</td>';
                template += '<td>' + valor["nombreEmpleado"] + '</td>';
                template += '<td>' + valor["correoEmpleado"] + '</td>';
                template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                template += '<td>' + valor["estado"] + '</td>';
                template += '<td>' + valor["idCargo"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2" onclick=empGet(' + valor["idEmpleado"] + ')><i class="bx bx-info-circle"></i></a>';
                template += '</button>';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-danger" onclick="return empEliminar(' + valor["idEmpleado"] + ')"><i class="bx bxs-trash-alt"></i></a>';
                template += '</button>';
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;
            });
            $('#contenido2').html(tabla);
        }
    });
}
function AdminSelect() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/admins/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["idEmpleado"] + '</td>';
                template += '<td>' + valor["nombreEmpleado"] + '</td>';
                template += '<td>' + valor["correoEmpleado"] + '</td>';
                template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                template += '<td>' + valor["estado"] + '</td>';
                template += '<td>' + valor["idCargo"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2" onclick=empGet(' + valor["idEmpleado"] + ')><i class="bx bx-info-circle"></i></a>';
                template += '</button>';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-danger" onclick="return empEliminar(' + valor["idEmpleado"] + ')"><i class="bx bxs-trash-alt"></i></a>';
                template += '</button>';
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;
            });
            $('#contenido2').html(tabla);
        }
    });
}

function empGet(id) {
    console.log("el id es:", id);
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/empleados/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidEmpleado').val(data["resultado"]["idEmpleado"]);
            $('#txtnombreEmpleado').val(data["resultado"]["nombreEmpleado"]);
            $('#txtcorreoEmpleado').val(data["resultado"]["correoEmpleado"]);
            $('#txtencuestasRealizadas').val(data["resultado"]["encuestasRealizadas"]);
            $('#txtestado').val(data["resultado"]["estado"]);
            $('#txtidCargo').val(data["resultado"]["idCargo"]);
            $('#tituloModal').html("Actualizando datos del empleado: <br>" + data["resultado"]["nombreEmpleado"]);
        }
    });
}

function empEliminar(id) {
    const url = window.location.pathname;
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:5000/empleados/delete/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                empSelect();
            }
            crearMensaje(data["resultado"]);
        }
    });
    return false;
}

function crearMensaje(mensaje) {
    const elementoMensaje = document.getElementById('mensaje');
    elementoMensaje.classList.add("visible");
    elementoMensaje.removeChild(elementoMensaje.lastChild);
    const parrafo = document.createElement("P");
    parrafo.appendChild(document.createTextNode(mensaje));
    elementoMensaje.appendChild(parrafo);
}


function empInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado2').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado2').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado2').val());
    registrosEmpl.append("txtencuestasRealizadas2", $('#txtencuestasRealizadas2').val());
    registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    $.ajax({
        type: "POST",
        // url: "http://localhost:5000/curso/create/",
        url: "http://127.0.0.1:5000/empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            empSelect();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    formulario.reset();
}

function AdminInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado2').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado2').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado2').val());
    registrosEmpl.append("txtencuestasRealizadas2", $('#txtencuestasRealizadas2').val());
    registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    $.ajax({
        type: "POST",
        // url: "http://localhost:5000/curso/create/",
        url: "http://127.0.0.1:5000/empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/cuentasadmin.html";
            AdminSelect();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    formulario.reset();
}

function cursoUpdate() {
    const url = window.location.pathname;

    var registrosEmpl = new FormData();
    registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());

    registrosEmpl.append("txtnombreEmpleado", $('#txtnombreEmpleado').val());
    registrosEmpl.append("txtcorreoEmpleado", $('#txtcorreoEmpleado').val());
    registrosEmpl.append("txtpasswordEmpleado", $('#txtpasswordEmpleado').val());
    registrosEmpl.append("txtencuestasRealizadas", $('#txtencuestasRealizadas').val());
    registrosEmpl.append("txtidCargo", $('#txtidCargo').val());
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                console.log("actualiza en cuenta admins")
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                empSelect();
            }
            // empSelect();
            crearMensaje(data["mensaje"]);
        }
    });
    // limpiar contraseña
    formulario2.reset();
}