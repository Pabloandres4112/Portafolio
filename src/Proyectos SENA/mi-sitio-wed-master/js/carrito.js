let boxMinus = document.getElementById("boxminus"),
boxCantidad = document.getElementById("boxcan"),
boxPlus = document.getElementById("boxplus"),
valorProducto = 260000,
Cantidad = document.getElementById("numeroPRoductos"),
auxValorproducto = new Intl.NumberFormat("de-DE").format(valorProducto);
document.getElementById("precioUnidad").innerHTML= auxValorproducto;


boxPlus.addEventListener("click",function(){
    let axucant = boxCantidad.innerHTML;
    if(axucant < 10){
        axucant++;
        boxCantidad.innerHTML = axucant;
        Cantidad.innerHTML=axucant;
        multipli = valorProducto *axucant
        let auxsubtotal = new  Intl.NumberFormat("de-DE").format(multipli);
        subtotal.innerHTML = auxsubtotal;
    }

});
boxMinus.addEventListener("click",function(){
    let resta = boxCantidad.innerHTML;
    if (resta > 0){
        resta --;
        boxCantidad.innerHTML = resta;
    }
    Cantidad.innerHTML = resta
    resta = valorProducto *resta 
    let auxsubtotal = new  Intl.NumberFormat("de-DE").format(resta);
    subtotal.innerHTML = auxsubtotal;
});
