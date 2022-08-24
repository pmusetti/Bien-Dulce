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

//Asignacion condicional
let carrito = JSON.parse(localStorage.getItem("cart")) || [];
let pruebaCarrito = [];
let id = 0;
const qtyInCart = document.querySelector(".itemsInCart");
const cartBtn = document.querySelector(".verCarrito");
const emptyCartBtn = document.querySelector("#emptyCartBtn");
const modal = document.querySelector(".modal-body");
const modalCheckoutBtn = document.querySelector("#modal--checkout");
cartBtn.onclick = () => goToCart();
emptyCartBtn.onclick = () => emptyCart();

modalCheckoutBtn.onclick = () => checkout(null);
qtyInCart.innerText = carrito.length;

//SPREAD
const parametros = ["title", "description", "price", "picture"];
console.log("Parametros: ", ...parametros)
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
                                <form action="">
                                    <input class="buyBtn" id="card--checkout--${id}" type="submit" value="Comprar" />
                                </form>
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
        document.querySelector(`#card--checkout--${id}`).onclick = () => checkout(id);
    }
}

for (item of products) {
    
    //Desestructurando el objeto item (producto)
    const { title, description, price, urlPicture } = item;
    let product = new Product(title, description, price, urlPicture);
    product.createCard(id);
    pruebaCarrito.push([])
    id += 1;
}



function addToCart(id) {
    carrito.push(products[id])
    pruebaCarrito[id].push(id);
    //pruebaCarrito[id].push(products[id])
    console.log(pruebaCarrito)
    localStorage.setItem("cart", JSON.stringify(carrito));
    qtyInCart.innerText = carrito.length;



    Toast.fire({
        icon: 'success',
        title: `Producto agregado\n${carrito.length} productos en tu carrito`
    })
}

function emptyCart() {
    localStorage.removeItem("cart");
    carrito = [];
    msgEmptyCart();
    qtyInCart.innerText = carrito.length;
    Toast.fire({
        icon: 'success',
        title: `Carrito vacio!`
    })
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
            item.price = Math.trunc(item.price * 0.8);
            item.qty = 1;
            total += item.price;
            modal.innerHTML += `<div class="modal--card--container">
                                    <div class="modal--card--img">
                                        <img src="${item.urlPicture}" alt="torta">
                                    </div>

                                    <div class="modal--card--textContainer">
                                        <div class="modal--card--title">
                                            <p>${item.title}</p>
                                        </div>
                                        <div class="modal--card--qty">
                                            <input type="number" value="${item.qty}" min="1" max="100" step="1"/>
                                        </div>
                                        <div class="modal--card--price">
                                            <p>$${item.price}</p>
                                        </div>
                                        
                                    </div>
                                </div>`
        }
        modal.innerHTML += `<hr>
                            <div class="modal--card--resumeContainer">
                                <div class="modal--card--resumeText">
                                    <p>Total: </p>
                                </div>
                                <div>
                                    <p>$${total}</p>
                                </div>
                            </div>
                            `

    }

}


function checkout(id) {
    //Operador ternario
    (id == null) ?
        //recorrer el carrito y mostrar cada producto del carrito en una tabla en la pagina de checkout
        Swal.fire({
            title: 'Pedido confirmado',
            text: 'Recibiras los productos de tu carrito en menos de 24 horas!',
            icon: 'ok',
            confirmButtonText: 'Cool'
          })

        :
        //agregar solo el producto del id y mostrarlo en la pagina del checkout
        Swal.fire({
            title: 'Pedido confirmado',
            text: 'Recibiras tu producto en menos de 24 horas!',
            icon: 'ok',
            confirmButtonText: 'Cool'
          })


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

