
const dominio2 = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;

    if (url === "/index.html" || url === "/") {

    } else {
        const AgregarEmpleadoBtn = document.getElementById('AgregarEmpleadoBtn');
        AgregarEmpleadoBtn.addEventListener('click', (e) => {
            $('#accionTrab').val('INSERT');
            vaciarFormulario();
        });

        insertarAdmiEmp();
        modalCorroborarPassword();
        const boton1 = document.getElementById('btnEnviarE');
        boton1.addEventListener('click', (e) => {
            if (url === "/pages/trabajadores.html" || url === "/pages/cuentasadmin.html") {
                empleadoUpdate();
            }
        });
        switch (url) {
            case "/pages/cuentasadmin.html": AdminSelect(); break;
            case "/pages/trabajadores.html": empSelect(); break;
        }
    }
});

function vaciarFormulario() {
    $('#txtidEmpleado').val("");
    $('#txtnombreEmpleado').val("");
    $('#txtpasswordEmpleado').val("");
    $('#txtcorreoEmpleado').val("");
    $('#contenidoCargosList3').val("");
}


function modalCorroborarPassword(id) {
    $('#mensajeError').html("");
    $('#txtPasswordC').val("");
    $('#idEmpleado').val(id);
    const btnConfirmarPassword = document.getElementById('btnConfirmarPassword');
    btnConfirmarPassword.addEventListener('click', (e) => {
        const valores = new FormData();
        valores.append("id", $('#idEmpleado').val());
        valores.append("password", $('#txtPasswordC').val());
        $.ajax({
            type: "POST",
            url: dominio2 + "empleados/corroborar/",
            data: valores,
            dataType: 'json',
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (data) {
                if (data["exito"] === false) {
                    $('#mensajeError').html(data["resultado"]);
                } else {
                    vaciarFormulario();
                    $('#accionTrab').val('UPDATE');
                    $('#modalCorroborarPassword').modal('hide');
                    $('#crearTrabajadores').modal('show');
                    $('#txtidEmpleado').val(data["resultado"]["idEmpleado"]);
                    $('#txtnombreEmpleado').val(data["resultado"]["nombreEmpleado"]);
                    $('#txtcorreoEmpleado').val(data["resultado"]["correoEmpleado"]);
                    $('#contenidoCargosList3').val(data["resultado"]["idCargo"]);
                    $('#tituloModal').html("Datos del empleado<br>''" + data["resultado"]["nombreEmpleado"] + "''");
                }
            }
        });
    })
};

function insertarAdmiEmp() {
    const url = window.location.pathname;
    const boton2 = document.getElementById('btnEnviarI');
    boton2.addEventListener('click', (e) => {
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            if ($('#accionTrab').val() === 'UPDATE') {
                empleadoUpdate();
            } else {
                AdminInsert();
            }
        }
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            if ($('#accionTrab').val() === 'UPDATE') {
                empleadoUpdate();
            } else {
                empInsert();
            }
        }
    });
}

function empSelect() {
    $.ajax({
        type: "GET",
        url: dominio2 + "empleados/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["nombreEmpleado"] + '</td>';
                template += '<td>' + valor["correoEmpleado"] + '</td>';
                template += '<td>' + valor["nombreCargo"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    /* template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2" onclick=empGet(' + valor["idEmpleado"] + ')><i class="gg-info"></i></a>'; */
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#modalCorroborarPassword" onclick="modalCorroborarPassword(' + valor["idEmpleado"] + ')"><i class="gg-info"></i></a>';
                    template += '</button>';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-danger" onclick="return empEliminar(' + valor["idEmpleado"] + ')"><i class="gg-trash"></i></a>';
                    template += '</button>';
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;
            });
            $('#contenidoEmpleado').html(tabla);
        }
    });
}

function AdminSelect() {
    $.ajax({
        type: "GET",
        url: dominio2 + "admins/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["idEmpleado"] + '</td>';
                template += '<td>' + valor["nombreEmpleado"] + '</td>';
                template += '<td>' + valor["correoEmpleado"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#modalCorroborarPassword" onclick="modalCorroborarPassword(' + valor["idEmpleado"] + ')"><i class="gg-info"></i></a>';
                template += '</button>';
                if (valor["idEmpleado"] !== 1) {
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-danger" onclick="return empEliminar(' + valor["idEmpleado"] + ')"><i class="gg-trash"></i></a>';
                    template += '</button>';
                }
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;

            });
            $('#contenido2').html(tabla);
        }
    });
}

function empEliminar(id) {
    const url = window.location.pathname;
    $.ajax({
        type: "PUT",
        url: dominio2 + "empleados/delete/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                if ($('#myModal3X').is(':visible') == true) {
                    ocultar4();
                }
                empSelect();
            }
        }
    });
    return false;
}

function empInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado').val());
    registrosEmpl.append("txtidCargo2", $('#contenidoCargosList2').val());
    $.ajax({
        type: "POST",
        url: dominio2 + "empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            empSelect();
        }
    });
}

function AdminInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado').val());
    registrosEmpl.append("txtidCargo2", $('#contenidoCargosList2').val());
    $.ajax({
        type: "POST",
        url: dominio2 + "empleados/create/1/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            AdminSelect();
        }
    });
}

function empleadoUpdate() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());
    registrosEmpl.append("txtnombreEmpleado", $('#txtnombreEmpleado').val());
    registrosEmpl.append("txtcorreoEmpleado", $('#txtcorreoEmpleado').val());
    registrosEmpl.append("txtpasswordEmpleado", $('#txtpasswordEmpleado').val());
    registrosEmpl.append("txtidCargo", $('#contenidoCargosList2').val());
    $.ajax({
        type: "PUT",
        url: dominio2 + "empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            console.log(data);
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                empSelect();
            }
        }
    });
}