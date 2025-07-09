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

// reviews section functionality

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));

    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides[currentSlide].classList.add("active");
  }

  prevButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  setInterval(() => {
    showSlide(currentSlide + 1); // Auto slide change every 5 seconds
  }, 5000);
});

// aboutus section functionality

document.addEventListener("DOMContentLoaded", function () {
  const aboutButtons = document.querySelectorAll(".about-button");

  aboutButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const aboutItem = this.parentElement;

      document.querySelectorAll(".about").forEach((item) => {
        if (item !== aboutItem) {
          item.classList.remove("active");
        }
      });

      aboutItem.classList.toggle("active");
    });
  });
});

// car slider section functionality

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
const slideCount = slides.length;

function initializeSlider() {
  prevBtn.addEventListener("click", () => {
    goToSlide((currentIndex - 1 + slideCount) % slideCount);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide((currentIndex + 1) % slideCount);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goToSlide((currentIndex - 1 + slideCount) % slideCount);
    } else if (e.key === "ArrowRight") {
      goToSlide((currentIndex + 1) % slideCount);
    }
  });

  startAutoSlide();
}

function goToSlide(index) {
  slides[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");

  currentIndex = index;

  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
}

let slideInterval;

function startAutoSlide() {
  slideInterval = setInterval(() => {
    goToSlide((currentIndex + 1) % slideCount);
  }, 6000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

const container = document.querySelector(".car-slider-container");
container.addEventListener("mouseenter", stopAutoSlide);
container.addEventListener("mouseleave", startAutoSlide);

let touchStartX = 0;
let touchEndX = 0;

container.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

container.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const minSwipeDistance = 50;

  if (touchEndX < touchStartX - minSwipeDistance) {
    goToSlide((currentIndex + 1) % slideCount);
  } else if (touchEndX > touchStartX + minSwipeDistance) {
    goToSlide((currentIndex - 1 + slideCount) % slideCount);
  }
}

document.addEventListener("DOMContentLoaded", initializeSlider);

// main car functionality

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".bg-video");
  const carModelTexts = document.querySelectorAll(".car-model-text");
  const modelIndicators = document.querySelectorAll(".model-indicator");
  const prevSlideBtn = document.querySelector(".prev-slide");
  const nextSlideBtn = document.querySelector(".next-slide");

  let currentSlideIndex = 0;

  function updateActiveSlide(index) {
    videos.forEach((video) => video.classList.remove("active"));
    carModelTexts.forEach((text) => text.classList.remove("active"));
    modelIndicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );

    videos[index].classList.add("active");
    carModelTexts[index].classList.add("active");
    modelIndicators[index].classList.add("active");

    currentSlideIndex = index;
  }

  modelIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      updateActiveSlide(index);
    });
  });
  prevSlideBtn.addEventListener("click", function () {
    let newIndex = currentSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = videos.length - 1;
    }
    updateActiveSlide(newIndex);
  });

  nextSlideBtn.addEventListener("click", function () {
    let newIndex = currentSlideIndex + 1;
    if (newIndex >= videos.length) {
      newIndex = 0;
    }
    updateActiveSlide(newIndex);
  });

  // keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      prevSlideBtn.click();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextSlideBtn.click();
    }
  });

  let slideInterval;

  function startAutoPlay() {
    slideInterval = setInterval(() => {
      nextSlideBtn.click();
    }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  startAutoPlay();

  document
    .querySelector(".slider-navigation")
    .addEventListener("mouseenter", stopAutoPlay);
  document
    .querySelector(".slider-navigation")
    .addEventListener("mouseleave", startAutoPlay);

  updateActiveSlide(0);

  videos.forEach((video) => {
    video.load();
  });
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
  const image = card.querySelector(".product-image").getAttribute("src");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find((item) => item.title === title);
  heartBtn.classList.toggle("active");

  if (heartBtn.classList.contains("active")) {
    if (!exists) {
      favorites.push({ title, price, image });
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
