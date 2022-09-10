

function retriveStoredCart() {
    if (localStorage.getItem("cart")) {
        getQtyInCart();
    } else {
        initializeCart();
    }
}
function initializeCart() {
    for (let i = 0; i < products.length; i++) { cart.push([]) }
}
function getQtyInCart() {
    cart = JSON.parse(localStorage.getItem("cart"))
    prodsInCart = parseInt(localStorage.getItem("prodsInCart"));
    writeQtyInCart(qtyInCart, prodsInCart)
}

function renderCards() {
    for (item of products) {
        const { title, description, price, urlPicture } = item;
        let product = new Product(title, description, price, urlPicture);
        product.createCard(id);
        id += 1;
    }
}

function writeQtyInCart(node, value) {
    node.innerText = value;
}

function getProducts(nodo, lista) {
    const URL = "../js/products.json";
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            products = data.products;
            retriveStoredCart();            
            (nodo != null ) ? populateCartCheckout(nodo, lista) : renderCards();
        })
}


function populateCartCheckout(node, lista) {
    console.log(lista)
    let index = 0;
    let total = 0;
    let picture = "";
    let title = "";
    let price = 0;
    node.innerHTML = ""
    for (item of lista) {
        let qty = item.length
        if (qty > 0) {
            prodsInCart += qty;
            picture = products[index].urlPicture;
            title = products[index].title;
            price = products[index].price * qty * 0.8;
            total += price;

            node.innerHTML += `<div class="modal--card--container">
            <div class="modal--card--img">
                <img src="${picture}" alt="torta">
            </div>

            <div class="modal--card--textContainer">
                <div class="modal--card--title">
                    <p>${title}</p>
                </div>
                <div class="modal--card--qty">
                    <input type="number" value="${qty}" min="1" max="100" step="1"/>
                </div>
                <div class="modal--card--price">
                    <p>$${price}</p>
                </div>

            </div>
        </div>`
        }
        index += 1;

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

function populateProductCheckout(nodo, id){

}

function addToCart(id) {
    cart[id].push(id);
    prodsInCart += 1;
    saveCart();
    writeQtyInCart(qtyInCart, prodsInCart);

    Toast.fire({
        icon: 'success',
        title: `Producto agregado\n${prodsInCart} productos en tu carrito`
    })
}
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("prodsInCart", prodsInCart);
}
function removeCart() {
    deleteCart();
    retriveStoredCart();
    msgEmptyCart();
    writeQtyInCart(prodsInCart);
}
function deleteCart() {
    localStorage.removeItem("cart");
    localStorage.removeItem("prodsInCart")
    cart = [];
    modal.setAttribute("display", "none")
    prodsInCart = 0;
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
        title: 'Carrito vacio!',
        text: 'Vamos a llenarlo!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(function () {
        modalDialog.classList.remove("show");
        modalDialog.style.display = "none";
        document.main.removeAttribute('aria-hidden');
    });
}
