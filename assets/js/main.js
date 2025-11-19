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
  horario.innerHTML = " Fechado - Abrimos às 10h";
  horario.setAttribute("data-key", "fechado");
} else {
  horario.innerHTML = " Aberto até 22:00";
  horario.setAttribute("data-key", "aberto_ate");
}

//PEGAR OS DADOS DO RESTAURANTE
fetch(`admin/dados_restaurante.php?r=${window.restID}`)
  .then((r) => r.json())
  .then((dados) => {
    if (!dados) return;

    document.getElementById("rest_nome").innerText = dados.nome;
    document.getElementById("rest_endereco").innerText = dados.endereco;
    document.getElementById("iframe").src = dados.google_maps;

    // salvar para o WhatsApp automático
    window.restTelefone = dados.telefone;
  });



//API DO WHATSAPP
document.getElementById("whatsapp").addEventListener("click", function () {
  const numero =  window.restTelefone; // usar o telefone do restaurante
  const mensagem = "Olá! Preciso de mais informações.";

  const link =
    "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.open(link, "_blank");
});




// --- SISTEMA DE ZOOM ---
// --- SISTEMA DE ZOOM + PARTILHA ---
function ativarZoom() {
  const modal = document.getElementById("zoomModal");
  const modalImg = document.getElementById("zoomImg");

  const openShare = document.getElementById("openShare");
  const shareMenu = document.getElementById("shareMenu");
  const closeShare = document.getElementById("closeShare");

  const whatsapp = document.getElementById("shareWhatsapp");
  const facebook = document.getElementById("shareFacebook");
  const twitter = document.getElementById("shareTwitter");
  const telegram = document.getElementById("shareTelegram");
  const download = document.getElementById("shareDownload");

  // --- ABRIR IMAGEM ---
  document.querySelectorAll("img.zoomable").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.dataset.link = img.src; // guardar link
    });
  });

  // --- FECHAR ZOOM ---
  modal.onclick = (e) => { 
    if (e.target === modal) {
      modal.style.display = "none";
      shareMenu.classList.remove("show");
    }

  };

  // === MENU DE PARTILHA ===
  openShare.onclick = () => shareMenu.classList.add("show");
  closeShare.onclick = () => shareMenu.classList.remove("show");

  // WhatsApp
  whatsapp.onclick = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(modalImg.dataset.link)}`);
  };

  // Facebook
  facebook.onclick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${modalImg.dataset.link}`);
  };

  // Twitter / X
  twitter.onclick = () => {
    window.open(`https://twitter.com/intent/tweet?url=${modalImg.dataset.link}`);
  };

  // Telegram
  telegram.onclick = () => {
    window.open(`https://t.me/share/url?url=${modalImg.dataset.link}`);
  };

  // Download
  download.onclick = () => {
    const a = document.createElement("a");
    a.href = modalImg.dataset.link;
    a.download = "prato.png";
    a.click();
  };
}





//--------PÁGINAS CARREGADAS----------

let pratosCache = []; // Armazena os pratos carregados

//CODIGO DA PAG. PRATO DE ENTRADA
function ativarEntrada() {
  function carregarPratos() {
    fetch(`admin/listar_pratos_cliente.php?r=${window.restID}`)
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_entrada; // Guardar pratos localmente
        exibirPratos(dados.categoria_entrada); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    if (!lista || !Array.isArray(lista)) {
      console.warn("A lista de pratos está vazia ou indefinida:", lista);
      return;
    }
    const container = document.getElementById("listaPratosCategoria");
    if (!container) {
      console.warn("Container listaPratosCategoria não encontrado na página!");
      return;
    }
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
              <img src="${prato.imagem}" class="zoomable">
            </div>
          </div>

        </div>
      `;
    });

    ativarZoom(); 

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
    fetch(`admin/listar_pratos_cliente.php?r=${window.restID}`)
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_prato_principal; // Guardar pratos localmente
        exibirPratos(dados.categoria_prato_principal); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    if (!lista || !Array.isArray(lista)) {
      console.warn("A lista de pratos está vazia ou indefinida:", lista);
      return;
    }
    const container = document.getElementById("listaPratosCategoria");
    if (!container) {
      console.warn("Container listaPratosCategoria não encontrado na página!");
      return;
    }
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
              <img src="${prato.imagem}" class="zoomable">
            </div>
          </div>

        </div>
      `;
    });

    ativarZoom();
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
    fetch(`admin/listar_pratos_cliente.php?r=${window.restID}`)
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_sobremesa; // Guardar pratos localmente
        exibirPratos(dados.categoria_sobremesa); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    if (!lista || !Array.isArray(lista)) {
      console.warn("A lista de pratos está vazia ou indefinida:", lista);
      return;
    }
    const container = document.getElementById("listaPratosCategoria");
    if (!container) {
      console.warn("Container listaPratosCategoria não encontrado na página!");
      return;
    }
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
              <img src="${prato.imagem}" class="zoomable">
            </div>
          </div>

        </div>
      `;
    });
    ativarZoom(); 
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
    fetch(`admin/listar_pratos_cliente.php?r=${window.restID}`)
      .then((r) => r.json())
      .then((dados) => {
        pratosCache = dados.categoria_bebida; // Guardar pratos localmente
        exibirPratos(dados.categoria_bebida); // Mostrar na tela
      });
  }

  function exibirPratos(lista) {
    if (!lista || !Array.isArray(lista)) {
      console.warn("A lista de pratos está vazia ou indefinida:", lista);
      return;
    }
    const container = document.getElementById("listaPratosCategoria");
    if (!container) {
      console.warn("Container listaPratosCategoria não encontrado na página!");
      return;
    }
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
              <img src="${prato.imagem}" class="zoomable">
            </div>
          </div>

        </div>
      `;
    });
    ativarZoom(); 
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
  fetch(url + "?nocache=" + new Date().getTime(), { cache: "no-store" })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("stage").innerHTML = html;

      // Reaplicar idioma
      loadLanguage(localStorage.getItem("lang") || "pt");

      initCarrossel();
      // Inicializações de cada página
      if (url.includes("entrada")) ativarEntrada();
      if (url.includes("prato-principal")) ativarPratoPrincipal();
      if (url.includes("sobremesas")) ativarSobremesas();
      if (url.includes("bebidas")) ativarBebidas();
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", function () {
  carregarPagina("categorias/menu-inicial.html");
});


//mudar cor de todos btn-close
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    e.target.classList.add("btn-close-white");
  }
});

// VIBRAÇÃO PARA ANDROIDS
//VIBRAR Clicando na imagem
document.getElementById("stage").addEventListener("click", (e) => {
  if (e.target.classList.contains("zoomable")) {
    if (navigator.vibrate) navigator.vibrate(40); // vibração curta
    console.log("Teste de vibração enviado!");
  }
});
// VIBRAR Ao abrir o menu de partilha (botão dos 3 pontos)
document.getElementById("zoomModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("share-btn")) {
    if (navigator.vibrate){
      navigator.vibrate([20, 30, 20]); // vibração moderna tipo Android
      console.log("Teste de vibração enviado!");
    } 
  }
});

//VIBRAR ao mudar idioma
const langSwitcher = document.getElementById("langSwitcher");

langSwitcher.addEventListener("change", () => {
  // --- Vibração ao trocar idioma ---
  if (navigator.vibrate) {
    navigator.vibrate(50); // vibração curta
    console.log("Teste de vibração enviado!");
  }

  // Salvar idioma
  const lang = langSwitcher.value;
  localStorage.setItem("lang", lang);

  // Aplicar idioma
  loadLanguage(lang);
});
/////////FIM VIBRAÇÂO//////////

