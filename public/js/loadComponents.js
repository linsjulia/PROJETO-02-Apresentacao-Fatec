
async function carregarComponente(id, arquivo) {
    const elemento = document.getElementById(id);
    const resposta = await fetch(arquivo);
    const html = await resposta.text();
    elemento.innerHTML = html;
}
carregarComponente("footer", "./components/footer.html");
