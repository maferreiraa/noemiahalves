// Troque estes links pelos links oficiais dos ingressos no Sympla.
const SYMPLA_GRATUITO = 'https://www.sympla.com.br/';
const SYMPLA_VIP = 'https://www.sympla.com.br/';

// Exemplo: se você quiser diferenciar os botões depois, basta colocar classes específicas.
document.querySelectorAll('a[href="https://www.sympla.com.br/"]').forEach((link) => {
  link.addEventListener('click', () => {
    console.log('Clique em CTA Sympla');
  });
});
