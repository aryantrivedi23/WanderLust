const taxSwitch = document.querySelector(".taxSwitch");
const prices = document.querySelectorAll(".price");

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".listing-card");

const selectTab = (filter) => {
  filters.forEach((f) => f.classList.remove("active-tab"));

  filter.classList.add("active-tab");

  const selectedTab = filter.dataset.tab;

  cards.forEach((card) => {
    const categories = card.dataset.categories.split(",");
    if (selectedTab === "trending" || categories.includes(selectedTab)) {
      card.parentElement.style.display = "block";
    } else {
      card.parentElement.style.display = "none";
    }
  });
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => selectTab(filter));
});

const trendingFilter = document.querySelector('.filter[data-tab="trending"]');
if (trendingFilter) selectTab(trendingFilter);

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
