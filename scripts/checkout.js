import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderOrderPayment } from "./checkout/orderPayment.js";
import { loadProductsFetch } from "../data/products.js";
import {loadCart} from '../data/cart.js'


async function loadPage () {
  try {

    await loadProductsFetch();

    await new Promise ((resolve, reject) => {
      // throw 'error10';
      loadCart(() => {
        resolve();
        // reject();
      });
    });
  } catch (error) {
    console.log('error, coba lagi nanti ya njing');
  }

  renderOrderPayment();
  renderOrderSummary();
}

loadPage();


/*
loadProductsFetch().then(() => {
  new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummaryHTML();
  renderOrderPaymentHTML();
})

Promise.all([

  loadProductsFetch(),
  
  new Promise ((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),

]).then(() => {
  renderOrderSummary();
  renderOrderPayment();
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