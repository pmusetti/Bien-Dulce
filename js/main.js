/********
 * CARRITO DE COMPRAS
 * 
 *  * 
 * Propiedades de las tortas:
 * -Nombre
 * -Bizcochuelo
 * -Relleno
 * -Cobertura
 * -Decoracion
 * -Precio
 * 
 * 
 */

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
 */

/*******************************************************
********               TODO                *************
********************************************************
- Agregar pagina de checkout
- Agregar la funcionalidad de agregar items desde el 
checkout
*/

//Decalracion de variables y constantes
let cart = [];
let products = [];
let id = 0;
let prodsInCart = 0;

//Capturar nodos del DOM
const qtyInCart = document.querySelector(".itemsInCart");
const cartBtn = document.querySelector(".verCarrito");


//TOAST
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: '#a5dc86',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
})

//Eventos
cartBtn.onclick = () => goToCart();

// Clases
class Product {

    constructor(id, title, description, price, picture) {

        this.product = {
            "id": id,
            "title": title,
            "description": description,
            "price": price,
            "picture": picture,
            "discountPrice": price * 0.8
        }
        //this.product.discountPrice = 0.8;

        // this.id = id;
        // this.title = title;
        // this.description = description;
        // this.price = price;
        // this.picture = picture;
        // this.discounPrice = Math.trunc(price * 0.8);
    }
    createCard() {
        let url = "./img/default.jpg"
        if (this.product.picture !== "") {
            url = this.product.picture;
        }
        let cardContainer = document.querySelector(".cart");
        let card = document.createElement("div");
        card.className = "col-lg-4 col-md-6 col-sm-12 justify-content-center mb-lg-5";
        card.innerHTML = `<div class= "card">
                            <img src="${url}" class="cardImg" alt="imagen de producto">
                            <div class="card-body">
                                <div class="cardTextBox">
                                    <span class="card--title ">${this.product.title}</span>
                                </div>
                                <div class="cardTextBox">
                                    <span class="card--description ">${this.product.description}</span>
                                </div>
                                <div class="">
                                    <span class="card--regularPrice " >$ ${this.product.price}</span>
                                </div>
                                <div class="">
                                    <span class="card--discount ">20%OFF</span>
                                </div>
                                <div class="">
                                    <span class="card--price " >$ ${this.product.discountPrice}</span>
                                </div>
                                <div class="">
                                <form action="./productCheckout.html">
                                    <input class="buyBtn" id="card--checkout--${this.product.id}" type="submit" value="Comprar" />
                                </form>
                                </div>
                                <div class="">
                                    <button id="addToCartItem_${this.product.id}" class="cartBtn">
                                        <i class="fa-solid fa-cart-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`

        cardContainer.append(card);
        document.querySelector(`#addToCartItem_${this.product.id}`).onclick = () => addToCart(this.product);
        document.querySelector(`#card--checkout--${this.product.id}`).onclick = () => checkout(this.product.id);
    }
}

getProducts(null, cart);
writeQtyInCart(prodsInCart);


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
            //console.log(precios)
        })
}
getPrices();
