import { formatCurrency } from "./utils/money.js";
import { orders } from '../data/orders.js';
import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";


async function loadPage () {
  await loadProductsFetch();

  let orderHTML = '';

  orders.forEach((order) => {
    const orderTimeString = 
      dayjs(order.orderTime).format('MMMM D');

    const priceTotal = 
      formatCurrency(order.totalCostCents);

    orderHTML += productDetails(order) ?
      `
      <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceTotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productDetails(order)}
          </div>
        </div>
      ` : ""
  });

  document.querySelector('.orders-grid')
    .innerHTML = orderHTML;
}

function productDetails (order) {
  let html = ''

  order.products.forEach( orderProducts => {
    const product = getProduct(orderProducts.productId);
    const estimated = dayjs(orderProducts.estimatedDeliveryTime).format('MMMM DD')
    const todayproduct = dayjs().format('DD-MM').split("-");
    const estimatedproduct = dayjs(orderProducts.estimatedDeliveryTime).format('DD-MM').split("-");
    html += Number(todayproduct[0]) <= Number(estimatedproduct[0]) && Number(todayproduct[1]) <= Number(estimatedproduct[1]) ?  
    `
      <div class="product-image-container">
        <img src=${product.image}>
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${estimated}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProducts.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&cartItemId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    ` : ""
  });
  

  return html;  
}

loadPage();
setInterval(() => {
  loadPage();
  console.log('tampil');
}, 1000);