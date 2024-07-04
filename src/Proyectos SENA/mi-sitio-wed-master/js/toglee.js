/* 1. Asocimos el id del toglee-box */
let contenedorPrincipal = document.getElementById("contenedorPrincipal");
let contenedorScundario = document.getElementById("contenedorScundario");

/* 2. Verificamos que clase se encuentra en chice-box */
contenedorPrincipal.addEventListener("click", function() {
    if (contenedorScundario.classList.contains("contenedor2-off")) {
        contenedorScundario.classList.add("contenedor2-on")
        contenedorScundario.classList.remove("contenedor2-off")
        contenedorPrincipal.classList.add("contenedor1-on")
        contenedorPrincipal.classList.remove("contenedor1-off")
    }
    else {
        contenedorScundario.classList.remove("contenedor2-on")
        contenedorScundario.classList.add("contenedor2-off")
        contenedorPrincipal.classList.remove("contenedor1-on")
        contenedorPrincipal.classList.add("contenedor1-off")
    }
});