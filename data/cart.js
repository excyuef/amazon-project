export let cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) {
    cart = [{
      productId: "id1",
      quantity: 2,
    }, {
      productId: "id2",
      quantity: 1,
    }
    ];
  }

export function saveToLocalStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
  
  saveToLocalStorage();
}

//update cartquantity on navbar
export function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity")
    .innerHTML = cartQuantity;
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
    newCart.push(cartItem);
    }
  });

  cart = newCart;
  
  saveToLocalStorage();
}

export function updateQuantity (productId, newQuantity) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToLocalStorage();
}