/*
  IMPORTANTE:
  1. O botão "INSCRIÇÃO GRATUITA" abre o modal.
  2. Ao enviar o formulário, a pessoa é redirecionada para obrigado.html.
  3. Para salvar os dados em algum lugar, crie um Google Apps Script
     e cole a URL publicada abaixo em GOOGLE_SCRIPT_URL.

  Se GOOGLE_SCRIPT_URL ficar vazio, o formulário abre, valida os dados
  e redireciona para obrigado.html, mas NÃO salva os dados fora do navegador.
*/

const GOOGLE_SCRIPT_URL = "";
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

    const lead = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        origem: "LP Sua Voz Seu Poder",
        data: new Date().toLocaleString("pt-BR")
    };

    formMessage.textContent = "Enviando sua inscrição...";
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("https://")) {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lead)
            });
        } else {
            localStorage.setItem("lead_sua_voz_seu_poder", JSON.stringify(lead));
        }

        window.location.href = THANK_YOU_URL;
    } catch (error) {
        localStorage.setItem("lead_sua_voz_seu_poder", JSON.stringify(lead));
        window.location.href = THANK_YOU_URL;
    }
});
