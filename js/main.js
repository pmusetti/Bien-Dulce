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


let carrito = [];
let id = 0;
const qtyInCart = document.querySelector("#itemsInCart");
const cartBtn = document.querySelector("#verCarrito");
const emptyCartBtn = document.querySelector("#emptyCartBtn");
const modal = document.querySelector(".modal-body");
cartBtn.onclick = () => goToCart();
emptyCartBtn.onclick = () => emptyCart();

if (localStorage.getItem("cart")) {
    carrito = JSON.parse(localStorage.getItem("cart"));
    qtyInCart.innerText = carrito.length;
}


class Product {
    constructor(title, description, price, picture) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.discounPrice = Math.trunc(price * 0.8);
    }
    createCard(id) {
        let url = "./img/default.jpg"
        if (this.picture !== "") {
            url = this.picture;
        }
        let cardContainer = document.querySelector(".cart");
        let card = document.createElement("div");
        card.className = "col-lg-4 col-md-6 col-sm-12 justify-content-center mb-lg-5";
        card.innerHTML = `<div class= "card">
                            <img src="${url}" class="cardImg" alt="imagen de producto">
                            <div class="card-body">
                                <div class="cardTextBox">
                                    <span class="card--title ">${this.title}</span>
                                </div>
                                <div class="cardTextBox">
                                    <span class="card--description ">${this.description}</span>
                                </div>
                                <div class="">
                                    <span class="card--regularPrice " >$ ${this.price}</span>
                                </div>
                                <div class="">
                                    <span class="card--discount ">20%OFF</span>
                                </div>
                                <div class="">
                                    <span class="card--price " >$ ${this.discounPrice}</span>
                                </div>
                                <div class="">
                                    <button class="buyBtn"> Comprar </button>
                                </div>
                                <div class="">
                                    <button id="addToCartItem_${id}" class="cartBtn">
                                        <i class="fa-solid fa-cart-arrow-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`

        cardContainer.append(card);
        document.querySelector(`#addToCartItem_${id}`).onclick = () => addToCart(id);
    }
}

for (item of products) {
    let product = new Product(item.title, item.description, item.price, item.urlPicture);
    product.createCard(id);
    id += 1;
}



function addToCart(id) {
    carrito.push(products[id])
    localStorage.setItem("cart", JSON.stringify(carrito));
    qtyInCart.innerText = carrito.length;
}

function emptyCart() {
    localStorage.removeItem("cart");
    carrito = [];
    msgEmptyCart();
    qtyInCart.innerText = carrito.length;
}

function msgEmptyCart() {
    modal.innerText = "Tu carrito esta vacío! \nVamos a llenarlo?";
}

function goToCart() {
    if (carrito.length == 0) {
        msgEmptyCart();
    } else {
        let total = 0;
        modal.innerHTML = ""
        for (item of carrito) {
            total += item.price;
            modal.innerHTML += `<div>
                            <h6 style=" width: 50px" >${item.title}</h6>
                            <img src="${item.urlPicture}" style=" width: 50px">
                            </div>`
        }
        total = Math.trunc(total * 0.8)
    }

}



/*************************
 * Simulador de cotizacion
 *************************/

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
    precio += precios.bizcochuelo[`${tortaACotizar.bizcochuelo}`.toLowerCase()];
    precio += precios.relleno[`${inputRelleno.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios.cobertura[`${inputCobertura.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios.decoracion[`${inputDecoracion.value}`.toLowerCase().replaceAll(" ", "")];
    precio = precio * precios.porciones[inputPorciones.value];
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

