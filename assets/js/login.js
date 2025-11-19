/*  Script para o Form do Login  */

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("pinInput");
  const inputTelefone = document.getElementById("telefoneLogin");

  // Aceitar apenas números
  document.addEventListener("input", function (e) {
    if (e.target.classList.contains("pin-input")) {
      e.target.value = e.target.value.replace(/\D/g, "");
    }
  });
  // Validar o campo de telefone para aceitar apenas números e o formato +2449xxxxxxx
  document
    .getElementById("telefoneLogin")
    .addEventListener("input", function (e) {
      const inputTelefone = e.target;
      // Permite apenas 1 sinal de "+" no início e o resto apenas dígitos
      inputTelefone.value = inputTelefone.value
        .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
        //.replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
        .slice(0, 9); // Limite para 15 caracteres (máximo internacional)
    });

  document.getElementById("pinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("admin/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          window.location.href = "admin/dashboard.php";
        } else {
          input.classList.add("shake");
          input.style.borderColor = "#ff3b30";
          setTimeout(() => input.classList.remove("shake"), 300);
          input.value = "";
          inputTelefone.classList.add("shake");
          inputTelefone.style.borderColor = "#ff3b30";
          setTimeout(() => inputTelefone.classList.remove("shake"), 300);
          inputTelefone.value = "";
          console.log(data.mensagem);
          //VBRAR Se pin for errado
          if (navigator.vibrate) navigator.vibrate(40); // vibração curta
          console.log("Teste de vibração enviado!");
        }
      });
  });
});

/*  Script para o Form RECUPERAR PIN  */

document.addEventListener("DOMContentLoaded", function () {
  const ModalRecuperarPin = new bootstrap.Modal(
    document.getElementById("abrirModalRecuperarPin")
  );

  const input = document.getElementById("telefone");

  // Validar o campo de telefone para aceitar apenas números e o formato +2449xxxxxxx
  document.getElementById("telefone").addEventListener("input", function (e) {
    const inputTelefone = e.target;
    // Permite apenas 1 sinal de "+" no início e o resto apenas dígitos
    inputTelefone.value = inputTelefone.value
      .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
      //.replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
      .slice(0, 9); // Limite para 15 caracteres (máximo internacional)
  });

  document
    .getElementById("recuperarPinForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      fetch("admin/recuperar_pin.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "sucesso") {
            //window.location.href='admin/dashboard.php'
            let alerta = document.querySelector(".alert");
            alerta.style.display = "block";
            alerta.textContent = data.mensagem;
            setTimeout(() => {
              alerta.style.display = "none";
              alerta.textContent = "";
              input.value = "";
              formData.reset();
            }, 3000);
            ModalRecuperarPin.hide();
            window.open(data.whatsapp, "_blank");
          } else {
            input.classList.add("shake");
            input.style.borderColor = "#ff3b30";
            setTimeout(() => input.classList.remove("shake"), 300);
            let alerta = document.querySelector(".alert");
            alerta.style.display = "block";
            alerta.textContent = data.mensagem;
            setTimeout(() => {
              alerta.style.display = "none";
              alerta.textContent = "";
            }, 3000);
          }
        });
    });
});
