//***** BOTÃO HOME ************
function menu_inicial() {
  window.location.href = "../index.html";
}
/*******************************/

/*******VALIDAÇÃO DO FORMULÁRIO DO CADASTRO DE PRATOS*********/
const nomeInput = document.getElementById("nomePrato");
const descInput = document.getElementById("descricao");
const precoInput = document.getElementById("preco");

nomeInput.addEventListener("input", function () {
  const maxLength = 50;
  this.value = this.value.slice(0, maxLength);
  this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

descInput.addEventListener("input", function () {
  const maxLength = 100;
  this.value = this.value.slice(0, maxLength);
  this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});

precoInput.addEventListener("input", function () {
  const maxLength = 6;
  this.value = this.value.slice(0, maxLength);

  // permite apenas números e vírgula/ponto
  this.value = this.value.replace(/[^0-9.,]/g, "");
});

document.getElementById("imgInput").addEventListener("change", function () {
  const preview = document.getElementById("preview");
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.innerHTML = `<img src="${reader.result}" alt="preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
});
/*******************************/

//********CHAMAR FUNÇÃO CARREGAR PRATOS DEPOIS Q A PAG. CARREGA*****
document.addEventListener("DOMContentLoaded", function(){
  carregarPratos(); 
})
/*******************************/

// *****ADICIONAR NOVO PRATO*****
const ModalAdicionar = new bootstrap.Modal(
  document.getElementById("abrirModalCadastro")
);

document
  .getElementById("formCardapio")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const form = document.getElementById("formCardapio");
    fetch("adicionar_prato.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          // Limpar o formulário após o sucesso
          form.reset();
          document.getElementById("preview").innerHTML = "";
          carregarPratos();
          ModalAdicionar.hide(); //fechar o modal do formulario
        } else if(data.status === "erro"){
          let alerta = document.querySelector(".alert");
          alerta.style.display = "block";
          alerta.style.color = "#e01c1cff";
          alerta.style.fontSize = "12px";
          alerta.style.fontWeight="bold";
          alerta.style.textAlign="center";
          alerta.style.padding="0";
          alerta.textContent = data.mensagem;
          setTimeout(() => {
            alerta.style.display = "none";
            alerta.textContent = "";
          }, 3000);
        }
        else {
          console.log(data);
        }
      });
  });
/*******************************/

// *****LISTAR PRATOS*****
let pratosCache = []; // Armazena os pratos carregados

function carregarPratos() {
  fetch("listar_pratos.php")
    .then((r) => r.json())
    .then((dados) => {
      pratosCache = dados.todos_pratos; // Guardar pratos localmente
      exibirPratos(dados.todos_pratos); // Mostrar na tela
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

function exibirPratos(lista) {
  const container = document.getElementById("listaPratos");
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
    if (nomeCurto.length > 45) {
      nomeCurto = nomeCurto.slice(0, 45) + "...";
    }

    let descricaoCurto = prato.descricao;
    if (descricaoCurto.length > 95) {
      descricaoCurto = descricaoCurto.slice(0, 95) + "...";
    }
    container.innerHTML += `
      <div class="prato-card">
        <img src="../${prato.imagem}">

        <div class="prato-info">
          <h4>${nomeCurto}</h4>
          <p>${prato.descricao}</p>
          <small class="categ">${prato.categoria}</small>
          <p>
              <strong>${prato.preco} Kz</strong>
                  ${
                    destaqueTexto
                      ? `<small class="destaque">${destaqueTexto}</small>`
                      : ""
                  }
            </p>
        </div>

        <div class="prato-acoes ms-auto">
          <button class="btn-editar" data-bs-toggle="modal" data-bs-target="#abrirModalCadastro" onclick="editarPrato(${
            prato.id
          })">Editar</button>
          <button class="btn-excluir" onclick="confirmarExclusao(${
            prato.id
          })">Excluir</button>
        </div>
      </div>
    `;
  });
}
/*******************************/

//*****EDITAR PRATO*****
function editarPrato(id) {
  fetch(`buscar_prato.php?id=${id}`)
    .then((r) => r.json())
    .then((d) => {
      document.querySelector("input[name='nome']").value = d.nome;
      document.querySelector("textarea[name='descricao']").value = d.descricao;
      document.querySelector("select[name='categoria']").value = d.categoria;
      document.querySelector("select[name='destaque']").value = d.destaque;
      document.querySelector("input[name='preco']").value = d.preco;
      document.querySelector("input[name='id']").value = d.id; // campo hidden p/ edição

      // mostrar a imagem
      document.getElementById(
        "preview"
      ).innerHTML = `<img src="../${d.imagem}">`;
    });
}
/*******************************/

//****EXCLUIR PRATO****
let pratoParaExcluir = null;
const modalConfirmar = new bootstrap.Modal(
  document.getElementById("modalConfirmar")
);

function confirmarExclusao(id) {
  pratoParaExcluir = id;
  modalConfirmar.show();
}

document.getElementById("btnConfirmarExcluir").addEventListener("click", function () {
  fetch("excluir_prato.php?id=" + pratoParaExcluir)
    .then((r) => r.json())
    .then((d) => {
      if (d.status === "sucesso") {
        carregarPratos();
        modalConfirmar.hide();
      }
    });
});
/*******************************/



// *****REDIFINIR PIN*****

// Script para o Form do Login
const input = document.getElementById("redifinirPin");
const input2 = document.getElementById("redifinirPin2");
const input3 = document.getElementById("redifinirTelefone");

// Aceitar apenas números
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("pin-input")) {
    e.target.value = e.target.value.replace(/\D/g, "");
  }
});

// Validar o campo de telefone para aceitar apenas 9 números
document.getElementById("redifinirTelefone").addEventListener("input", function (e) {
    const inputTelefone = e.target;
    // Permite apenas 1 sinal de "+" no início e o resto apenas dígitos
    inputTelefone.value = inputTelefone.value
      .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
      //.replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
      .slice(0, 9); // Limite para 15 caracteres (máximo internacional)
  });

document.getElementById("FormRedifinirPin").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch("../admin/redifinir_pin.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          window.location.href = "../admin/dashboard.php";
        } else if (data.status === "senha_incorreta") {
          input.classList.add("shake");
          input.style.borderColor = "#ff3b30";
          setTimeout(() => input.classList.remove("shake"), 300);
          input.value = "";
          input2.classList.remove("shake");
          input2.style.borderColor = "#ccc";
          input3.classList.remove("shake");
          input3.style.borderColor = "#ccc";
        } else {
          input.classList.add("shake");
          input.style.borderColor = "#ff3b30";
          setTimeout(() => input.classList.remove("shake"), 300);
          input.value = "";
          input2.classList.add("shake");
          input2.style.borderColor = "#ff3b30";
          setTimeout(() => input2.classList.remove("shake"), 300);
          input2.value = "";
          input3.classList.add("shake");
          input3.style.borderColor = "#ff3b30";
          setTimeout(() => input3.classList.remove("shake"), 300);
          input3.value = "";
        }
      });
  });
/*******************************/