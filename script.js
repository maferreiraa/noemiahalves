/*
  IMPORTANTE:
  1. O botão "INSCRIÇÃO GRATUITA" abre o modal.
  2. Ao enviar o formulário, a pessoa é redirecionada para obrigado.html.
  3. Para salvar os dados em algum lugar, crie um Google Apps Script
     e cole a URL publicada abaixo em GOOGLE_SCRIPT_URL.

  Se GOOGLE_SCRIPT_URL ficar vazio, o formulário abre, valida os dados
  e redireciona para obrigado.html, mas NÃO salva os dados fora do navegador.
*/

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5OVOClj3G3vpjHHg66aIixz4R9P24C1uHN-Sb9oXGZIcQFbBwVcXs2KDV1bi5ppbQ/exec";
const THANK_YOU_URL = "https://maferreiraa.github.io/noemiahalves/obrigado.html";

const modal = document.getElementById("inscricaoModal");
const abrirModalBtns = document.querySelectorAll(".abrir-inscricao");
const fecharModal = document.getElementById("fecharModal");
const inscricaoForm = document.getElementById("inscricaoForm");
const formMessage = document.getElementById("formMessage");

function abrirModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const primeiroCampo = modal.querySelector("input");
    if (primeiroCampo) {
        setTimeout(() => primeiroCampo.focus(), 150);
    }
}

function fecharModalFn() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

abrirModalBtns.forEach((botao) => {
    botao.addEventListener("click", (event) => {
        event.preventDefault();
        abrirModal();
    });
});

fecharModal.addEventListener("click", fecharModalFn);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharModalFn();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        fecharModalFn();
    }
});

inscricaoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = inscricaoForm.querySelector("button[type='submit']");
    const formData = new FormData(inscricaoForm);

    const codigo =
"SVSP-" + Math.floor(10000 + Math.random() * 90000);

const lead = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    tipo: "gratuito",
    codigo: codigo,
    origem: "LP Sua Voz Seu Poder",
    data: new Date().toLocaleString("pt-BR")
};

    formMessage.textContent = "Enviando sua inscrição...";
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lead)
            });
       const result = await response.json();

    localStorage.setItem(
        "ingresso_svsp",
        JSON.stringify(result)
    );

    window.location.href = THANK_YOU_URL;

} catch (error) {

    localStorage.setItem(
        "lead_sua_voz_seu_poder",
        JSON.stringify(lead)
    );

    window.location.href = THANK_YOU_URL;

}
});

