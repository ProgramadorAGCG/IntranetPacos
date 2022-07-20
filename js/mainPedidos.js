const dominio = "http://127.0.0.1:5000/";

window.addEventListener('load',(e)=>{
    pedidosSelect();
});


function pedidosSelect(){
    const id = sessionStorage.getItem("idEmpleado");
    $.ajax({
        type: "GET",
        url: `${dominio}pedido/selectEmp/${id}/`,
        dataType: "json",
        success: function (data) {
            let contenido = ``;
            $.each(data["resultado"], function (llave, valor) {
                contenido += `<tr>`;
                    contenido += `<td>${valor["idPedido"]}</td>`;
                    contenido += `<td>${valor["nombreCliente"]}</td>`;
                    contenido += `<td>${valor["costoTotal"]}</td>`;
                    contenido += `<td class="grupoBotones">`;
                        contenido += `<div class="btn-group">`;
                            contenido += `<button class="btn btn-warning" data-toggle="modal" data-target="#detallePedido" onclick="detalleSelect(${valor["idPedido"]})">`;
                                contenido += `<a href="#">Detalle</a>`;
                            contenido += `</button>`;
                                if(valor["estado"]==="0"){
                                    contenido += `<button class="btn btn-primary" onclick="pagarPedido(${valor["idPedido"]})">`;
                                        contenido += `<a href="#">En proceso</a>`;
                                    contenido += `</button>`;
                                    contenido += `<button class="btn btn-danger" onclick="cancelarPedido(${valor["idPedido"]})">`;
                                        contenido += `<a href="#">Cancelar</a>`;
                                    contenido += `</button>`;
                                }else{
                                    contenido += `<button class="btn btn-success">`;
                                        contenido += `<a href="#">Pagado</a>`;
                                    contenido += `</button>`;
                                }
                        contenido += `</div>`;
                    contenido += `</td>`;
                contenido += `</tr>`;
            });
            $('#contenidoPedidos').html(contenido);
        }
    });
}

function pagarPedido(idPedido){
    $.ajax({
        type: "PUT",
        url: dominio + "pedido/update/" + idPedido + "/",
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            pedidosSelect();
        }
    });
}

function cancelarPedido(idPedido){
    $.ajax({
        type: "DELETE",
        url: `${dominio}pedido/delete/${idPedido}/`,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            pedidosSelect();
        }
    });
}