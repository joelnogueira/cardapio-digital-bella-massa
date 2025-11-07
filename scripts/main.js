let horario = document.getElementById("horario");
let dataAtual = new Date();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
if (horas >= 22 || horas < 10) {
  horario.innerHTML = "Fechado - Abrimos às 10h";
} else {
  horario.innerHTML = "Aberto até 22:00";
}

//requisicão assincrona "Dinamicamente"
function menu_inicial() {
  carregarPagina("categorias/menu-inicial.html");
}
function cat_entrada() {
  carregarPagina("categorias/entrada.html");
}
function cat_prato_principal() {
  carregarPagina("categorias/prato-principal.html");
}

function carregarPagina(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a página.");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("stage").innerHTML = html;
      if (url === "categorias/entrada.html") {
        alert("testando");
      } else if (url === "categorias/prato-principal.html") {
        alert("testando mais");
      } 
      else if (url === "categorias/menu-inicial.html") {
        alert("testando mais");
      } 
    })
    .catch((error) => {
      console.error("Erro ao carregar a página:", error);
    });
}


