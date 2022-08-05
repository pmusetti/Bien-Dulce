/********
 * CARRITO DE COMPRAS
 * 
 * Se distinguen 2 productos distintos
 * -1 tortas
 * -2 postres
 * 
 * Propiedades de las tortas:
 * -Nombre
 * -Bizcochuelo
 * -Relleno
 * -Cobertura
 * -Decoracion
 * -Precio
 * 
 * Propiedades de los postres:
 * -Nombre
 * -Sabor
 * -Precio
 */

/********
 * SIMULADOR DE COTIZACION
 * Se debe asignar un valor a cada opcion y sumar al cotizar.
 * Opciones:
 * -Bizcochuelo
 * -Relleno
 * -Cobertura
 * -Decoracion
 * -Porciones
 * 
 */

let products = [
    {
        title: "Torta de superheroe",
        description: "Trota relleno chocolate",
        price: 1990,
        urlPicture: "../assets/img/Tortas/personalizadas/marvel.webp"
    },
    {
        title: "Torta frutilla",
        description: "Trota relleno chocolate",
        price: 2990,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutilla.webp"
    },
    {
        title: "Torta de chocolate",
        description: "Trota relleno chocolate",
        price: 3990,
        urlPicture: "../assets/img/Tortas/clasicas/tortaChocolate.webp"
    },
    {
        title: "Torta de merengue",
        description: "Trota relleno chocolate",
        price: 4990,
        urlPicture: "../assets/img/Tortas/clasicas/tortaMerengue.webp"
    },
    {
        title: "Torta de merengue",
        description: "Trota relleno chocolate",
        price: 5990,
        urlPicture: "../assets/img/Tortas/clasicas/tortaMerengueFrutilla.webp"
    },
    {
        title: "Torta clasica",
        description: "Trota relleno chocolate",
        price: 6990,
        urlPicture: "../assets/img/Tortas/clasicas/tortasClasicas.webp"
    }
]





class Product {
    constructor(title, description, price, picture) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.discounPrice = Math.trunc(price * 0.8);
    }
    createCard(num) {
        let url = "./img/default.jpg"
        if (this.picture !== "") {
            url = this.picture;
        }
        let cardContainer = document.querySelector(".cart");
        let card = document.createElement("div");
        card.className = "card col-lg-4 col-md-6 col-sm-12 card p-2";
        card.innerHTML = `<img src="${url}" alt="default">
                            <div class="card-body">
                                <h2 class="card--title">${this.title}</h2>
                                <h4 class="card--description">${this.description}</h4>
                                <h4 class="card--regularPrice" >$ ${this.price}</h4>
                                <h4 class="card--discount">20%OFF</h4>
                                <h3 class="card--price" >$ ${this.discounPrice}</h3>
                                <button id="agregarAlCarrito${num}" class="cartBtn">Agregar al carrito</button>
                            </div>`

        cardContainer.append(card);
        console.log(cardContainer)
    }
}


let num = 0;
for (item of products) {
    let torta = new Product(item.title, item.description, item.price, item.urlPicture);
    torta.createCard(num);
    num += 1;
}

let carrito = [];
const comprarTorta1 = document.querySelector("#agregarAlCarrito0");
const comprarTorta2 = document.querySelector("#agregarAlCarrito1");
const comprarTorta3 = document.querySelector("#agregarAlCarrito2");
const comprarTorta4 = document.querySelector("#agregarAlCarrito3");
const comprarTorta5 = document.querySelector("#agregarAlCarrito4");
const comprarTorta6 = document.querySelector("#agregarAlCarrito5");
comprarTorta1.onclick = () => agregarAlCarrito(0)
comprarTorta2.onclick = () => agregarAlCarrito(1)
comprarTorta3.onclick = () => agregarAlCarrito(2)
comprarTorta4.onclick = () => agregarAlCarrito(3)
comprarTorta5.onclick = () => agregarAlCarrito(4)
comprarTorta6.onclick = () => agregarAlCarrito(5)

function agregarAlCarrito(item) {
    carrito.push(products[item])
    alert("Agregaste al carrito: " + products[item].title)
    verCarrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
    fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path
        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
</svg> ${carrito.length}`
}

const verCarrito = document.querySelector("#verCarrito");
verCarrito.onclick = () => mostrarCarrito();
function mostrarCarrito() {
    let total = 0;
    let list = "";
    for (item of carrito) {
        total += item.price;
        list += item.title + "\n"
    }
    total = Math.trunc(total * 0.8)
    alert("En tu carrito tenes: \n\n"+ list + "\n Total a pagar $"+total)
}



/*************************
 * Simulador de cotizacion
 * ***********************
 */

const precios = {
    bizcochuelo: {
        vainilla: 500,
        chocolate: 600,
        marmolado: 550,
        manteca: 490
    },
    relleno: {
        dulcedeleche: 250,
        moussechocolate: 300,
        mousseavellanas: 600,
        frutas: 390

    },
    cobertura: {
        fondan: 1500,
        ganache: 1200,
        merengue: 600,
        chantilly: 750

    },
    decoracion: {
        figurasdeazucar: 350,
        papelcomestible: 250,
        masa: 500,
        figurasdechocolate: 550,
        frutas: 420

    },
    porciones: {
        "6": 0.5,
        "12": 1,
        "18": 1.5,
        "24": 2,
        "48": 4
    }
}

const botonCotizar = document.querySelector("#cotizarTorta");
const campoPrecio = document.querySelector("#precioCotizado");
const inputBizcochuelo = document.querySelector("#bizcochuelo");
const inputRelleno = document.querySelector("#relleno");
const inputCobertura = document.querySelector("#cobertura");
const inputDecoracion = document.querySelector("#decoracion");
const inputPorciones = document.querySelector("#porciones");


botonCotizar.onclick = () => {
    let precio = 0;
    precio += precios.bizcochuelo[`${inputBizcochuelo.value}`.toLowerCase()];
    precio += precios.relleno[`${inputRelleno.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios.cobertura[`${inputCobertura.value}`.toLowerCase().replaceAll(" ", "")];
    precio += precios.decoracion[`${inputDecoracion.value}`.toLowerCase().replaceAll(" ", "")];
    precio = precio * precios.porciones[inputPorciones.value];
    campoPrecio.value = "$"+precio;

}
