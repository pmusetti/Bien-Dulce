const cartContainer = document.querySelector("#cartContainer");
const qtyInCart = document.querySelector(".itemsInCart");
const checkoutBtn = document.querySelector("#cartContainer--checkoutBtn");
let products = [];

retriveStoredCart();
getProducts(cartContainer);
checkoutBtn.onclick = () => {
    
}
