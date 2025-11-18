import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliverDate} from '../../data/deliveryOptions.js';
import { renderOrderPaymentHTML } from './orderPayment.js';


export function renderOrderSummaryHTML () {

  let cartSummaryHTML = ``;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliverDate(deliveryOption);

    cartSummaryHTML += `
      <div class="
        cart-item-container
        js-cart-item-container-${matchingProduct.id}">

        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                  ${cartItem.quantity}
                </span>
              </span>
              <span 
              class="update-quantity-link link-primary js-update-quantity-link"

              data-product-id="${matchingProduct.id}"
              >
                Update
              </span>
              <input 
              class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link"
              
              data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      
      const deliveryDate = 
        today.add(deliveryOption.deliveryDays, 'days');
      
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += 
        `
          <div 
          class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
          >
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    });
    return html;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`)

        container.remove();
        renderOrderSummaryHTML();
        renderOrderPaymentHTML();
      });
    });

  // saat 'update' dipencet
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        const container = document.querySelector
          (`.js-cart-item-container-${productId}`);

        container.classList.add('is-editing-quantity');
      });
    });

  // add event listener "enter"
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

      link.addEventListener('click', () => {
        handleUpdateQuantity(productId, quantityInput);
      });

      quantityInput.addEventListener('keydown', (event) =>  {
        if (event.key === 'Enter') {
          handleUpdateQuantity(productId, quantityInput);
        }
      });
    }); 

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummaryHTML();
        renderOrderPaymentHTML();
      });
    });
}

function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} Items`;
}

// validasi jumlah newQuantity
function handleUpdateQuantity (productId, quantityInput) {
  const newQuantity = Number(quantityInput.value);

  if (newQuantity <= 0 || newQuantity >= 1000) {
    alert('gabisa bro');
    return;
  }

  updateQuantity(productId, newQuantity);

  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabel.innerHTML = newQuantity;

  updateCartQuantity();

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');

  renderOrderPaymentHTML();
}