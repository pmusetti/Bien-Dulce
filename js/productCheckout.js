const qtyInCart = document.querySelector(".itemsInCart");
const cartContainer = document.querySelector("#cartContainer");
let products = [];
retrive("reducedCart");
getProducts(cartContainer);
