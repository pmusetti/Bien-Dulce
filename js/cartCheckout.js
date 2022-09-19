const checkoutBtn = document.querySelector("#cartContainer--checkoutBtn");
const qtyInCart = document.querySelectorAll(".itemsInCart");
const saveDataBtn = document.querySelector("#saveUserData");
saveDataBtn.onclick = () => getUserData();

const cart = retrive("cart");
populateCartCheckout(cart, "cart");

