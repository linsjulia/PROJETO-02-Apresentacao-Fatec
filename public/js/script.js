
import imagesCarousel from "./json.js";

const imagem = document.getElementById("hero-image");

let atual = 0;

imagem.src = imagesCarousel[atual].url;

function trocarImagem() {


    imagem.classList.add("trocando");

    setTimeout(() => {


        atual = (atual + 1) % imagesCarousel.length;
        imagem.src = imagesCarousel[atual].url;


        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Fade in
                imagem.classList.remove("trocando");
            });
        });

    }, 500);
}

setInterval(trocarImagem, 7000);

