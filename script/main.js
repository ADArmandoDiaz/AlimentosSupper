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
        slide.style.display = "none";
        slide.style.display = ""; // Hack para reiniciar animación si es CSS
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
     5. LÓGICA DEL LIGHTBOX (GALERÍA)
     ========================================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("img01");
  const closeBtn = document.querySelector(".close-btn");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (modal && modalImg && galleryImages.length > 0) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
      });
    });

    if (closeBtn) {
      closeBtn.onclick = function () {
        modal.style.display = "none";
      };
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  /* =========================================
     6. FORMULARIO: NETLIFY FORMS + SWEETALERT
     ========================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita recarga

      // 1. Validación Básica
      const nombreInput = document.getElementById("nombre");
      const emailInput = document.getElementById("email");

      if (nombreInput && emailInput) {
        if (nombreInput.value.length < 3 || !emailInput.value.includes("@")) {
          Swal.fire({
            icon: "warning",
            title: "Datos incompletos",
            text: "Por favor, ingresa un nombre válido y un correo electrónico.",
            confirmButtonColor: "#a61c22",
          });
          return;
        }
      }

      // 2. Animación de "Cargando"
      Swal.fire({
        title: "Enviando...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData(this);

      // 3. Envío a Netlify (Fetch a la raíz '/')
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // 4. Éxito
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Mensaje Enviado con Éxito!",
            text: "Gracias por contactarnos. Te responderemos a la brevedad.",
            showConfirmButton: false,
            timer: 2500,
          });
          contactForm.reset();
        })
        .catch((error) => {
          // 5. Error
          console.error("Error Netlify:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema al enviar el mensaje. Intenta de nuevo.",
            confirmButtonColor: "#a61c22",
          });
        });
    });
  }
});
