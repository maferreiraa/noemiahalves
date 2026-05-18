/*
  SUA VOZ, SEU PODER — script.js
*/

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx5OVOClj3G3vpjHHg66aIixz4R9P24C1uHN-Sb9oXGZIcQFbBwVcXs2KDV1bi5ppbQ/exec";

const ZAPDATA_WEBHOOK =
    "https://dcjizoulbggsavizbukq.supabase.co/functions/v1/webhook-global?token=156b523d-fd9d-49fb-a61f-ee648c9d7368";

const THANK_YOU_URL =
    "https://maferreiraa.github.io/noemiahalves/obrigado.html";

const INGRESSO_BASE_URL =
    "https://maferreiraa.github.io/noemiahalves/ingresso.html";

const modal = document.getElementById("inscricaoModal");
const abrirModalBtns = document.querySelectorAll(".abrir-inscricao");
const fecharModal = document.getElementById("fecharModal");
const inscricaoForm = document.getElementById("inscricaoForm");
const formMessage = document.getElementById("formMessage");

function abrirModal() {
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const primeiroCampo = modal.querySelector("input");

    if (primeiroCampo) {
        setTimeout(() => primeiroCampo.focus(), 150);
    }
}

function fecharModalFn() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function gerarCodigoIngresso() {
    const parteTempo = Date.now().toString().slice(-6);
    const parteAleatoria = Math.floor(10 + Math.random() * 90);

    return "SVSP-" + parteTempo + parteAleatoria;
}

function normalizarWhatsApp(numero) {
    if (!numero) return "";
    return numero.replace(/\D/g, "");
}

abrirModalBtns.forEach((botao) => {
    botao.addEventListener("click", (event) => {
        event.preventDefault();
        abrirModal();
    });
});

if (fecharModal) {
    fecharModal.addEventListener("click", fecharModalFn);
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            fecharModalFn();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
    ) {
        fecharModalFn();
    }
});

if (inscricaoForm) {
    inscricaoForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton =
            inscricaoForm.querySelector("button[type='submit']");

        const formData = new FormData(inscricaoForm);

        const nome = (formData.get("nome") || "").trim();
        const email = (formData.get("email") || "").trim();
        const whatsapp = normalizarWhatsApp(formData.get("whatsapp"));

        const codigo = gerarCodigoIngresso();

        const linkIngresso =
            INGRESSO_BASE_URL +
            "?id=" +
            encodeURIComponent(codigo) +
            "&nome=" +
            encodeURIComponent(nome);

        const lead = {
            data: new Date().toLocaleString("pt-BR"),
            nome: nome,
            email: email,
            whatsapp: whatsapp,
            tipo: "gratuito",
            codigo: codigo,
            linkIngresso: linkIngresso,
            linkingresso: linkIngresso,
            link_ingresso: linkIngresso,
            ingresso: linkIngresso,
            origem: "LP Sua Voz Seu Poder"
        };

        if (formMessage) {
            formMessage.textContent = "Enviando sua inscrição...";
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";
        }

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(lead)
            });

            if (
                ZAPDATA_WEBHOOK &&
                ZAPDATA_WEBHOOK !== "https://dcjizoulbggsavizbukq.supabase.co/functions/v1/webhook-global?token=156b523d-fd9d-49fb-a61f-ee648c9d7368"
            ) {
                await fetch(ZAPDATA_WEBHOOK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(lead)
                });
            }

            localStorage.setItem(
                "ingresso_svsp",
                JSON.stringify(lead)
            );

            window.location.href = THANK_YOU_URL;

        } catch (error) {
            console.error("Erro ao enviar inscrição:", error);

            localStorage.setItem(
                "lead_sua_voz_seu_poder",
                JSON.stringify(lead)
            );

            window.location.href = THANK_YOU_URL;
        }
    });
}
