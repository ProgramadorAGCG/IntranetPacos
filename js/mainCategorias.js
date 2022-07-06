const dominio = "http://127.0.0.1:5000"

window.addEventListener('load',(e)=>{
    categoriasSelect();
    insertarCategoria();
    categoriaFiltro();
    categoriaPlatilloRegister();
    //Icono cancelar
    //<i class='bx bx-block'></i>
});

function categoriaFiltro(){
    $.ajax({
        type: "GET",
        url: dominio + "/categorias/select/",
        dataType: "json",
        success: function (response) {
            const tamañoVentana = window.innerWidth;
            let contenidoHTML = ``;
            if(tamañoVentana <= 768){
                response["resultado"].forEach(categoria => {
                    if(categoria["idCategoria"] === 2){
                        contenidoHTML += `<option value="${categoria["idCategoria"]}" selected>${categoria["nombreCategoria"]}</option>`;
                    }else{
                        contenidoHTML += `<option value="${categoria["idCategoria"]}">${categoria["nombreCategoria"]}</option>`;
                    }
                });
                $('#categoriaFiltro').html(contenidoHTML)
            }else{
                response["resultado"].forEach(categoria => {
                    contenidoHTML += `<li><a href="#" class="btn opcionesOfertas">${categoria["nombreCategoria"]}</a></li>`;
                });
                $('#categoriaFiltro2').html(contenidoHTML)
            }
        }
    });
}

/**
 * *Rellena el combobox de categorias para el modal de registrar platillo
 */
function categoriaPlatilloRegister(){
    $.ajax({
        type: "GET",
        url: dominio + "/categorias/select/",
        dataType: "json",
        success: function (response) {
            let contenido = ``;
            response["resultado"].forEach(categoria => {
                contenido += `<option value="${categoria["idCategoria"]}">${categoria["nombreCategoria"]}</option>`;
            });
            $('#categoriaSelectRegisterPlatillo').html(contenido)
        }
    });
}

function categoriasSelect(){
    $.ajax({
        type: "GET",
        url: dominio + "/categorias/select/",
        dataType: "json",
        success: function (response) {
            let contenido = "";
            response["resultado"].forEach(categoria => {
                contenido += `<tr>`;
                    contenido += `<td>${categoria["idCategoria"]}</td>`
                    contenido += `<td id="categoria${categoria["idCategoria"]}">${categoria["nombreCategoria"]}</td>`;
                    contenido += `<td class="grupoBotones">`;
                        contenido += `<div class="btn-group">`;
                            contenido += `<button class="btn btn-primary" onclick="obtenerCategoria(${categoria["idCategoria"]});">`;
                                contenido += `<i class='bx bx-up-arrow-alt'></i>`;
                            contenido += `</button>`;
                            contenido += `<button class="btn btn-danger" onclick="eliminarCategoria(${categoria["idCategoria"]});">`;
                                contenido += `<i class='bx bx-trash'></i>`;
                            contenido += `</button>`;
                        contenido += `</div>`;
                contenido += `</tr>`;
            });
            $('#tablaCategorias').html(contenido)
        }
    });
}

function insertarCategoria(){
    const btnInsertCategoria = document.getElementById('btnInsertCategoria');
    btnInsertCategoria.addEventListener('click',(e)=>{
        const formulario = new FormData();
        formulario.append("txtNombreCategoria", $('#campoNombreCategoria').val());
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/categorias/create/",
            data: formulario,
            dataType: "json",
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                $('#campoNombreCategoria').val('');
                categoriasSelect();
            }
        });
    });
}
