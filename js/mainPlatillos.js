const dominio2 = "http://127.0.0.1:5000";
let categoria = 2;

const validaciones = {
    txtNombrePlatillo: false,
    txtPrecio: false,
    txtDescripcion: false,
    imagenPlatillo: false
};

/**
 * *Codigo de validaciones
 */

function validacionesPredeterminadas(){
    validaciones.txtNombrePlatillo = false;
    validaciones.txtPrecio = false;
    validaciones.txtDescripcion = false;
    validaciones.imagenPlatillo = false;
}

function validandoCamposPlatillos(){
    const nombre = document.querySelector('#nombrePlatillo>input');
    const precio = document.querySelector('#nombrePlatillo>input');
    const imagen = document.querySelector('#nombrePlatillo>input');
    const descripcion = document.querySelector('#nombrePlatillo>input');

    nombre.addEventListener('focus',(e)=>{
        nombreValor = nombre.value;
        if(nombreValor.length > 100){
            document.querySelector('#nombrePlatillo>p').textContent = "Máximo 100 caracteres";
        }
    });

    nombre.addEventListener('blur',(e)=>{
        nombreValor = nombre.value;
        if(nombreValor.length > 100){
            document.querySelector('#nombrePlatillo>p').textContent = "Máximo 100 caracteres";
        }
    });
    
}

/**
 * *Fin de código validaciones
 */


window.addEventListener('load',(e)=>{
    platillosSelect(categoria);
    modalClose();
    validandoCamposPlatillos();
    const registrarPlatillo = document.getElementById('registrarPlatillo');
    registrarPlatillo.addEventListener('click',(e)=>{
        const txtAccion = document.getElementById('txtAccion');
        if (txtAccion.value === "INSERT"){
            platillosInsert();
        }else{
            platillosUpdate();
        }
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
}

function vaciarFormulario(){
    $('#txtAccion').val('INSERT');
    $('#txtIdPlatillo').val('');
    $('#nombrePlatillo').val('');
    $('#precioPlatillo').val('');
    $('#descripPlatillo').val('');
    $("#imagenPlatillo").val(null);
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
            $('#ofertas-content').empty();
            let contenido = '';
            $.each(data["resultado"], function (llave, valor) {
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
                            contenido += `<p>Precio: ${valor["precio"]}</p>`;
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
            platillosSelect(categoria);
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
            platillosSelect(categoria);
            vaciarFormulario();
        }
    });
}

function platillosGet(id){
    $.ajax({
        type: "GET",
        url: `${dominio2}/platillos/get/${id}`,
        dataType: "json",
        success: function (data) {
            $('#registrarPlatillo').html('Actualizar');
            $('#txtAccion').val('UPDATE');
            $('#txtIdPlatillo').val(data["resultado"]["idProducto"])
            $('#nombrePlatillo').val(data["resultado"]["nombreProducto"]);
            $('#precioPlatillo').val(data["resultado"]["precio"]);
            $('#descripPlatillo').val(data["resultado"]["descripcion"]);
            $(`#categoriaSelectRegisterPlatillo option[value="${data["resultado"]["idCategoria"]}"`).attr("selected", true);
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
                platillosSelect(categoria);
            }
        });
    });
}