import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderOrderPaymentHTML } from "./checkout/orderPayment.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js'
//import '../data/backend-practice.js';

loadProducts(() => {
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
});