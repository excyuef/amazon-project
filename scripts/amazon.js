import { addToCart, updateCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
  renderProductsGrid(products);
});

function renderProductsGrid(data) {
  let productHTML = ``;

  if (data.length == 0) {
    productHTML += `<p>kosong</p>`
  } else {
    data.forEach((product) => {
      productHTML +=
        `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select 
              class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="
            add-to-cart-button 
            button-primary 
            js-add-to-cart"

            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
    });
  }

  document.querySelector('.js-product-grid')
    .innerHTML = productHTML;

  const addedMessageTimeouts = {};

  updateCartQuantity();

  // add interactive on add cart button
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        addToCart(productId);
        // check number in cart display
        updateCartQuantity();
        // visible the text green add

        const addedMessage = document.querySelector(
          `.js-added-to-cart-${productId}`
        );

        addedMessage.classList.add("added-to-cart-visible");

        const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove("added-to-cart-visible")
        }, 2000);

        addedMessageTimeouts[productId] = timeoutId;
      });
    });
}

const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
})

searchBtn.addEventListener('click', handleSearch);

function handleSearch() {
  const key = searchBar.value;
  const displayProducts = searchProducts(key);

  key
    ? renderProductsGrid(displayProducts)
    : renderProductsGrid(products);

  searchBar.value = ''
}

function searchProducts(key) {
  const display = [];

  products.forEach((productDetails) => {
    if (productDetails.keywords.includes(key)) {
      display.push(productDetails)
    }
  });

  return display;
}


