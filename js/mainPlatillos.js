const dominio2 = "http://127.0.0.1:5000";
var categoria = 2;

window.addEventListener('load',(e)=>{
    filtroCategoria(categoria);
    modalClose();
    const registrarPlatillo = document.getElementById('registrarPlatillo');
    registrarPlatillo.addEventListener('click',(e)=>{
        const txtAccion = document.getElementById('txtAccion');
        if (txtAccion.value === "INSERT"){
            platillosInsert();
        }else{
            platillosUpdate();
        }
    });
    const btnInsertarPlatillo = document.getElementById('btnInsertarPlatillo');
    btnInsertarPlatillo.addEventListener('click',(e)=>{
        vaciarFormulario();
        $('#tituloUpdate').html('INSERTAR PLATILLO');
        $('#registrarPlatillo').html('Registrar');
        modalClose();
    });
    
});

function filtroCategoriaSelected() {
    const selectBox = document.getElementById("categoriaFiltro");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    filtroCategoria(selectedValue);
}

function filtroCategoria(id){
    platillosSelect(id);
    categoria = id;
    $('#categoriaSelectRegisterPlatillo').val(id)
}

function vaciarFormulario(){
    $('#txtAccion').val('INSERT');
    $('#txtIdPlatillo').val('');
    $('#nombrePlatillo>input').val('');
    $('#precioPlatillo>input').val('');
    $('#descripPlatillo>textArea').val('');
    $("#imagenPlatillo>input").val(null);
    $(".custom-file-label").html('Choose file');
    $('#registrarPlatillo').html('Registrar');
    $('#categoriaSelectRegisterPlatillo option:nth(0)').attr("selected", "selected");
}

function platillosSelect(idCategoria) {
    $.ajax({
        type: "GET",
        url: `${dominio2}/platillos/selectCateg/${idCategoria}`,
        dataType: "json",
        success: function (data) {
            let contenido = '';
            $.each(data["resultado"], function (llave, valor) {
                console.log(valor);
                contenido += `<div class="cardOfertas efectoCarta">`;
                    contenido += `<div class="front">`;
                        contenido += `<div class="img">`;
                            contenido += `<img src="http://127.0.0.1:5000/platillos/foto/${valor["imagen"]}" alt="">`;
                            contenido += `<div class="back">`;
                                contenido += `<p>${valor["descripcion"]}</p>`;
                            contenido += `</div>`;
                        contenido += `</div>`;
                        contenido += `<div class="info">`;
                            contenido += `<h3>${valor["nombreProducto"]}</h3>`;
                            contenido += `<p>Precio: S/${valor["precio"]}</p>`;
                            contenido += `<div class="botones">`;
                                contenido += `<button type="button" class="btn btn-success" onclick="platillosGet(${valor["idProducto"]})" data-toggle="modal" data-target="#crearOferta">`
                                    contenido += `<i class='bx bx-up-arrow-alt'></i>`;
                                contenido += `</button>`;
                                contenido += `<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#eliminarPlatillo" onclick="eliminarPlatilloModal(${valor["idProducto"]}, '${valor["nombreProducto"]}')">`
                                    contenido += `<i class='bx bx-trash'></i>`;
                                contenido += `</button>`;
                            contenido += `</div>`;
                        contenido += `</div>`;
                    contenido += `</div>`;
                contenido += `</div>`;
            });
            $('#ofertas-content').html(contenido);
        }
    });
}

function platillosUpdate(){
    const registrosPlatillo = new FormData();
    registrosPlatillo.append("txtNombrePlatillo", $('#nombrePlatillo>input').val());
    registrosPlatillo.append("txtPrecio", $('#precioPlatillo>input').val());
    registrosPlatillo.append("imagenPlatillo", $('#imagenPlatillo>input')[0].files[0]);
    registrosPlatillo.append("txtDescripcion", $('#descripPlatillo>textarea').val());
    registrosPlatillo.append("txtIdCategoria", $('#categoriaSelectRegisterPlatillo').val());
    $.ajax({
        type: "PUT",
        url: `${dominio2}/platillos/update/${$('#txtIdPlatillo').val()}`,
        data: registrosPlatillo,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            filtroCategoria(categoria);
            vaciarFormulario();
        }
    });
}

function platillosInsert(){
    const registrosPlatillo = new FormData();
    registrosPlatillo.append("txtNombrePlatillo", $('#nombrePlatillo>input').val());
    registrosPlatillo.append("txtPrecio", $('#precioPlatillo>input').val());
    registrosPlatillo.append("imagenPlatillo", $('#imagenPlatillo>input')[0].files[0]);
    registrosPlatillo.append("txtDescripcion", $('#descripPlatillo>textarea').val());
    registrosPlatillo.append("txtIdCategoria", $('#categoriaSelectRegisterPlatillo').val());
    $.ajax({
        type: "POST",
        url: `${dominio2}/platillos/create/`,
        data: registrosPlatillo,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            filtroCategoria(categoria);
            vaciarFormulario();
        }
    });
}

function platillosGet(id){
    vaciarFormulario();
    $.ajax({
        type: "GET",
        url: `${dominio2}/platillos/get/${id}`,
        dataType: "json",
        success: function (data) {
            $('#tituloUpdate').html('ACTUALIZAR PLATILLO');
            $('#txtAccion').val('UPDATE');
            $('#txtIdPlatillo').val(data["resultado"]["idProducto"])
            $('#nombrePlatillo>input').val(data["resultado"]["nombreProducto"]);
            $('#precioPlatillo>input').val(data["resultado"]["precio"]);
            $('#descripPlatillo>textArea').val(data["resultado"]["descripcion"]);
            $(`#categoriaSelectRegisterPlatillo`).val(data["resultado"]["idCategoria"]);
            $('#registrarPlatillo').html('Actualizar');
        }
    });
}

function modalClose(){
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click',(e)=>{
        vaciarFormulario();
    });
}

function eliminarPlatilloModal(id, nombreProducto){
    $('#preguntaEliminarPlatillo').html("¿Estas seguro de eliminar el producto "+nombreProducto+"?");
    const confirmarEliminacionPlatillo = document.getElementById('confirmarEliminacionPlatillo');
    confirmarEliminacionPlatillo.addEventListener('click',(e)=>{
        $.ajax({
            type: "PUT",
            url: dominio + "/platillos/delete/" + id + "/",
            dataType: "json",
            success: function (data) {
                filtroCategoria(categoria);
            }
        });
    });
}