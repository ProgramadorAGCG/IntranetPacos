window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    // console.log("la url es:", url);
    const boton1 = document.getElementById('btnEnviarE');
    boton1.addEventListener('click', (e) => {
        e.preventDefault();
        // if (url === "/create.html") { empInsert(); }
        // if (url === "/pages/empInsert.html") { empInsert(); }
        if (url === "/pages/trabajadores.html") {
            // console.log("la url del insert es:", url); 
            console.log("la url dentro del pages es:", url);
            // empInsert();
            cursoUpdate();
        }
        if (url === "/pages/cuentasadmin.html") {
            // console.log("la url del insert es:", url); 
            console.log("la url dentro del pages es:", url);
            // empInsert();
            cursoUpdate();
        }
    });
    if (url === "/pages/cuentasadmin.html") {
        console.log("usted se encuentra en:", url);
        AdminSelect();
    }
    if (url === "/pages/trabajadores.html") {
        console.log("usted se encuentra en:", url);
        empSelect();
        // AdminSelect();
    }
    // if (url === "/crearExcel.html") { archivoCargar(); }
});
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url es:", url);
    const boton2 = document.getElementById('btnEnviarI');
    boton2.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/cuentasadmin.html") {
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/select/",
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
        // url: "http://localhost:5000/curso/select/",  
        url: "https://f3rn4nd021py.pythonanywhere.com/admins/select/",
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/get/" + id + "/",
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/delete/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/cuentasadmin.html") {
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/trabajadores.html";
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/create/",
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
        url: "https://f3rn4nd021py.pythonanywhere.com/empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/cuentasadmin.html") {
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


// function archivoCargar() {
//     const archivoExcel = document.getElementById('archivoExcel');
//     archivoExcel.addEventListener('change', (e) => {
//         var registrosEmpl = new FormData();
//         registrosEmpl.append("archivoExcel", $('#archivoExcel')[0].files[0]);
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:5000/curso/cargarexcel/",
//             data: registrosEmpl,
//             dataType: 'json',
//             contentType: false,
//             enctype: 'multipart/form-data',
//             processData: false,
//             success: function (data) {
//                 let tabla = '';
//                 $.each(data["cursos"], function (llave, valor) {
//                     let template = '<tr>';
//                     template += '<td>' + valor[0] + '</td>';
//                     template += '<td>' + valor[1] + '</td>';
//                     template += '</tr>'
//                     tabla += template;
//                 });
//                 $('#tablaExcel').html(tabla);
//             }
//         });
//     });
// }

// function insertarDatosExcel() {
//     const tablaExcel = document.getElementById('tablaExcel');
//     const hijos = tablaExcel.children;
//     console.log(hijos);
//     let arreglo = [];
//     for (const iterator of hijos) {
//         const hijo1 = iterator.firstElementChild.textContent;
//         const hijo2 = iterator.lastElementChild.textContent;
//         let elemento = [hijo1, hijo2];
//         arreglo.push(elemento);
//     }
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:5000/curso/crear/",
//         data: JSON.stringify(arreglo),
//         dataType: 'json',
//         contentType: 'application/json',
//         processData: false,
//         success: function (data) {
//             // window.location.href = "index.html";
//         }
//     });
// }