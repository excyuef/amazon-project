function Cart (localStorageKey) {
  const cart = {
    cartItems : undefined,

    loadFromStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "id1",
            quantity: 2,
            deliveryOptionsId: '1'
          }, {
            productId: "id2",
            quantity: 1,
            deliveryOptionsId: '2'
          }
        ];
      }
    },

    saveToLocalStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
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
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionsId: '1'
        });
      }
      
      this.saveToLocalStorage();
    },

    //update cartquantity on navbar
    updateCartQuantity () {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector(".js-cart-quantity")
        .innerHTML = cartQuantity;
    },

    removeFromCart (productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
        newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      
      this.saveToLocalStorage();
    },

    updateQuantity (productId, newQuantity) {
      let matchingItem;
      
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;

      this.saveToLocalStorage();
    },

    updateDeliveryOption (productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionsId = deliveryOptionId;

      this.saveToLocalStorage();
    }
  }

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);  