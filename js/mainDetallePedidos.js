function detalleSelect(idPedido){
    $.ajax({
        type: "GET",
        url: `${dominio}detallepedido/selectDetallePedido/${idPedido}/`,
        dataType: "json",
        success: function (data) {
            let contenido = ``;
            $.each(data["resultado"], function (llave, valor) {
                contenido += `<tr>`;
                    contenido += `<td>${valor["nombreProducto"]}</td>`;
                    contenido += `<td><img src="http://127.0.0.1:5000/platillos/foto/${valor["imagen"]}" style="width: 100px;"></td>`;
                    contenido += `</td>`
                    contenido += `<td>${valor["cantidad"]}</td>`;
                    contenido += `<td>${valor["costodetalle"]}</td>`;
                contenido += `</tr>`;
            });
            $('#tablaDetallePedido').html(contenido);
        }
    });
}