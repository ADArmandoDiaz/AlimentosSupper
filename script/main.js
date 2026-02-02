document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. MENÚ MÓVIL (Hamburguesa)
     ========================================= */
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".main-nav");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
      menuToggle.classList.toggle("is-active");
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".main-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("active");
        menuToggle.classList.remove("is-active");
      });
    });
  }

  /* =========================================
     2. SLIDER DE PRODUCTOS (Solo si existe)
     ========================================= */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(n) {
      slides.forEach((slide) => {
        slide.classList.remove("active");
        // Reinicio de animación CSS
        slide.style.display = "none";
        slide.offsetHeight;
        slide.style.display = "";
      });

      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
    }

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

    function startTimer() {
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 6000);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    startTimer();
  }

  /* =========================================
     3. HEADER DINÁMICO (Scroll)
     ========================================= */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

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
    ".product-card, .about-text, .feature-card, .section-title, .gallery-item",
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
      const nombreInput = document.getElementById("nombre");
      const emailInput = document.getElementById("email");

      // Validación simple solo si los campos existen
      if (nombreInput && emailInput) {
        const nombre = nombreInput.value;
        const email = emailInput.value;

        if (nombre.length < 3 || !email.includes("@")) {
          e.preventDefault();
          alert("Por favor, ingresa un nombre válido y un correo electrónico.");
        }
      }
    });
  }

  /* =========================================
     6. LÓGICA DEL LIGHTBOX (GALERÍA)
     ========================================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("img01");
  const closeBtn = document.querySelector(".close-btn");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  // Verificamos si los elementos existen para evitar errores en páginas sin galería
  if (modal && modalImg && galleryImages.length > 0) {
    // Abrir modal al hacer clic en la imagen
    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
        console.log("Imagen clickeada:", this.src);
      });
    });

    // Cerrar con la X
    if (closeBtn) {
      closeBtn.onclick = function () {
        modal.style.display = "none";
      };
    }

    // Cerrar al hacer clic fuera de la imagen (fondo oscuro)
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
});
