// Variables y elementos del DOM
let boxMinus = document.getElementById("boxminus"),
    boxCantidad = document.getElementById("boxcan"),
    boxPlus = document.getElementById("boxplus"),
    valorProducto = 260000,
    Cantidad = document.getElementById("numeroPRoductos"),
    subtotal = document.getElementById("subtotal");

// Formatear el valor del producto inicial
const auxValorproducto = new Intl.NumberFormat("de-DE").format(valorProducto);
document.getElementById("precioUnidad").textContent = auxValorproducto;

// Actualizar subtotal y cantidad
function actualizarSubtotal(cantidad) {
    Cantidad.textContent = cantidad;
    const multipli = valorProducto * cantidad;
    subtotal.textContent = new Intl.NumberFormat("de-DE").format(multipli);
}

// Incrementar la cantidad
boxPlus.addEventListener("click", () => {
    let cantidadActual = parseInt(boxCantidad.textContent);
    if (cantidadActual < 10) {
        cantidadActual++;
        boxCantidad.textContent = cantidadActual;
        actualizarSubtotal(cantidadActual);
    }
});

// Decrementar la cantidad
boxMinus.addEventListener("click", () => {
    let cantidadActual = parseInt(boxCantidad.textContent);
    if (cantidadActual > 0) {
        cantidadActual--;
        boxCantidad.textContent = cantidadActual;
        actualizarSubtotal(cantidadActual);
    }
});
