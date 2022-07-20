const dominio2 = "http://127.0.0.1:5000";

let carrito = [];

window.addEventListener('load',(e)=>{
    platillosSelect(2);
    categoriaFiltro();
    const btnCarrito = document.getElementById('btnCarrito');
    btnCarrito.addEventListener('click',(e)=>{
        carritoSelect();
    });
    const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
    btnAgregarCarrito.addEventListener('click',(e)=>{
        const valor = [$('#txtIdProductoCarrito').val(), $('#txtCantidadCarrito').val()];
        let comprobar = true;
        carrito.forEach(element => {
            if(element[0] === $('#txtIdProductoCarrito').val()){
                let indice = carrito.indexOf(element);
                carrito[indice] = valor;
                comprobar = false;
            }
        });
        
        if(comprobar) carrito.push(valor);
        
        $('#txtIdProductoCarrito').val("");
        $('#txtCantidadCarrito').val("");
    });
    realizarPedido();
});

function platillosSelect(idCategoria) {
    $.ajax({
        type: "GET",
        url: `${dominio2}/platillos/selectCateg/${idCategoria}`,
        dataType: "json",
        success: function (data) {
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
                            contenido += `<p>Precio: S/${valor["precio"]}</p>`;
                            contenido += `<input type="hidden" id="txtIdPlatillo" value="${valor["idProducto"]}">`
                            contenido += `<button class="btn btn-success"  data-toggle="modal" data-target="#modalConfirmarCantidad" onclick="configurarModalCantidad(${valor["idProducto"]})"><i class='bx bx-cart-add'></i>Agregar</button>`
                        contenido += `</div>`;
                    contenido += `</div>`;
                contenido += `</div>`;
            });
            $('#contentCarta').html(contenido);
        }
    });
}

function categoriaFiltro(){
    $.ajax({
        type: "GET",
        url: dominio2 + "/categorias/select/",
        dataType: "json",
        success: function (response) {
            let contenidoHTML = ``;
            response["resultado"].forEach(categoria => {
                contenidoHTML += `<li><a href="#" class="btn opcionesOfertas" onclick="filtroCategoria(${categoria["idCategoria"]})">${categoria["nombreCategoria"]}</a></li>`;
            });
            $('#categoriaFiltro2').html(contenidoHTML);
        }
    });
}

function filtroCategoria(id){
    platillosSelect(id);
    categoria = id;
    $('#categoriaSelectRegisterPlatillo').val(id)
}

function configurarModalCantidad(idProducto){
    $('#txtIdProductoCarrito').val(idProducto);
}

function eliminarDetalleCarrito(idProducto){
    carrito.forEach(element => {
        let indice;
        if(Number(element[0]) === idProducto){
            indice = carrito.indexOf(element);
            carrito.splice(indice, 1);
            console.log(indice);
            console.log(carrito);
        }
    });
    carritoSelect();
}

function carritoSelect(){
    if(carrito.length !== 0){
        const datos = new FormData();
        datos.append("carrito", carrito)
        $.ajax({
            type: "POST",
            url: `${dominio2}/detallepedido/carritoDetalle/`,
            data: datos,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                let contenidoHtml = ``;
                $.each(data["resultado"], function (llave, valor) {
                    contenidoHtml += `<tr>`;
                        contenidoHtml += `<td>${valor[1]}</td>`;
                        contenidoHtml += `<td><img src="http://127.0.0.1:5000/platillos/foto/${valor[2]}" style="width: 100px;"></td>`;
                        contenidoHtml += `<td>${valor[3]}</td>`;
                        contenidoHtml += `<td>${valor[4]}</td>`;
                        contenidoHtml += `<td>${valor[5]}</td>`;
                        contenidoHtml += `<td><button class="btn btn-danger" onclick="eliminarDetalleCarrito(${valor[0]})"><i class='bx bx-trash'></i></button></td>`;
                    contenidoHtml += `</tr>`;
                });
                $('#contenidoCarrito').html(contenidoHtml);
            }
        });
    }else{
        $('#contenidoCarrito').html("");
    }
}

function realizarPedido(){
    const btnRealizarPedido = document.getElementById('btnRealizarPedido');
    btnRealizarPedido.addEventListener('click',(e)=>{
        const datos = new FormData();
        datos.append("carrito", carrito);
        datos.append("txtNombreCliente", $("#txtNombreCliente").val());
        datos.append("txtIdEmpleado", sessionStorage.getItem("idEmpleado"));
        $.ajax({
            type: "POST",
            url: `${dominio2}/detallepedido/insert/`,
            data: datos,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                carritoSelect();
                window.location.href = "pedidos.html";
            }
        });
    });
    
}
