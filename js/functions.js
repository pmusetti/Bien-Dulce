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
            //Guarda la lista de productos en localStorage
            save("products", products)
            //Renderiza las cards
            renderCards(products);
            //Obtiene el carrito que esta guardado en localStorage
            const reducedCart = retrive("cart")
            //Si el carrito no existe, lo crea con la estructura de productos
            if (reducedCart === null) save("cart", products)
        })
}


/*
------------------------------------------------------
---------- OPERAR CON DATOS DE LOCALSTORAGE ----------
------------------------------------------------------
*/
//Guarda los datos en local storage. Recibe por parametro nombre y estructura
function save(name, structure) {
    localStorage.setItem(name, JSON.stringify(structure));
}
//Devuelve los datos almacenados en localStorage. Recibe por parametro el nombre de la estructura a devolver
function retrive(name) {
    if (localStorage.getItem(`${name}`)) getQtyInCart();
    return JSON.parse(localStorage.getItem(`${name}`));
}
//Obtiene del DOM los datos personales y de facturacion ingresados por el usuario y los guarda en localStorage
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

    //Guarda los datos en el localStorage
    save("userData", userData)
}
//Obtiene la cantidad de productos en el carrito y modifica el DOM para mostrarlo
function getQtyInCart() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    let qty = 0;
    for (const item of cart) {

        qty += item.count;
    }
    //Escribe en el DOM la cantidad de productos en carrito
    writeQtyInCart(qtyInCart, qty)
}

/*
--------------------------------
---------- RENDERIZAR ----------
--------------------------------
*/

//Dibuja las cards en DOM. Recibe como parametro el array de productos
//Desestructura cada objeto del array y genera un nuevo producto de la clase Product
//Luego utiliza el metodo createCards() definido en el producto
function renderCards(products) {
    for (const item of products) {
        const { id, title, description, price, urlPicture } = item;
        let product = new Product(id, title, description, price, urlPicture);
        product.createCard();
    }
}
//Escribe en el DOM. Recibe como parametro el nodo y el valor
function writeQtyInCart(node, value) {
    node.innerText = value;
}
//Dibuja la lista de objetos en carrito. Recibe por parametro el array de objetos y el objetivo. Es decir, si esta 
//llenando la lista con los objetos del carrito o con un producto individual
//que debe asignarse al boton de comprar
function populateCartCheckout(lista, target) {
    //Selecciona el nodo del DOM que contendrá la lista de compras
    const node = document.querySelector("#cartContainer");
    let total = 0;
    let picture = "";
    let title = "";
    let price = 0;
    node.innerHTML = "";
    let inputFunction = "";
    let checkoutBtnFunction =  "";
    let eliminateItemFunction = "";

    if(target==="cart"){
        inputFunction = "changeQuantityCart";
        checkoutBtnFunction = "confirmCartCheckout()";
        eliminateItemFunction = "eliminateCartItem";


    }else if(target === "product"){
        inputFunction = "changeQuantityProduct";
        checkoutBtnFunction = "confirmProductCheckout()";
        eliminateItemFunction = "eliminateProductItem"
    }

    //Recorre la lista de productos para obtener propiedades y renderiza una linea (dentro de un div) con las propiedades
    for (const item of lista) {
        let qty = item.count
        if (qty > 0) {
            picture = item.urlPicture;
            title = item.title;
            price = item.price * qty * 0.8;
            total += price;
            //Dibuja en el nodo la card correspondiente con las propiedades dinamicas
            //Agrega id dinamica al div para reconocerlo si hay que borrarlo o agregar productos 
            node.innerHTML += `<div id="prodId_${item.id}" class="modal--card--container">
                                    <div class="modal--card--img">
                                        <img src="${picture}" alt="torta">
                                    </div>

                                    <div class="modal--card--textContainer">

                                        <div class="modal--card--title">
                                            <p>${title}</p>
                                            <a id="eliminarItem_${item.id}" href="#" onclick=${eliminateItemFunction}(${item.id})>Eliminar</a>
                                        </div>

                                        <div class="modal--card--qty">
                                            <input id="modificarCantidad_${item.id}" onchange="((e) => {${inputFunction}(${item.id}, value)})()" type="number" value="${qty}" min="1" max="100" step="1"/>
                                        </div>

                                        <div class="modal--card--price">
                                            <p>$${price}</p>
                                        </div>

                                    </div>
                                </div>`

        }

    }

    //Luego de dibujar tooos los productos del carrito, agrega el total y el boton de comprar
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

                        <div class="modal--card--resumeContainer">
                            <div style="text-align: left; width: 70%; font-weight: 300">
                                <a id="eliminateCart" href="#" onclick=removeCart() >Eliminar carrito</a>
                            </div>

                            <form action="#">
                                <input type="submit" id="${node}--checkoutBtn" onclick= ${checkoutBtnFunction} class="checkoutBtn" value="Finalizar compra" />
                            </form>  
                            
                        </div>`
}

/*
----------------------------
---------- LOGICA ----------
----------------------------
*/
//Eliminar producto del carrito
//Recibe por parametro la id del producto a eliminar
function eliminateCartItem(id) {
    let cart = retrive("cart")
    let qty = 0;
    //Recorre el array del carrito y pone a 0 la cantidad del producto 
    //que coincide con la id a eliminar
    for (const item of cart) {
        if (item.id == id) item.count = 0
        //Suma los items del array pues luego de eliminado un item, el total en el carrito cambia
        qty += item.count;
    }
    //Si el carrito esta vacio, muestra un mensaje
    if (qty == 0) { msgEmptyCart() }
    save("cart", cart)
    //Elimina del DOM el nodo que mostraba el producto eliminado
    removeNode(`#prodId_${id}`, "#cartContainer")
    //Vuelve a dibujar los productos en el carrito, pues fueron actualizados
    populateCartCheckout(cart, "cart")
    //Obtiene los productos en carrito y modifica el DOM para mostrarlo
    getQtyInCart();
}
function eliminateProductItem(id){
    save("product", []);
    //Elimina del DOM el nodo que mostraba el producto eliminado
    removeNode(`#prodId_${id}`, "#cartContainer")
    //Vuelve a dibujar los productos en el carrito, pues fueron actualizados
    populateCartCheckout([], "product")

}
//Modifica la cantidad de productos en carrito si el usuario cambia el valor en el input 
//de algun producto del carrito.
//Recibe por parametro el id del producto y el nuevo valor
function changeQuantityCart(id, newValue) {
    let cart = retrive("cart");
    //Recorre el carrito
    for (const elem of cart) {
        if (elem.id == id) {
            elem.count = parseInt(newValue);
        }
    }
    save("cart", cart)
    populateCartCheckout(cart,"cart")
    getQtyInCart();

}
//Modifica la cantidad del producto elegido. No modifica el carrito, solo el producto que se esta por comprar
//Recibe por parametro el id del producto y el nuevo valor
function changeQuantityProduct(id, newVaue) {
    let product = retrive("product")
    product[0].count = newVaue;
    save("product", product)
    populateCartCheckout(product, "product")
}
//Remueve un nodo del DOM. Recibe por parametro el nodo y su padre
function removeNode(node, parent) {
    const nodo = document.querySelector(node)
    const padre = document.querySelector(parent)
    padre.removeChild(nodo)
}
//Agrega un producto al carrito. Recibe por parametro la id del producto a agregar
function addToCart(id) {
    const cart = retrive("cart")
    let qty = 0;
    //Recorre el array y le suma 1 a la propiedad count del producto que coincide con el id dado
    for (let item of cart) {
        if (item.id == id) {
            item.count += 1;
        }
        qty += item.count
    }
    save("cart", cart);
    getQtyInCart();
    //Notifica al usuario que se agrego un producto y muestra la cantidad de productos en carrito
    Toast.fire({
        icon: 'success',
        title: `Producto agregado! \n ${qty} productos en tu carrito`
    })
}

//Vacia el carrito y notifica al usuario
function removeCart() {
    let products = retrive("products")
    save("cart", products)
    save("product", [])
    populateCartCheckout(products, "cart");
    msgEmptyCart();
}
//Remueve un item del localStorage. Recibe por parametro el item a remover
function deleteItem(item) {
    localStorage.removeItem(item);
}
//Guarda en localStorage el producto elegido por el usuario para comprar directamente (Sin pasar por el carrito)
//Al darle comprar a un producto en particular se gurada en localStorage
function checkout(id) {
    //Obtiene la lista de productos del localStorage
    const products = retrive("products")
    //Filtra el producto por la id
    const product = products.filter(item => item.id == id);
    //Modifica la cunenta del producto
    product[0].count = 1;
    //Guarda el producto en localStorage
    save("product", product)
}
//Valida los datos ingresados por el usuario (Esto deberia hacerse en el backend)
function userDataIsOk(){
    //Obtiene del localStorage los datos ingresado por el usuario
    const userData = retrive("userData")
    //Si no existen datos, retorna false
    if(userData === null) return false;
    //Array con los valores del objeto userData
    const arr = Object.values(userData)
    //Recorre el array y si alguno esta vacio retorna falso (No se permiten datos vacios)
    for (const item of arr){
        if (item === ""){
            return false;
            }
    }
    //Si no retorno en ninguna de las dos ocaciones anteriores, quiere decir que todos los datos fueron ingresador y devuelve true
    return true;
    //No se chequea que los datos sean validos, ejemplo que el mail sea realmente un mail o donde se esperan numeros que realmente sean numeros
}
//Proceso de checkout del carrito(Idealmente deberian chequearse datos de usuario y facturacion en backend)
function confirmCartCheckout() {
    const dataIsOk = userDataIsOk()
    const cart  = retrive("cart")
    let qty = 0;
    //Si los datos ingresados no estan OK, le notifica al usuario
    if (!dataIsOk) {
        msgErrorUserData()
    } else {
        for(let item of cart){
            qty += item.count
        }
        //Si el carrito esta vacio le notifica al usuario
        if ( qty == 0){
            msgCartIsEmpty()
        }else{
            //Si el carrito no esta vacio, notifica al usuario que fue enviado su pedido
            msgCartCheckout()
            //Guarda la lista de productos como el nuevo carrito (las cantidades son 0)
            const products = retrive("products")
            save("cart", products)
            //Dibuja el carrito, esta vez con 0 produtos
            populateCartCheckout([],"cart")
            //Actualiza la cantidad de productos en carrito (en este caso 0)
            getQtyInCart()
        }
    }
}

//Proceso de checkout de un producto unitario (Idealmente deberian chequearse datos de usuario y facturacion en backend)
function confirmProductCheckout() {
    //Verifica qeu todos los datos hayan sido ingresados
    const dataIsOk = userDataIsOk()
    //Obtiene el producto de localStorage
    const product  = retrive("product")
    //Si falta algun dato, notifica al usuario
    if (!dataIsOk) {
        msgErrorUserData()
    } else {
        //Si el producto esta vacio notifica al usuario
        if ( product.length === 0){
            msgErrorNoProduct()
        }else{
            //Si todo esta bien, notifica el envio al usuario y vacia el producto y renderiza nuevamente el DOM
            msgProductCheckout()
            save("product", [])
            populateCartCheckout([],"product")
        }
    }
}

/*
-----------------------------------------
---------- MENSAJES SWEETALERT ----------
-----------------------------------------
*/
//Mensaje de error de datos de usuario
function msgErrorUserData() {
    Swal.fire({
        title: 'Error',
        text: 'Debes completar los todos los datos de usuario',
        icon: 'error',
        confirmButtonText: 'OK',
    })
}
//Mensaje de producto enviado
function msgProductCheckout() {
    const userData = retrive("userData")
    const product =  retrive("product")
    if(product.length == 0) msgErrorNoProduct();
    Swal.fire({
        title: `${userData.name}, \n ¡Tu ${product[0].title} está en camino!`,
        text: `Lo recibiras en menos de 24 horas en ${userData.address}`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
//Mensaje de carrito enviado
function msgCartCheckout() {
    const userData = retrive("userData")
    Swal.fire({
        title: `${userData.name},\n ¡Tu carrito está en camino!`,
        text: `Lo recibiras en menos de 24 horas en ${userData.address}`,
        icon: 'success',
        confirmButtonText: 'OK',
    })
}
//Mensaje de carrito vacio
function msgEmptyCart() {
    Swal.fire({
        title: "Tu carrito quedó vacio",
        text: 'Vamos a llenarlo?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
//Mensaje Ningun Producto seleccionado
function msgErrorNoProduct(){
    Swal.fire({
        title: "Elige un producto",
        text: '¿A cual de nuestras delicias vas a sucumbir?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
//Mensaje de carrito vacio
function msgCartIsEmpty(){
    Swal.fire({
        title: "¡Tu carrito está vacío!",
        text: '¿Vamos a llenarlo?',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}
