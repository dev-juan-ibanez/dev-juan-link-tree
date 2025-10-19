// =========================
// GESTÃO DE TEMA
// =========================

function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  document.getElementById("themeToggle").checked = currentTheme === "dark";
}

function toggleTheme() {
  const checkbox = document.getElementById("themeToggle");
  const newTheme = checkbox.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// =========================
// GESTÃO DE IDIOMAS
// =========================

const translations = {
  pt: {
    title: "Juan Ibañez",
    subtitle: "💻 Desenvolvedor Full Stack",
    bio: "Apaixonado por tecnologia, desenvolvimento web e soluções criativas. Trabalho com React, Node.js e Golang, criando sistemas modernos e eficientes.",
    links: {
      gmail: "Gmail",
      site: "Meu Site",
      github: "GitHub",
      linkedin: "LinkedIn",
      lattes: "Currículo Lattes",
      instagram: "Instagram"
    },
    footer: {
      made: "Feito com ❤️ por",
      rights: "© Todos os direitos reservados 2025."
    },
    theme: "⚙️ Tema:",
    language: "🌐 Idioma:"
  },

  en: {
    title: "Juan Ibañez",
    subtitle: "💻 Full Stack Developer",
    bio: "Passionate about technology, web development, and creative solutions. I work with React, Node.js, and Golang to build modern and efficient systems.",
    links: {
      gmail: "Gmail",
      site: "My Website",
      github: "GitHub",
      linkedin: "LinkedIn",
      lattes: "Lattes CV",
      instagram: "Instagram"
    },
    footer: {
      made: "Made with ❤️ by",
      rights: "© All rights reserved 2025."
    },
    theme: "⚙️ Theme:",
    language: "🌐 Language:"
  },

  es: {
    title: "Juan Ibañez",
    subtitle: "💻 Desarrollador Full Stack",
    bio: "Apasionado por la tecnología, el desarrollo web y las soluciones creativas. Trabajo con React, Node.js y Golang, creando sistemas modernos y eficientes.",
    links: {
      gmail: "Gmail",
      site: "Mi Sitio Web",
      github: "GitHub",
      linkedin: "LinkedIn",
      lattes: "Currículum Lattes",
      instagram: "Instagram"
    },
    footer: {
      made: "Hecho con ❤️ por",
      rights: "© Todos los derechos reservados 2025."
    },
    theme: "⚙️ Tema:",
    language: "🌐 Idioma:"
  }
};

// Detecta idioma do navegador
function getBrowserLang() {
  const lang = navigator.language.slice(0, 2);
  return ["pt", "en", "es"].includes(lang) ? lang : "pt";
}

// Define o idioma
function setLanguage(lang) {
  localStorage.setItem("language", lang);
  const t = translations[lang];

  // Atualiza textos principais
  document.querySelector("h1").textContent = t.title;
  document.querySelector(".subtitle").textContent = t.subtitle;
  document.querySelector(".bio").textContent = t.bio;
  document.querySelector("footer p:nth-child(1)").innerHTML = `${t.footer.made} <span>Juan Ibanez</span>`;
  document.querySelector("footer p:nth-child(2)").textContent = t.footer.rights;

  // Atualiza links
  const linkTexts = Object.values(t.links);
  document.querySelectorAll(".links li a").forEach((link, i) => {
    link.childNodes[1].textContent = " " + linkTexts[i];
  });

  // Atualiza rótulos de tema e idioma
  document.querySelector(".theme-label").textContent = t.theme;
  document.querySelector(".language-switch label").textContent = t.language;
}

// =========================
// INICIALIZAÇÃO GERAL
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // Tema
  setInitialTheme();
  document.getElementById("themeToggle").addEventListener("change", toggleTheme);

  // Idioma
  const savedLang = localStorage.getItem("language") || getBrowserLang();
  const languageSelect = document.getElementById("languageSelect");
  languageSelect.value = savedLang;
  setLanguage(savedLang);

  languageSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
});
