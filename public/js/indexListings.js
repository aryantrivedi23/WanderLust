const taxSwitch = document.querySelector(".taxSwitch");
const prices = document.querySelectorAll(".price");

function redirect(url) {
  window.location.href = url;
}

const clacPrice = () => {
  const includeTax = taxSwitch.checked;

  prices.forEach((priceElem) => {
    const basePrice = parseFloat(priceElem.dataset.price);
    const finalPrice = includeTax ? basePrice * 1.18 : basePrice;

    const formattedPrice = finalPrice.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

    let taxString;

    if (includeTax) {
      taxString = `&#8377; ${formattedPrice} / night`;
    } else {
      taxString = `&#8377; ${formattedPrice} + 18% GST / night`;
    }

    priceElem.innerHTML = taxString;
  });
};

taxSwitch.addEventListener("change", clacPrice);

clacPrice();
