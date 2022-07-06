const dominio2 = "http://127.0.0.1:5000";

window.addEventListener('load',(e)=>{
    platillosSelect();
    registrarPlatillo();
});


function platillosSelect() {
    $.ajax({
        type: "GET",
        url: `${dominio2}/platillos/select/`,
        dataType: "json",
        success: function (data) {
            let contenido = '';
            $.each(data["resultado"], function (llave, valor) {
                contenido += `<div class="cardOfertas efectoCarta">`;
                    contenido += `<div class="front">`;
                        contenido += `<div class="img">`;
                            contenido += `<img src="http://127.0.0.1:5000/platillos/foto/${valor["idProducto"]}/" alt="">`;
                            contenido += `<div class="back">`;
                                contenido += `<p>${valor["descripcion"]}</p>`;
                            contenido += `</div>`;
                        contenido += `</div>`;
                        contenido += `<div class="info">`;
                            contenido += `<h3>${valor["nombreProducto"]}</h3>`;
                            contenido += `<p>Precio: ${valor["precio"]}</p>`;
                            contenido += `<div class="botones">`;
                                contenido += `<button type="button" class="btn btn-success">`
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

function registrarPlatillo(){
    const registrarPlatillo = document.getElementById('registrarPlatillo');
    registrarPlatillo.addEventListener('click',(e)=>{
        const registrosPlatillo = new FormData();
        registrosPlatillo.append("txtNombrePlatillo", $('#nombrePlatillo').val());
        registrosPlatillo.append("txtPrecio", $('#precioPlatillo').val());
        registrosPlatillo.append("imagenPlatillo", $('#imagenPlatillo')[0].files[0]);
        registrosPlatillo.append("txtDescripcion", $('#descripPlatillo').val());
        registrosPlatillo.append("txtIdCategoria", $('#categoriaSelectRegisterPlatillo').val());
        console.log($('#categoriaSelectRegisterPlatillo').val());
        $.ajax({
            type: "POST",
            url: `${dominio2}/platillos/create/`,
            data: registrosPlatillo,
            dataType: 'json',
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (data) {
                console.log(data);
                platillosSelect();
                $('#nombrePlatillo').val('');
                $('#precioPlatillo').val('');
                $('#descripPlatillo').val('');
            }
        });
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
                platillosSelect();
            }
        });
    });
}