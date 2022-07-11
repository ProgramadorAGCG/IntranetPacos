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


function SoloLetras(a) { for (var b in key = a.keyCode || a.which, tecla = String.fromCharCode(key).toString(), letras = "ABCDEFGHIJKLMNN\xd1OPORSTUVWKYZAEI\xd3Uabcdefghijklmn\xf1opqrstuvwxyz\xe1\xe9i\xf3\xfa", tecla_especial = !1, especiales = [8, 13, 32]) if (key == especiales[b]) { tecla_especial = !0; break } if (-1 == letras.indexOf(tecla) & !tecla_especial) return !1 } function mostrarPassword() { var a = document.getElementById("txtpasswordEmpleado2"), b = document.getElementById("txtpasswordEmpleado"); "password" == a.type ? (a.type = "text", b.type = "text", $(".icon").removeClass("fa fa-eye-slash").addClass("fa fa-eye")) : (a.type = "password", b.type = "password", $(".icon").removeClass("fa fa-eye").addClass("fa fa-eye-slash")) } function SoloNumeros(a) { return !!((keynum = window.event ? a.keyCode : a.which) > 47 && keynum < 58) || 8 == keynum || 13 == keynum } $("#limpiarAgregar").click(function () { $('input[type="text"]').val("") })