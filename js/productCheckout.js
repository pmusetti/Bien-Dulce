const qtyInCart = document.querySelector(".itemsInCart");
const cartContainer = document.querySelector("#cartContainer");
let products = [];
retriveStoredCart();
getProducts(cartContainer, products.id);
