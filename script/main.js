document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. MENÚ MÓVIL (Hamburguesa)
     ========================================= */
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".main-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
      menuToggle.classList.toggle("is-active");
    });
  }

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      menuToggle.classList.remove("is-active");
    });
  });

  /* =========================================
     2. SLIDER DE PRODUCTOS (Corregido)
     ========================================= */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(n) {
    // 1. Quitar clase active de todos los slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
      // Truco: forzamos un reflujo para que las animaciones CSS se reinicien
      slide.style.display = "none";
      slide.offsetHeight;
      slide.style.display = "";
    });

    // 2. Calcular nuevo índice
    currentSlide = (n + slides.length) % slides.length;

    // 3. Activar el nuevo slide
    slides[currentSlide].classList.add("active");
  }

  // Eventos de botones
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      resetTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      resetTimer();
    });
  }

  // Autoplay
  function startTimer() {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000); // 6 segundos para dar tiempo a leer el texto
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  if (slides.length > 0) {
    startTimer();
  }

  /* =========================================
     3. HEADER DINÁMICO
     ========================================= */
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* =========================================
     4. ANIMACIÓN SCROLL REVEAL
     ========================================= */
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    ".product-card, .about-text, .feature-card, .section-title",
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  /* =========================================
     5. VALIDACIÓN DE FORMULARIO
     ========================================= */
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;

      if (nombre.length < 3 || !email.includes("@")) {
        e.preventDefault();
        alert("Por favor, ingresa un nombre válido y un correo electrónico.");
      }
    });
  }
});
