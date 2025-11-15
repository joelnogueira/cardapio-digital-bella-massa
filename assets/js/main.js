window.addEventListener("load", () => {
  const bar = document.querySelector("#loaderAnimate .progress");
  const loader = document.getElementById("loaderAnimate");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;

    if (progress >= 100) {
      clearInterval(interval);
      bar.style.width = "100%";

      loader.classList.remove("animate__fadeIn");
      loader.classList.add("animate__fadeOut");

      setTimeout(() => {
        loader.remove();
      }, 600);
    } else {
      bar.style.width = progress + "%";
    }
  }, 180);
});

let horario = document.getElementById("horario");
let dataAtual = new Date();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
if (horas >= 22 || horas < 10) {
  horario.innerHTML = "Fechado - Abrimos às 10h";
} else {
  horario.innerHTML = "Aberto até 22:00";
}

//API DO WHATSAPP
document.getElementById("whatsapp").addEventListener("click", function () {
  const numero = "927503016"; // <-- coloque o teu número
  const mensagem = "Olá! Preciso de mais informações.";

  const link =
    "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.open(link, "_blank");
});




//--------PÁGINAS CARREGADAS----------

let pratosCache = []; // Armazena os pratos carregados

//CODIGO DA PAG. PRATO DE ENTRADA
function ativarEntrada() {
  function carregarPratos() {
    fetch("admin/listar_pratos.php")
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_entrada; // Guardar pratos localmente
        exibirPratos(dados.categoria_entrada); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    const container = document.getElementById("listaPratosCategoria");
    container.innerHTML = "";

    lista.forEach((prato) => {
      // Tratamento do destaque com icone
      let destaqueTexto = "";
      switch (prato.destaque) {
        case "Prato da casa":
          destaqueTexto = "⭐ Prato da Casa";
          break;
        case "Mais vendido":
          destaqueTexto = "🔥 Mais Vendido";
          break;
        case "Novo no menu":
          destaqueTexto = "🆕 Novo no Menu";
          break;
      }

      let nomeCurto = prato.nome;
      if (nomeCurto.length == 50) {
        nomeCurto = nomeCurto.slice(0, 50) + "...";
      }

      let descricaoCurto = prato.descricao;
      if (descricaoCurto.length == 100) {
        descricaoCurto = descricaoCurto.slice(0, 100) + "...";
      }
      container.innerHTML += `

        <div class="row listaPrato">
            <div class="col-6">
              <div class="prato-info">
                <h4>${nomeCurto}</h4>
                <p>${prato.descricao}</p>
                <p>
                  <strong>${prato.preco} Kz</strong>
                ${
                  destaqueTexto
                    ? `<small class="destaque">${destaqueTexto}</small>`
                    : ""
                }
                </p>

              </div>
            </div>

          <div class="col-6">
            <div class="prato-imagem">
              <img src="${prato.imagem}">
            </div>
          </div>

        </div>
      `;
    });
  }

  // Filtro em tempo real
  document.getElementById("buscarPrato").addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = pratosCache.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    exibirPratos(filtrados);
  });
  carregarPratos();
}

//CODIGO DA PAG. PRATO PRINCIPAL
function ativarPratoPrincipal() {
  function carregarPratos() {
    fetch("admin/listar_pratos.php")
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_prato_principal; // Guardar pratos localmente
        exibirPratos(dados.categoria_prato_principal); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    const container = document.getElementById("listaPratosCategoria");
    container.innerHTML = "";

    lista.forEach((prato) => {
      // Tratamento do destaque com icone
      let destaqueTexto = "";
      switch (prato.destaque) {
        case "Prato da casa":
          destaqueTexto = "⭐ Prato da Casa";
          break;
        case "Mais vendido":
          destaqueTexto = "🔥 Mais Vendido";
          break;
        case "Novo no menu":
          destaqueTexto = "🆕 Novo no Menu";
          break;
      }

      let nomeCurto = prato.nome;
      if (nomeCurto.length == 50) {
        nomeCurto = nomeCurto.slice(0, 50) + "...";
      }

      let descricaoCurto = prato.descricao;
      if (descricaoCurto.length == 100) {
        descricaoCurto = descricaoCurto.slice(0, 100) + "...";
      }
      container.innerHTML += `

        <div class="row listaPrato">
            <div class="col-6">
              <div class="prato-info">
                <h4>${nomeCurto}</h4>
                <p>${prato.descricao}</p>
                <p>
                  <strong>${prato.preco} Kz</strong>
                ${
                  destaqueTexto
                    ? `<small class="destaque">${destaqueTexto}</small>`
                    : ""
                }
                </p>

              </div>
            </div>

          <div class="col-6">
            <div class="prato-imagem">
              <img src="${prato.imagem}">
            </div>
          </div>

        </div>
      `;
    });
  }

  // Filtro em tempo real
  document.getElementById("buscarPrato").addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = pratosCache.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    exibirPratos(filtrados);
  });
  carregarPratos();
}

//CODIGO DA PAG. SOBREMESA
function ativarSobremesas() {
  function carregarPratos() {
    fetch("admin/listar_pratos.php")
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_sobremesa; // Guardar pratos localmente
        exibirPratos(dados.categoria_sobremesa); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    const container = document.getElementById("listaPratosCategoria");
    container.innerHTML = "";

    lista.forEach((prato) => {
      // Tratamento do destaque com icone
      let destaqueTexto = "";
      switch (prato.destaque) {
        case "Prato da casa":
          destaqueTexto = "⭐ Prato da Casa";
          break;
        case "Mais vendido":
          destaqueTexto = "🔥 Mais Vendido";
          break;
        case "Novo no menu":
          destaqueTexto = "🆕 Novo no Menu";
          break;
      }

      let nomeCurto = prato.nome;
      if (nomeCurto.length == 50) {
        nomeCurto = nomeCurto.slice(0, 50) + "...";
      }

      let descricaoCurto = prato.descricao;
      if (descricaoCurto.length == 100) {
        descricaoCurto = descricaoCurto.slice(0, 100) + "...";
      }
      container.innerHTML += `

        <div class="row listaPrato">
            <div class="col-6">
              <div class="prato-info">
                <h4>${nomeCurto}</h4>
                <p>${prato.descricao}</p>
                <p>
                  <strong>${prato.preco} Kz</strong>
                ${
                  destaqueTexto
                    ? `<small class="destaque">${destaqueTexto}</small>`
                    : ""
                }
                </p>

              </div>
            </div>

          <div class="col-6">
            <div class="prato-imagem">
              <img src="${prato.imagem}">
            </div>
          </div>

        </div>
      `;
    });
  }

  // Filtro em tempo real
  document.getElementById("buscarPrato").addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = pratosCache.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    exibirPratos(filtrados);
  });
  carregarPratos();
}

//CODIGO DA PAG. BEBIDAS
function ativarBebidas() {
  function carregarPratos() {
    fetch("admin/listar_pratos.php")
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_bebida; // Guardar pratos localmente
        exibirPratos(dados.categoria_bebida); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    const container = document.getElementById("listaPratosCategoria");
    container.innerHTML = "";

    lista.forEach((prato) => {
      // Tratamento do destaque com icone
      let destaqueTexto = "";
      switch (prato.destaque) {
        case "Prato da casa":
          destaqueTexto = "⭐ Prato da Casa";
          break;
        case "Mais vendido":
          destaqueTexto = "🔥 Mais Vendido";
          break;
        case "Novo no menu":
          destaqueTexto = "🆕 Novo no Menu";
          break;
      }

      let nomeCurto = prato.nome;
      if (nomeCurto.length == 50) {
        nomeCurto = nomeCurto.slice(0, 50) + "...";
      }

      let descricaoCurto = prato.descricao;
      if (descricaoCurto.length == 100) {
        descricaoCurto = descricaoCurto.slice(0, 100) + "...";
      }
      container.innerHTML += `

        <div class="row listaPrato">
            <div class="col-6">
              <div class="prato-info">
                <h4>${nomeCurto}</h4>
                <p>${prato.descricao}</p>
                <p>
                  <strong>${prato.preco} Kz</strong>
                ${
                  destaqueTexto
                    ? `<small class="destaque">${destaqueTexto}</small>`
                    : ""
                }
                </p>

              </div>
            </div>

          <div class="col-6">
            <div class="prato-imagem">
              <img src="${prato.imagem}">
            </div>
          </div>

        </div>
      `;
    });
  }

  // Filtro em tempo real
  document.getElementById("buscarPrato").addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = pratosCache.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    exibirPratos(filtrados);
  });
  carregarPratos();
}

  //-----CARROSSEL-----
function initCarrossel(){
  const blocos = document.querySelectorAll(".cat-imagem");

    blocos.forEach((bloco) => {
      const imagens = bloco.querySelectorAll("img");
      let index = 0;

      // Garantir que só a primeira aparece
      imagens.forEach((img) => img.classList.remove("ativo"));
      imagens[0].classList.add("ativo");

      setInterval(() => {
        imagens[index].classList.remove("ativo");
        index = (index + 1) % imagens.length;
        imagens[index].classList.add("ativo");
      }, 5000);
    });
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
function cat_sobremesas() {
  carregarPagina("categorias/sobremesas.html");
}
function cat_bebidas() {
  carregarPagina("categorias/bebidas.html");
}

function carregarPagina(url) {
  fetch(url) //+ "?nocache=" + new Date().getTime(), { cache: "no-store" }  Forçar o fetch() a ignorar cache
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a página.");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("stage").innerHTML = html;
      initCarrossel();
      if (url === "categorias/entrada.html") {
        ativarEntrada();
      } else if (url === "categorias/prato-principal.html") {
        ativarPratoPrincipal();
      } else if (url === "categorias/sobremesas.html") {
        ativarSobremesas();
      } else if (url === "categorias/bebidas.html") {
        ativarBebidas();
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar a página:", error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  carregarPagina("categorias/menu-inicial.html");
});