// navbar functionality

var lastScrollTop = 0;
var navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-50px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

//search button functionality

const searchBtn = document.getElementById("searchBtn");
const closeBtn = document.getElementById("closeBtn");
const searchPopup = document.getElementById("searchPopup");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchHint = document.getElementById("searchHint");

searchBtn.addEventListener("click", () => {
  searchPopup.classList.add("active");
  setTimeout(() => {
    searchInput.focus();
  }, 300);
});

closeBtn.addEventListener("click", () => {
  searchPopup.classList.remove("active");
  searchInput.value = "";
  searchHint.textContent = "";
});

searchPopup.addEventListener("click", (e) => {
  if (e.target === searchPopup) {
    searchPopup.classList.remove("active");
    searchInput.value = "";
    searchHint.textContent = "";
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchHint.textContent = `Press Enter to search for "${query}"`;
  } else {
    searchHint.textContent = "";
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    alert(`Searching for: ${query}`);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && searchPopup.classList.contains("active")) {
    searchPopup.classList.remove("active");
    searchInput.value = "";
    searchHint.textContent = "";
  }
});

// menu btn functionality

const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const navBar = document.getElementById("navBar");
const overlay = document.querySelector(".header-overlay");

menuBtn.addEventListener("click", () => {
  navBar.classList.add("active");
  overlay.classList.add("active");
});

closeMenuBtn.addEventListener("click", () => {
  navBar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("active");
  overlay.classList.remove("active");
});

// models page filter functionality

// product counter
function updateProductCount() {
  const productGrid = document.getElementById("product-grid");
  const productCards = productGrid.querySelectorAll(".product-card");
  const productCount = productCards.length;

  document.getElementById("product-count").textContent = productCount;
}
window.onload = updateProductCount; // call the function when the page loads

// show filters
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("filters-toggle");
  const filtersPanel = document.getElementById("filters");

  toggleButton.addEventListener("click", () => {
    filtersPanel.classList.toggle("show");
    toggleButton.textContent = filtersPanel.classList.contains("show")
      ? "Hide Filters"
      : "Show Filters";
  });
});

// max min slider year

const yearHandle = document.getElementById("year");
const yearLabel = document.getElementById("year-label");
const yearTrack = document.getElementById("size-track");

const MIN_YEAR = 2020;
const MAX_YEAR = 2025;
let dragging = false;

function getYearFromPosition(pos, trackWidth) {
  const percent = pos / trackWidth;
  return Math.round(MIN_YEAR + (MAX_YEAR - MIN_YEAR) * percent);
}

function getPositionFromYear(year) {
  const percent = (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR);
  return percent * yearTrack.offsetWidth;
}

function updateYearFilter(year) {
  yearLabel.textContent = `Year: ${year}`;
  document.querySelectorAll(".product-card").forEach((product) => {
    const productYear = parseInt(product.dataset.year, 10);
    product.style.display = productYear === year ? "block" : "none";
  });
}

function startYearDrag(e) {
  dragging = true;
  document.addEventListener("mousemove", onYearDrag);
  document.addEventListener("mouseup", stopYearDrag);
}

function onYearDrag(e) {
  if (!dragging) return;

  const rect = yearTrack.getBoundingClientRect();
  let newLeft = e.clientX - rect.left;
  const trackWidth = yearTrack.offsetWidth;

  newLeft = Math.max(0, Math.min(newLeft, trackWidth));
  yearHandle.style.left = `${newLeft}px`;

  const selectedYear = getYearFromPosition(newLeft, trackWidth);
  updateYearFilter(selectedYear);
}

function stopYearDrag() {
  dragging = false;
  document.removeEventListener("mousemove", onYearDrag);
  document.removeEventListener("mouseup", stopYearDrag);
}

function initializeYearSlider() {
  const initialLeft = getPositionFromYear(MAX_YEAR);
  yearHandle.style.left = `${initialLeft}px`;
  updateYearFilter(MAX_YEAR);
}

yearHandle.addEventListener("mousedown", startYearDrag);
window.addEventListener("load", initializeYearSlider);
window.addEventListener("resize", () => {
  const currentYear =
    parseInt(yearLabel.textContent.replace("Year: ", ""), 10) || MAX_YEAR;
  yearHandle.style.left = `${getPositionFromYear(currentYear)}px`;
});

// max min slider price

const priceMax = document.getElementById("price-max");
const priceLabel = document.getElementById("price-label");
const track = document.getElementById("price-track");

const MAX_PRICE = 100;
dragging = null;

function getPriceFromPosition(pos) {
  return Math.round((pos / track.offsetWidth) * MAX_PRICE);
}

function updatePriceFilter() {
  const maxLeft = parseInt(priceMax.style.left, 10) || track.offsetWidth;
  const maxPrice = getPriceFromPosition(maxLeft);

  priceLabel.textContent = `Price: $0k - $${maxPrice}k`;

  document.querySelectorAll(".product-card").forEach((product) => {
    const price = parseInt(product.dataset.price, 10);
    product.style.display = price <= maxPrice ? "block" : "none";
  });
}

function startDrag(e) {
  dragging = priceMax;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(e) {
  if (!dragging) return;

  const rect = track.getBoundingClientRect();
  let newLeft = e.clientX - rect.left;
  newLeft = Math.max(0, Math.min(newLeft, track.offsetWidth));

  priceMax.style.left = `${newLeft}px`;
  updatePriceFilter();
}

function stopDrag() {
  dragging = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

window.addEventListener("load", () => {
  const initialLeft = track.offsetWidth;
  priceMax.style.left = `${initialLeft}px`;
  updatePriceFilter();
});

priceMax.addEventListener("mousedown", startDrag);
window.addEventListener("resize", updatePriceFilter);

// car type filter
const carTypes = document.getElementById("category-filter");

carTypes.addEventListener("change", function () {
  const category = this.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const productCategory = product
      .querySelector(".product-category")
      .textContent.toLowerCase();

    if (category === "all" || productCategory.includes(category)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// sale filter
document.getElementById("sale-filter").addEventListener("change", function () {
  const showSale = this.value === "Yes";
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const isSale = product.classList.contains("on-sale");

    if ((showSale && isSale) || (!showSale && !isSale)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// car brand filter
const carBrand = document.getElementById("brand-filter");

carBrand.addEventListener("change", function () {
  const selectedBrand = this.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const productBrand = product.dataset.brand.toLowerCase();

    if (selectedBrand === "all brands" || productBrand === selectedBrand) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// sorting prices (latest)
document.getElementById("sort-options").addEventListener("change", function () {
  const option = this.value;
  const productGrid = document.getElementById("product-grid");
  const products = Array.from(productGrid.children); // converts product elements inside productGrid into an array

  products.sort((a, b) => {
    const priceA = parseInt(
      //converts the cleaned string into a number
      a.querySelector(".product-price").textContent.replace(/\D/g, "") //removes all non-digit characters by replacing them with an empty string
    );
    const priceB = parseInt(
      b.querySelector(".product-price").textContent.replace(/\D/g, "")
    );

    if (option === "Price: High-Low") {
      return priceB - priceA;
    } else if (option === "Price: Low-High") {
      return priceA - priceB;
    } else {
      return 0;
    }
  });

  products.forEach((product) => {
    productGrid.appendChild(product);
  });
});

// favorites system functionality

function updateFavoritesCount() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const countElement = document.getElementById("fav-count");
  if (countElement) countElement.textContent = favorites.length;
}

function toggleFavorite(heartBtn) {
  const card = heartBtn.closest(".product-card");
  const title = card.querySelector(".product-title").textContent;
  const price = card.querySelector(".product-price").textContent;
  const type = card.querySelector(".product-category").textContent;
  const image = card.querySelector(".product-image").getAttribute("src");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find((item) => item.title === title);
  heartBtn.classList.toggle("active");

  if (heartBtn.classList.contains("active")) {
    if (!exists) {
      favorites.push({ title, price, image, type });
    }
  } else {
    favorites = favorites.filter((item) => item.title !== title);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesCount();
}

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector(".product-title").textContent;
    if (favorites.some((item) => item.title === title)) {
      card.querySelector(".heart-btn").classList.add("active");
    }
  });

  updateFavoritesCount();
});

// CRUD system car management (modelpage.html) main page functionality
function loadCars() {
  const cars = JSON.parse(localStorage.getItem("cars"));
  const container = document.getElementById("car-listings");
  container.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-year", car.year);
    card.setAttribute("data-price", car.price);
    card.setAttribute("data-brand", car.brand);
    card.setAttribute("data-model", car.model);
    card.setAttribute("data-type", car.type);
    card.setAttribute("data-transmission", car.transmission);
    card.setAttribute("data-fuel", car.fuel);
    card.setAttribute("data-seats", car.seats);
    card.setAttribute("data-location", car.location);
    card.setAttribute("data-features", car.features);
    card.setAttribute("data-condition", car.condition);
    card.setAttribute("data-posted", car.datePosted);

    card.innerHTML = `
    <button class="heart-btn" onclick="toggleFavorite(this)">
      <i class="fa-solid fa-heart"></i>
    </button>
    <img src="${car.image}" alt="${car.name}" class="product-image" />
    <div class="product-info">
      <div class="product-title">${car.name}</div>
      <div class="product-category">${car.type}</div>
      <div class="product-year">${car.year}</div>
      <div class="product-price">USD ${parseFloat(
        car.price
      ).toLocaleString()}.00</div>
      <button class="view-details-btn" onclick="openDetails(this)">View Details</button>
    </div>
  `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadCars);

// product page functionality
function openDetails(button) {
  const carCard = button.closest(".product-card");

  const carData = {
    title: carCard.querySelector(".product-title").textContent,
    image: carCard.querySelector(".product-image").getAttribute("src"),
    brand: carCard.dataset.brand,
    model: carCard.dataset.model,
    year: carCard.dataset.year,
    type: carCard.dataset.type,
    transmission: carCard.dataset.transmission,
    fuel: carCard.dataset.fuel,
    seats: carCard.dataset.seats,
    price: carCard.dataset.price,
    location: carCard.dataset.location,
    features: carCard.dataset.features,
    condition: carCard.dataset.condition,
    datePosted: carCard.dataset.posted,
  };

  localStorage.setItem("CarProduct", JSON.stringify(carData));
  window.location.href = "product.html";
}

//search functionality

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");
  const productCount = document.getElementById("product-count");
  const searchPopup = document.getElementById("searchPopup");
  const searchBtn = document.getElementById("searchBtn");
  const closeBtn = document.getElementById("closeBtn");

  searchBtn.addEventListener("click", () => {
    searchPopup.style.display = "block";
    searchInput.focus();
  });

  closeBtn.addEventListener("click", () => {
    searchPopup.style.display = "none";
    searchInput.value = "";
    filterProducts("");
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(searchTerm);
  });

  function filterProducts(searchTerm) {
    let visibleCount = 0;
    const noResultsMsg = document.getElementById("no-results");

    productCards.forEach((card) => {
      const title = card
        .querySelector(".product-title")
        .textContent.toLowerCase();
      const category = card
        .querySelector(".product-category")
        .textContent.toLowerCase();
      const brand = card.getAttribute("data-brand").toLowerCase();

      const matches =
        title.includes(searchTerm) ||
        category.includes(searchTerm) ||
        brand.includes(searchTerm);

      card.style.display = matches ? "block" : "none";

      if (matches) visibleCount++;
    });

    productCount.textContent = visibleCount;

    noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }
});
