const dominio = "http://127.0.0.1:5000"

window.addEventListener('load',(e)=>{
    categoriaFiltro();
    categoriasSelect();
    categoriaPlatilloRegister();
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
