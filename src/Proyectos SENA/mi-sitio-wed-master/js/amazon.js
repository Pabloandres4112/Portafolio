document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    let btnClose = document.getElementById("btnClose");
    let mainContent = document.getElementById("mainContent");
    let imagenes = document.querySelectorAll('.box-modal-img img');
    let imgModal = document.getElementById('imgModal');
    let miniaturas = document.querySelectorAll(".box-imagen-muestra");
    let imagenGrande = document.getElementById("imgBig");
    // Función para cambiar la imagen principal en el contenedor imgModal
    function cambiarImagenPrincipal(imagen) {
        imgModal.querySelector('.main-img-modal').src = imagen.src;
    }

    // Evento de clic para cada imagen dentro de box-modal-img
    imagenes.forEach((imagen) => {
        imagen.addEventListener('click', () => {
            cambiarImagenPrincipal(imagen);
        });
    });

    // Evento de clic para el botón de cerrar
    btnClose.addEventListener('click', function () {
        mainContent.style.display = "none";
    });

    // Evento de clic para cada miniatura
    miniaturas.forEach((miniatura) => {
        miniatura.addEventListener("click", function () {
            let srcMiniatura = miniatura.querySelector("img").getAttribute("src");
            imagenGrande.setAttribute("src", srcMiniatura);
        });
    });
});

/////////////////////////////////////////////////////////////////
var img = document.getElementById("imgBig1");
var mostrar = document.getElementById('mainContent');

img.addEventListener('click', function () {
    // Mostrar el elemento 'mostrar'
    mostrar.style.display = 'block';

    // Ocultar el elemento 'ocultar'
    ocultar.style.display = 'none';
});




//////////////////////////////////////////////////////////////////////




//////////////////////estrellas///////////////////////////////////
var ratingGroup = document.getElementById('half-stars-example');
var ratingInputs = ratingGroup.querySelectorAll('input[type="radio"]');
var ratingLabels = ratingGroup.querySelectorAll('.rating__label');
var result = document.querySelector("#current-rating");

let selectedRating = 2.5;

ratingInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
        selectedRating = parseFloat(event.target.value);
        updateRatingDisplay();
    });
});

ratingLabels.forEach((label) => {
    label.addEventListener('mouseover', (event) => {
        var labelValue = parseFloat(event.target.getAttribute('for').split('-')[1]);
        updateRatingDisplay(labelValue);
    });

    label.addEventListener('mouseout', () => {
        updateRatingDisplay();
    });
});

function updateRatingDisplay(ratingValue = selectedRating) {
    var ratingDisplay = document.getElementById('rating-display');
    if (!ratingDisplay) {
        ratingDisplay = document.createElement('p');
        ratingDisplay.id = 'rating-display';
        ratingGroup.parentNode.appendChild(ratingDisplay);
    }

    // Texto descriptivo basado en la cantidad de estrellas
    var descriptor = " estrellas";
    if (ratingValue === 1) {
        descriptor = " estrella";
    }

    result.textContent = ratingValue + descriptor;
}

















