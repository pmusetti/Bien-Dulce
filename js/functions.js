
function save(name, element) {
    localStorage.setItem(name, JSON.stringify(element));
}
function retrive(element) {
    if (localStorage.getItem(`${element}`)) getQtyInCart();
    return JSON.parse(localStorage.getItem(`${element}`));
}

function getQtyInCart() {
    const reducedCart = JSON.parse(localStorage.getItem("reducedCart"))
    let qty = 0;
    for (const item of reducedCart) {

        qty += item.count;
    }
    writeQtyInCart(qtyInCart, qty)
}

function renderCards(products) {
    for (const item of products) {
        const { id, title, description, price, urlPicture } = item;
        let product = new Product(id, title, description, price, urlPicture);
        product.createCard();
    }
}

function writeQtyInCart(node, value) {
    node.innerText = value;
}

function getProducts() {
    const URL = "../js/products.json";
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            for (const item of data.products) {
                products.push({
                    ...item,
                    count: 0
                })
            }
            save("products", products)
            const reducedCart = retrive("reducedCart")
            if (reducedCart === null) save("reducedCart", products)
            renderCards(products);
        })
}

/*function reduceCart(lista) {
    const reducedCart = [...lista.reduce((res, elem) => {
        let id = elem.id;
        if (!res.has(id)) res.set(id, { ...elem, count: 1 })
        else res.get(id).count++
        return res;
    }, new Map).values()]
    return reducedCart;
}*/

function populateCartCheckout(node, lista) {
    let total = 0;
    let picture = "";
    let title = "";
    let price = 0;
    node.innerHTML = "";

    for (const item of lista) {
        let qty = item.count
        if (qty > 0) {
            picture = item.urlPicture;
            title = item.title;
            price = item.price * qty * 0.8;
            total += price;

            node.innerHTML += `<div id="prodId_${item.id}" class="modal--card--container">
                                    <div class="modal--card--img">
                                        <img src="${picture}" alt="torta">
                                    </div>

                                    <div class="modal--card--textContainer">

                                        <div class="modal--card--title">
                                            <p>${title}</p>
                                            <a id="eliminarItem_${item.id}" href="#" onclick=eliminarItem(${item.id})>Eliminar</a>
                                        </div>

                                        <div class="modal--card--qty">
                                            <input id="modificarCantidad_${item.id}" onchange="((e) => {modificarCantidad(${item.id}, value)})()" type="number" value="${qty}" min="1" max="100" step="1"/>
                                        </div>

                                        <div class="modal--card--price">
                                            <p>$${price}</p>
                                        </div>

                                    </div>
                                </div>`

        }

    }


    node.innerHTML += `<hr>
                            <div class="modal--card--resumeContainer">
                                <div class="modal--card--resumeText">
                                    <p>Total: </p>
                                </div>
                                <div>
                                    <p>$${total}</p>
                                </div>
                            </div>
                        <hr>
                        <div style="text-align: right; margin-right: 5%;">
                            <form action="./confirm.html">
                                <input type="submit" id="${node}--checkoutBtn" class="checkoutBtn" value="Finalizar compra" />
                            </form>
                        </div>`


}

function eliminarItem(id) {
    let reducedCart = retrive("reducedCart")
    let qty = 0;
    for (const item of reducedCart) {
        if (item.id == id) item.count = 0
        qty += item.count;
    }
    if (qty == 0) { msgEmptyCart() }
    save("reducedCart", reducedCart)
    removeNode(`#prodId_${id}`, "#cartContainer")
    const container = document.querySelector("#cartContainer")
    populateCartCheckout(container, reducedCart)
    getQtyInCart();
}

function modificarCantidad(item, value) {
    let reducedCart = retrive("reducedCart");
    for (const elem of reducedCart) {
        if (elem.id == item) {
            elem.count = parseInt(value);
        }
    }
    save("reducedCart", reducedCart)
    const container = document.querySelector("#cartContainer")
    populateCartCheckout(container, reducedCart)
    getQtyInCart();

}

function removeNode(node, parent) {
    const nodo = document.querySelector(node)
    const padre = document.querySelector(parent)
    padre.removeChild(nodo)
}
function addToCart(id) {
    const reducedCart = retrive("reducedCart")
    let qty = 0;
    for (let item of reducedCart) {
        if (item.id == id) {
            item.count += 1;
        }
        qty += item.count
    }
    save("reducedCart", reducedCart);
    getQtyInCart();

    Toast.fire({
        icon: 'success',
        title: `Producto agregado! \n ${qty} productos en tu carrito`
    })
}

function removeCart() {
    deleteCart();
    retrive("cart");
    msgEmptyCart();
    writeQtyInCart(prodsInCart);
}
function deleteCart() {
    localStorage.removeItem("reducedCart");

}
function goToCart() {
    (prodsInCart == 0) ? msgEmptyCart() : populateCartCheckout();
}

function checkout(id) {

    (id == null) ?
        //Pedir datos de envio y avisar de compra finalizada
        //msgProductCheckout()
        console.log("Carrito chekout")
        :
        //Mostrar en la pagina checkout el porducto a comprar
        console.log("Producto chekout")
    //msgCartCheckout();

}
function msgProductCheckout() {
    Swal.fire({
        title: 'Pedido confirmado',
        text: 'Recibiras tu producto en menos de 24 horas!',
        icon: 'success',
        confirmButtonText: 'OK',
        closeOnClickOutside: false
    })
}
function msgCartCheckout() {
    Swal.fire({
        title: 'Pedido confirmado',
        text: 'Recibiras los productos de tu carrito en menos de 24 horas!',
        icon: 'success',
        confirmButtonText: 'OK',
        closeOnClickOutside: false
    })
}

function msgEmptyCart() {
    Swal.fire({
        title: "Tu carrito quedó vacio",
        text: 'Vamos a llenarlo?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
