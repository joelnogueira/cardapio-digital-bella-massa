
// i18n.js - Internationalization Script
//IDIOMA
let currentLang = localStorage.getItem("lang") || "pt";

async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[key]) {
      element.innerHTML = translations[key];
    }
  });

  localStorage.setItem("lang", lang);
  currentLang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "pt";
  const savedSelect = localStorage.getItem("selectedLangOption") || savedLang;

  // ⬇️ Restaurar o select ao recarregar
  document.getElementById("langSwitcher").value = savedSelect;

  loadLanguage(savedLang);
});

document.getElementById("langSwitcher").addEventListener("change", function () {
  loadLanguage(this.value);

  // ⬇️ Salvar o valor atual do select
  localStorage.setItem("selectedLangOption", this.value);
});


