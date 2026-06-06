let cart = [];
let total = 0;

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function updateOrderSummary() {
  document.getElementById("cart").innerText = `🛒 Panier (${cart.length})`;
  document.getElementById("cart-total").innerText = total;
}

function toggleCustomPrice(selectElement, customInputId) {
  const customInput = document.getElementById(customInputId);
  if (!customInput) return;
  customInput.style.display = selectElement.value === "plus" ? "block" : "none";
}

function addToCart(name, priceSelectId, customPriceId) {
  const priceSelect = document.getElementById(priceSelectId);
  const customPrice = document.getElementById(customPriceId);
  let price = Number(priceSelect.value);

  if (priceSelect.value === "plus") {
    price = Number(customPrice.value) || 50;
  }

  cart.push({ name, price });
  total += price;

  const list = document.getElementById("cart-list");
  const item = document.createElement("li");
  item.textContent = `${name} - ${price} MAD`;
  list.appendChild(item);

  updateOrderSummary();
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];

  const orderDateInput = document.getElementById("date-commande");
  const deliveryInput = document.getElementById("date-livraison");

  if (orderDateInput) {
    orderDateInput.min = today;
    orderDateInput.value = today;
    document.getElementById("order-date").innerText = formatDate(orderDateInput.value);
    orderDateInput.addEventListener("change", () => {
      document.getElementById("order-date").innerText = formatDate(orderDateInput.value);
    });
  }

  if (deliveryInput) {
    deliveryInput.min = today;
    deliveryInput.value = today;
    document.getElementById("delivery-date").innerText = formatDate(deliveryInput.value);
    deliveryInput.addEventListener("change", () => {
      document.getElementById("delivery-date").innerText = formatDate(deliveryInput.value);
    });
  }

  const orderForm = document.getElementById("order-form");
  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Commande reçue ! Vérifiez les détails de livraison et le montant total.");
    });
  }

  updateOrderSummary();
});
