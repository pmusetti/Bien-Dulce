/********
 * SIMULADOR DE COTIZACION
 * Formulario con campos de seleccion
 * Opciones:
 * -Bizcochuelo
 * -Relleno
 * -Cobertura
 * -Decoracion
 * -Porciones
 * 
 * El resutado es un precio estimado del costo que tendria un producto con las opiones elegidas por el usuario.
 * Se agrega nota de disclaimer
 */


/*************************
 * Simulador de cotizacion
 *************************/
let precios = [];

//Capturar entradas del cuadro de cotizacion
const botonCotizar = document.querySelector("#cotizarTorta");
const campoPrecio = document.querySelector("#precioCotizado");
const inputBizcochuelo = document.querySelector("#bizcochuelo");
const inputRelleno = document.querySelector("#relleno");
const inputCobertura = document.querySelector("#cobertura");
const inputDecoracion = document.querySelector("#decoracion");
const inputPorciones = document.querySelector("#porciones");
//Objeto para guardar los datos de la torta a cotizar
let tortaACotizar = {
    bizcochuelo: "",
    relleno: "",
    cobertura: "",
    decoracion: "",
    porciones: ""
}


botonCotizar.onclick = () => {

    //Guardar datos de la torta a cotizar
    tortaACotizar.bizcochuelo = inputBizcochuelo.value;
    tortaACotizar.relleno = inputRelleno.value;
    tortaACotizar.cobertura = inputCobertura.value;
    tortaACotizar.decoracion = inputDecoracion.value;
    tortaACotizar.porciones = inputPorciones.value;

    //Calcular precio de la torta a cotizar
    let precio = 0;
    precio += precios[0].bizcochuelo[`${tortaACotizar.bizcochuelo}`.toLowerCase()];
    precio += precios[1].relleno[`${inputRelleno.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios[2].cobertura[`${inputCobertura.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios[3].decoracion[`${inputDecoracion.value}`.toLowerCase().replaceAll(" ", "")];
    precio = precio * precios[4].porciones[inputPorciones.value];
    campoPrecio.value = "$" + precio;

    mostrarTortaCotizada();

}


//Renderizar un texto con el resultado final de la torta elegida por el cliente y una nota de disclaimer
const mostrarTortaCotizada = () => {
    const userOptions = document.querySelector("#userOption");
    const note = document.querySelector("#nota");

    userOptions.innerText = `La torta que elegiste es para ${tortaACotizar.porciones} personas, con bizcochuelo de ${tortaACotizar.bizcochuelo} rellena de ${tortaACotizar.relleno}, con cobertura de ${tortaACotizar.cobertura} y decorada con ${tortaACotizar.decoracion}.`;
    note.innerText = "Nota: La siguiente simulacion no debe ser tomada como presupuesto final, sino simplemente como precio orientativo. Por mas detalles contactanos por whatsapp o telefono y te asesoraremos."

}

function getPrices() {
    const URL = "../js/prices.json";
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            precios = data.prices;
        })
}
getPrices();
