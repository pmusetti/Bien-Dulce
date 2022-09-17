const cartContainer = document.querySelector("#cartContainer");
const checkoutBtn = document.querySelector("#cartContainer--checkoutBtn");
const qtyInCart = document.querySelector(".itemsInCart");

const reducedCart = retrive("reducedCart");
populateCartCheckout(cartContainer, reducedCart);

