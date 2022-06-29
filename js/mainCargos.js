window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url es:", url);
    const boton = document.getElementById('btnEnviarCI');
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        // if (url === "/create.html") { empInsert(); }
        // if (url === "/pages/empInsert.html") { empInsert(); }
        if (url === "/pages/trabajadores.html") {
            // console.log("la url del insert es:", url); 
            console.log("la url dentro del pages es:", url);
            // empInsert();
            cargoUpdate();
        }
        if (url === "/pages/cuentasAdmin.html") {
            // console.log("la url del insert es:", url); 
            console.log("la url dentro del pages es:", url);
            // empInsert();
            // cursoUpdate();
        }
        // else if (url === "/crearExcel.html") { insertarDatosExcel(); }
        // else {
        //     // console.log("estoy en:", url);
        //     console.log("la url dentro del update es:", url);
        //     cursoUpdate();
        // }
    });
    // if (url === "/pages/cuentasAdmin.html") {
    //     //     // console.log("la url del insert es:", url); 
    //     //     console.log("la url dentro del pages es:", url);
    //     AdminSelect();
    // }
    if (url === "/pages/trabajadores.html") {
        cargosSelect();
    }
    // if (url === "/crearExcel.html") { archivoCargar(); }
});
function cargosSelect() {
    $.ajax({
        type: "GET",
        url: "https://f3rn4nd021py.pythonanywhere.com/cargos/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                if (valor["idCargo"] == 1) {
                    var template = '<tr>';
                    template += '<td>' + valor["idCargo"] + '</td>';
                    template += '<td>' + valor["nombreCargo"] + '</td>';
                    template += '<td>' + valor["estado"] + '</td>';
                    template += '<td class="grupoBotones">';
                    template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="bx bx-info-circle"></i></a>';
                    template += '</button>';
                    template += '</div>';
                    template += '</td>';
                    template += '</tr>';
                    tabla += template;
                } else {
                    var template = '<tr>';
                    template += '<td>' + valor["idCargo"] + '</td>';
                    template += '<td>' + valor["nombreCargo"] + '</td>';
                    template += '<td>' + valor["estado"] + '</td>';
                    template += '<td class="grupoBotones">';
                    template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="bx bx-info-circle"></i></a>';
                    template += '</button>';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-danger" onclick="return deshabilitar(' + valor["idCargo"] + ')"><i class="bx bxs-trash-alt"></i></a>';
                    template += '</button>';
                    template += '</div>';
                    template += '</td>';
                    template += '</tr>';
                    tabla += template;
                }
            });
            $('#contenido3').html(tabla);
        }
    });
}
function cargoGet(id) {
    console.log("el id es:", id);
    $.ajax({
        type: "GET",
        url: "https://f3rn4nd021py.pythonanywhere.com/cargos/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidCargo2').val(data["resultado"]["idCargo2"]);
            $('#txtnombreCargo2').val(data["resultado"]["nombreCargo2"]);
            $('#tituloModalcargo').html("Actualizando el cargo: <br>" + data["resultado"]["nombreCargo2"]);
        }
    });
}
function cargoInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreCargo", $('#txtnombreCargo').val());
    $.ajax({
        type: "POST",
        url: "https://f3rn4nd021py.pythonanywhere.com/cargos/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/trabajadores.html";

            cargosSelect();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    formulario.reset();
}
function cerrarModal() {
    // var modal = getElementById('#myModal3')
    $('#myModal3').modal('hide');
    // $(modal).modal('hide');
    // $('#modal-body').modal('hide');
}
function cargoUpdate() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    registrosEmpl.append("txtnombreCargo2", $('#txtnombreCargo2').val());
    $.ajax({
        type: "PUT",
        url: "https://f3rn4nd021py.pythonanywhere.com/cargos/update/" + registrosEmpl.get("txtidCargo2") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            // if (url === "/pages/cuentasAdmin.html") {
            //     AdminSelect();
            // }
            if (url === "/pages/trabajadores.html") {
                cargosSelect();
            }
            // cargosSelect();
            crearMensaje(data["mensaje"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function deshabilitar(id) {
    const url = window.location.pathname;
    $.ajax({
        type: "PUT",
        url: "https://f3rn4nd021py.pythonanywhere.com/cargos/update2/" + id + "/",
        dataType: "json",
        success: function (data) {
            // if (url === "/pages/cuentasAdmin.html") {
            //     AdminSelect();
            // }
            if (url === "/pages/trabajadores.html") {
                cargosSelect();
            }
            crearMensaje(data["resultado"]);
        }
    });
    return false;
}