document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}})});
const modal = document.getElementById("inscricaoModal");
const abrirModalBtns = document.querySelectorAll(".abrir-inscricao");
const fecharModal = document.getElementById("fecharModal");

abrirModalBtns.forEach((botao) => {
  botao.addEventListener("click", function (event) {
    event.preventDefault();

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

fecharModal.addEventListener("click", function () {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});
