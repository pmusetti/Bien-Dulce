const cartContainer = document.querySelector("#cartContainer");

const checkoutBtn = document.querySelector("#cartContainer--checkoutBtn");

const qtyInCart = document.querySelector(".itemsInCart");

let products = [];
retriveStoredCart();
getProducts(cartContainer, cart);

checkoutBtn.cartContainer.removeChild(checkoutBtn);
