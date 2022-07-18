window.addEventListener('load', (e) => {
    if(window.location.pathname === "/index.html" || window.location.pathname === "/"){
        efectoLogin();
    }else{
        menuResponsive();
        filtroTablaTrabajadores();
        mostrarNombreFile();
        modalEvitar();
    }
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

function efectoLogin() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
        input.addEventListener("focus", (e) => {
            let parent = input.parentNode.parentNode;
            parent.classList.add("focus");
        });
        input.addEventListener("blur", (e) => {
            let parent = input.parentNode.parentNode;
            if (input.value == "") {
                parent.classList.remove("focus");
            }
        });
    });
}

function mostrarNombreFile(){
    $("#imagenPlatillo>input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
}

function modalEvitar(){
    /* $('.modal').modal({ backdrop: 'static', keyboard: false }); */
};