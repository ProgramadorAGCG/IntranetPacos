window.addEventListener('load', (e) => {
    menuResponsive();
    filtroTablaTrabajadores();
    filtroTablaTrabajadores2();
});

function menuResponsive() {
    const btnMenu = document.getElementById('btnMenu');
    const menu = document.getElementById('sidenav');
    btnMenu.addEventListener('click', (e) => {
        menu.classList.toggle("responsive");
    });
}

function filtroTablaTrabajadores() {
    $(document).ready(function () {
        $("#inputTrabajador").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#contenido2 tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}
// comentarle a abraham
// lo que quiero hacer es que si el cargo dice "administrador" que el "tachito" no aparezca 
// function filtroTablaTrabajadores2() {
//     $(document).ready(function () {
//         // $("#inputTrabajador").on("keyup", function () {
//         $("Administrador").on("keyup", function () {
//             var value = $(this).val().toLowerCase();
//             // $("#contenido3 tr").filter(function () {
//             $("#contenido3 tr").filter(function () {
//                 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//             });
//         });
//     });
// }