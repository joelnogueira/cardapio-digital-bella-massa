let horario = document.getElementById("horario");
let dataAtual = new Date();
let horas = dataAtual.getHours();
let minutos = dataAtual.getMinutes();
if (horas >= 22 || horas < 10) {
  horario.innerHTML = "Fechado - Abrimos às 10h";
} else {
  horario.innerHTML = "Aberto até 22:00";
}




let pratosCache = []; // Armazena os pratos carregados

function carregarPratos() {
  fetch("admin/listar_pratos.php")
    .then(r => r.json())
    .then(pratos => {
      pratosCache = pratos; // Guardar pratos localmente
      exibirPratos(pratos); // Mostrar na tela
    });
}


function ativarEntrada() {
  function carregarPratos() {
    fetch("admin/listar_pratos.php")
      .then((r) => r.json())
      .then((pratos) => {
        pratosCache = pratos; // Guardar pratos localmente
        exibirPratos(pratos); // Mostrar na tela
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
        ativarEntrada();
      } else if (url === "categorias/prato-principal.html") {
        
      } 
      else if (url === "categorias/menu-inicial.html") {

      } 
    })
    .catch((error) => {
      console.error("Erro ao carregar a página:", error);
    });
}


