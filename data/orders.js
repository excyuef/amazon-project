const orders = 
  JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders (order) {
  orders.unshift(order);  
  saveToStorage();
  console.log(orders)
}

function saveToStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
}