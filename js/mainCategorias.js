const dominio = "http://127.0.0.1:5000"

window.addEventListener('load',(e)=>{
    categoriasSelect();
    insertarCategoria();
    categoriaFiltro();
    categoriaPlatilloRegister();
    cerrarModalUpdCateg();
    actualizarCategoria();
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
                    contenidoHTML += `<li><a href="#" class="btn opcionesOfertas" onclick="filtroCategoria(${categoria["idCategoria"]})">${categoria["nombreCategoria"]}</a></li>`;
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
            $('#ofertas-content').empty();
            let contenido = "";
            response["resultado"].forEach(categoria => {
                contenido += `<tr>`;
                    contenido += `<td>${categoria["idCategoria"]}</td>`
                    contenido += `<td id="categoria${categoria["idCategoria"]}">${categoria["nombreCategoria"]}</td>`;
                    contenido += `<td class="grupoBotones">`;
                        contenido += `<div class="btn-group">`;
                            contenido += `<button class="btn btn-primary" onclick="obtenerCategoria(${categoria["idCategoria"]});" data-toggle="modal" data-target="#actualizarCategoria">`;
                                contenido += `<i class='bx bx-up-arrow-alt'></i>`;
                            contenido += `</button>`;
                            if(categoria["idCategoria"] !== 2){
                                contenido += `<button class="btn btn-danger" onclick="eliminarCategoria(${categoria["idCategoria"]});">`;
                                    contenido += `<i class='bx bx-trash'></i>`;
                                contenido += `</button>`;
                            }
                                
                        contenido += `</div>`;
                contenido += `</tr>`;
            });
            $('#tablaCategorias').html(contenido)
        }
    });
}

function cerrarModalUpdCateg(){
    const closeUpdCateg = document.getElementById('closeUpdCateg');
    closeUpdCateg.addEventListener('click',(e)=>{
        $('#actualizarCategoria').modal('hide');
    });
    
}

function actualizarCategoria(id){
    const btnActualizarCateg = document.getElementById('btnActualizarCateg');
    btnActualizarCateg.addEventListener('click',(e)=>{
        const registroCategoria = new FormData();
        registroCategoria.append("txtIdCateg", $('#txtIdCateg').val());
        registroCategoria.append("txtNombreCategoria", $('#txtCategUpd').val());
        $.ajax({
            type: "PUT",
            url: `${dominio2}/categorias/update/${registroCategoria.get('txtIdCateg')}/`,
            data: registroCategoria,
            dataType: 'json',
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (data) {
                $('#actualizarCategoria').modal('hide');
                categoriasSelect();
                categoriasSelect();
                categoriaFiltro();
                categoriaPlatilloRegister();
            }
        });
    });
    
}

function obtenerCategoria(idCategoria){
    $('#Categorias'). modal('hide');
    $.ajax({
        type: "GET",
        url: `${dominio}/categorias/get/${idCategoria}`,
        dataType: "json",
        success: function (response) {
            $('#txtIdCateg').val(response["resultado"]["idCategoria"]);
            $('#txtCategUpd').val(response["resultado"]["nombreCategoria"]);
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
