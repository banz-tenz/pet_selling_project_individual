document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide-item");
  const dots = document.querySelectorAll(".dot");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Event listeners
  nextArrow.addEventListener("click", () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
  });

  prevArrow.addEventListener("click", () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);
      stopSlideShow();
      startSlideShow();
    });
  });

  // Pause on hover
  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", stopSlideShow);
  hero.addEventListener("mouseleave", startSlideShow);

  // Initialize slideshow
  showSlide(0);
  startSlideShow();
});
