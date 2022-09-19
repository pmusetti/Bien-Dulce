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
 */
//Decalracion de variables y constantes
let products = [];
let id = 0;
let prodsInCart = 0;

//Capturar nodos del DOM
const qtyInCart = document.querySelector(".itemsInCart");
const cartBtn = document.querySelector(".verCarrito");

//Notificacion producto agregado
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: '#41CAD9',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

// Declaracion de la clase Product con el metodo "createCard" para renderizar las cards
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
        //Agregar eventos
        document.querySelector(`#addToCartItem_${this.product.id}`).onclick = () => addToCart(this.product.id);
        document.querySelector(`#card--checkout--${this.product.id}`).onclick = () => checkout(this.product.id);
    }
}

// Llamada a funciones
getProducts(null);
writeQtyInCart(prodsInCart);
