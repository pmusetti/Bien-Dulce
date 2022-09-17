/*
-----------------------------------------------
---------- OBTENER PRODUCTOS (FETCH) ----------
-----------------------------------------------
*/

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


/*
---------------------------------------------------
---------- OBTENER DATOS DE LOCALSTORAGE ----------
---------------------------------------------------
*/

function save(name, element) {
    localStorage.setItem(name, JSON.stringify(element));
}
function retrive(element) {
    if (localStorage.getItem(`${element}`)) getQtyInCart();
    return JSON.parse(localStorage.getItem(`${element}`));
}
function getUserData() {
    const name = document.getElementById("fname").value
    const email = document.getElementById("email").value
    const address = document.getElementById("adr").value
    const city = document.getElementById("city").value
    const state = document.getElementById("state").value
    const zip = document.getElementById("zip").value
    const cardName = document.getElementById("cname").value
    const cardNumber = document.getElementById("ccnum").value
    const expMonth = document.getElementById("expmonth").value
    const expYear = document.getElementById("expyear").value
    const cvv = document.getElementById("cvv").value

    const userData = {
        name: name,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        cardName: cardName,
        cardNumber: cardNumber,
        expMonth: expMonth,
        expYear: expYear,
        cvv: cvv
    }
    save("userData", userData)
}
function getQtyInCart() {
    const reducedCart = JSON.parse(localStorage.getItem("reducedCart"))
    let qty = 0;
    for (const item of reducedCart) {

        qty += item.count;
    }
    writeQtyInCart(qtyInCart, qty)
}

/*
--------------------------------
---------- RENDERIZAR ----------
--------------------------------
*/


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

function populateCartCheckout(lista, btnFunction) {
    const node = document.querySelector("#cartContainer");
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
                            <form action="#">
                                <input type="submit" id="${node}--checkoutBtn" onclick= ${btnFunction} class="checkoutBtn" value="Finalizar compra" />
                            </form>
                        </div>`



}

/*
----------------------------
---------- LOGICA ----------
----------------------------
*/

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
    populateCartCheckout(reducedCart)
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
    populateCartCheckout(reducedCart)
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
function checkout(id) {
    const products = retrive("products")
    const product = products.filter(item => item.id == id);
    product[0].count = 1;
    save("product", product)
    
}
function userDataIsOk(){
    const userData = retrive("userData")
    if(userData === null) return false;
    const arr = Object.values(userData)
    for (const item of arr){
        if (item === ""){
            return false;
            }
    }
    return true;
}
function confirmCartCheckout() {
    const dataIsOk = userDataIsOk()
    const cart  = retrive("reducedCart")
    let qty = 0;
    if (!dataIsOk) {
        msgUserData()
    } else {
        for(let item of cart){
            qty += item.count
        }
        if ( qty == 0){
            msgCartIsEmpty()
        }else{
            msgCartCheckout()
            const products = retrive("products")
            save("reducedCart", products)
            populateCartCheckout([])
            getQtyInCart()
        }
    }
}
function confirmProductCheckout() {
    const dataIsOk = userDataIsOk()
    const product  = retrive("product")
    if (!dataIsOk) {
        msgUserData()
    } else {
        if ( product.length === 0){
            msgErrorNoProduct()
        }else{
            msgProductCheckout()
            save("product", [])
            populateCartCheckout([])
        }
    }
}


/*
-----------------------------------------
---------- MENSAJES SWEETALERT ----------
-----------------------------------------
*/
function msgUserData() {
    Swal.fire({
        title: 'Error',
        text: 'Debes completar los todos los datos de usuario',
        icon: 'error',
        confirmButtonText: 'OK',
    })
}
function msgProductCheckout() {
    const userData = retrive("userData")
    Swal.fire({
        title: `${userData.name}, \n ¡Tu pedido está en camino!`,
        text: `Lo recibiras en menos de 24 horas en ${userData.address}`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
function msgCartCheckout() {
    const userData = retrive("userData")
    Swal.fire({
        title: `${userData.name},\n ¡Tu carrito está en camino!`,
        text: 'Lo recibiras en menos de 24 horas!',
        icon: 'success',
        confirmButtonText: 'OK',
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
function msgErrorNoProduct(){
    Swal.fire({
        title: "Elige un producto",
        text: '¿A cual de nuestras delicias vas a sucumbir?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
function msgCartIsEmpty(){
    Swal.fire({
        title: "¡Tu carrito está vacío!",
        text: '¿Vamos a llenarlo?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
