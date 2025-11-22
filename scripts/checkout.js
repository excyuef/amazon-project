import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderOrderPaymentHTML } from "./checkout/orderPayment.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
});