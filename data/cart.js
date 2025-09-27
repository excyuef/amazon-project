export let cart = [{
    productId: "id1",
    quantity: 0,
  },{
    productId: "id2",
    quantity: 0,
  },{
    productId: "id3",
    quantity: 2
  }
];

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
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
    newCart.push(cartItem);
    }
  });

  cart = newCart;
  console.log(cart);
}