import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { renderOrderPaymentHTML } from "./checkout/orderPayment.js";
import { loadProducts } from "../data/products.js";
import {loadCart} from '../data/cart.js'

Promise.all([
  new Promise((resolve) => {
    console.log('memulai promises');
    loadProducts(() => {
      resolve();
    });
  }),

  new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),

]).then(() => {
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
});


/*
Promises - not promise.all

new Promise((resolve) => {
  console.log('memulai promises');
  loadProducts(() => {
    resolve('menyelesaikan loadProducts');
  });

}).then((hasil) => {
  console.log(hasil);

  return new Promise ((resolve) => {
    loadCart(() => {
      resolve('menyelesaikan loadCart');
    });
  });

}).then((hasil2) => {
  console.log(hasil2);
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
});



Nested - Callbacks

loadProducts(() => {
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
});
*/