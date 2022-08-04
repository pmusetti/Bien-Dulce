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
        price: 199,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
    },
    {
        title: "Torta frutilla",
        description: "Trota relleno chocolate",
        price: 299,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
    },
    {
        title: "Torta de chocolate",
        description: "Trota relleno chocolate",
        price: 399,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
    },
    {
        title: "Torta de merengue",
        description: "Trota relleno chocolate",
        price: 499,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
    },
    {
        title: "Torta de vainilla",
        description: "Trota relleno chocolate",
        price: 599,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
    },
    {
        title: "Torta decorada",
        description: "Trota relleno chocolate",
        price: 699,
        urlPicture: "../assets/img/Tortas/clasicas/tortaFrutas.webp"
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
        let url= "./img/default.jpg"
        if(this.picture!==""){
            url = this.picture;
        }
        let cardContainer = document.querySelector(".cart");
        let card = document.createElement("div");
        card.className="card col-lg-4 col-md-6 col-sm-12 card p-2";
        card.innerHTML=`<img src="${url}" alt="default">
                            <div class="card-body">
                                <h2 class="title">${this.title}</h2>
                                <h4 class="description">${this.description}</h4>
                                <h4 class="regularPrice" >$ ${this.price}</h4>
                                <h4 class="discount">20%OFF</h4>
                                <h3 class="price" >$ ${this.discounPrice}</h3>
                                <button id="agregarAlCarrito${num}">Agregar al carrito</button>
                            </div>`

        cardContainer.append(card);
        console.log(cardContainer)
    }
}


let num = 0;
for(item of products){
    let torta = new Product(item.title, item.description, item.price, item.urlPicture);
    torta.createCard(num);
    num +=1;
}

let carrito=[];
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

function agregarAlCarrito(item){
    carrito.push(products[item])
    alert("Agregaste al carrito: "+products[item].title)
}

const verCarrito = document.querySelector("#verCarrito");
verCarrito.onclick = () => mostrarCarrito();
function mostrarCarrito(){
    let total = 0;
    for(item of carrito){
        total += item.price;
    }
    total = Math.trunc(total * 0.8)
    alert("El total de tu compra es: "+total)
}
