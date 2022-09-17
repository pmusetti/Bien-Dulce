const checkoutBtn = document.querySelector("#cartContainer--checkoutBtn");
const qtyInCart = document.querySelector(".itemsInCart");
const saveDataBtn = document.querySelector("#saveUserData");
saveDataBtn.onclick = () => getUserData();

const reducedCart = retrive("reducedCart");
populateCartCheckout(reducedCart, "confirmCartCheckout()");

