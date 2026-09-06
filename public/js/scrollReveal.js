const elementos = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);
elementos.forEach((elemento) => {
  observer.observe(elemento);
});

history.scrollRestoration = "manual";

window.scrollTo(0, 0);

ScrollReveal().reveal(".reveal", {
    reset: false
});