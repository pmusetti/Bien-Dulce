const qtyInCart = document.querySelector(".itemsInCart");
const saveDataBtn = document.querySelector("#saveUserData");
saveDataBtn.onclick = () => getUserData();

const product = retrive("product");
populateCartCheckout(product, "confirmProductCheckout()");
