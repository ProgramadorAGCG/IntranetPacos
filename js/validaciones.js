// validar SOLO letras
$("input.ferValid").bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
// mostrar contraseña
function mostrarPassword() {
    var cambio = document.getElementById("txtpasswordEmpleado2");
    var cambio2 = document.getElementById("txtpasswordEmpleado");
    if (cambio.type == "password") {
        cambio.type = "text";
        cambio2.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        cambio2.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
// Solo números
$("input.ferValid2").bind('keypress', function (event) {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
// limpiar input de cargos
$('#limpiarAgregar').click(function () {
    $('input[type="text"]').val('');
});
// mostrar un tooltip
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
// faltaria validar estos datos con python