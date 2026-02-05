// =========================
// GESTÃO DE TEMA
// =========================

function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log("System prefers dark mode:", prefersDark); // Debug
  console.log("Saved theme:", savedTheme); // Debug
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.checked = currentTheme === "dark";
    console.log("Toggle checked:", toggle.checked); // Debug
  } else {
    console.error("themeToggle not found"); // Debug
  }

  const hasManualTheme = savedTheme !== null;
  localStorage.setItem("hasManualTheme", hasManualTheme ? "true" : "false");
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.checked = theme === "dark";
    console.log("Applied theme:", theme); // Debug
  }
  document.body.style.transition =
    "background-color 0.4s ease, color 0.4s ease";
}

function toggleTheme() {
  const checkbox = document.getElementById("themeToggle");
  if (checkbox) {
    const newTheme = checkbox.checked ? "dark" : "light";
    console.log("Manual toggle to:", newTheme); // Debug
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("hasManualTheme", "true");
  } else {
    console.error("themeToggle not found in toggleTheme"); // Debug
  }
}

function handleSystemThemeChange(e) {
  const hasManualTheme = localStorage.getItem("hasManualTheme") === "true";
  console.log("System theme changed, prefers dark:", e.matches); // Debug
  console.log("Has manual theme:", hasManualTheme); // Debug
  if (!hasManualTheme) {
    const newTheme = e.matches ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
}

// =========================
// GESTÃO DE IDIOMAS
// =========================

const translations = {
  pt: {
    title: "Juan Ibanez",
    meta_description: "Página de links e portfólio de Juan Ibanez",
    subtitle: "💻 Desenvolvedor Full Stack",
    bio: "Mestre em elétrica com ênfase em engenharia de software e engenharia dirigida a modelos. Apaixonado por tecnologia, desenvolvimento web e soluções criativas. Trabalho com React, Node.js e Golang, criando sistemas modernos e eficientes.",
    images_alt: {
      avatar: "Avatar de Juan Ibanez",
      gmail: "Ícone e-mail",
      site: "Ícone site",
      github: "Ícone GitHub",
      linkedin: "Ícone LinkedIn",
      instagram: "Ícone Instagram",
      lattes: "Ícone do Lattes",
      orcid: "Ícone ORCID",
    },
    links: {
      gmail: "Gmail",
      site: "Meu Site",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      lattes: "Currículo Lattes",
      orcid: "ORCID",
    },
    footer: {
      made: "Feito com ❤️ por",
      rights: "© Todos os direitos reservados .",
    },
    theme: "⚙️ Tema:",
    language: "🌐 Idioma:",
    language_select_title: "Selecionar idioma",
  },
  en: {
    title: "Juan Ibanez",
    meta_description: "Links and portfolio page of Juan Ibanez",
    subtitle: "💻 Full Stack Developer",
    bio: "Master in Electrical Engineering with emphasis on Software Engineering and Model-Driven Engineering. Passionate about technology, web development, and creative solutions. I work with React, Node.js, and Golang to build modern and efficient systems.",
    images_alt: {
      avatar: "Avatar of Juan Ibanez",
      gmail: "Email icon",
      site: "Website icon",
      github: "GitHub icon",
      linkedin: "LinkedIn icon",
      instagram: "Instagram icon",
      lattes: "Lattes CV icon",
      orcid: "ORCID icon",
    },
    links: {
      gmail: "Gmail",
      site: "My Website",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      lattes: "Lattes CV",
      orcid: "ORCID",
    },
    footer: {
      made: "Made with ❤️ by",
      rights: "© All rights reserved .",
    },
    theme: "⚙️ Theme:",
    language: "🌐 Language:",
    language_select_title: "Select language",
  },
  es: {
    title: "Juan Ibanez",
    meta_description: "Página de enlaces y portafolio de Juan Ibanez",
    subtitle: "💻 Desarrollador Full Stack",
    bio: "Máster en eléctrica con énfasis en ingeniería de software e ingeniería dirigida a modelos. Apasionado por la tecnología, el desarrollo web y las soluciones creativas. Trabajo con React, Node.js y Golang, creando sistemas modernos y eficientes.",
    images_alt: {
      avatar: "Avatar de Juan Ibanez",
      gmail: "Ícono de correo",
      site: "Ícono de sitio web",
      github: "Ícono de GitHub",
      linkedin: "Ícono de LinkedIn",
      lattes: "Ícono de Currículum Lattes",
      orcid: "Ícono de ORCID",
      instagram: "Ícono de Instagram",
    },
    links: {
      gmail: "Gmail",
      site: "Mi Sitio Web",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      lattes: "Currículum Lattes",
      orcid: "ORCID",
    },
    footer: {
      made: "Hecho con ❤️ por",
      rights: "© Todos los derechos reservados 2026.",
    },
    theme: "⚙️ Tema:",
    language: "🌐 Idioma:",
    language_select_title: "Seleccionar idioma",
  },
};

const linkOrder = [
  "gmail",
  "site",
  "github",
  "linkedin",
  "instagram",
  "lattes",
  "orcid",
];

// Detecta idioma do navegador
function getBrowserLang() {
  const lang = navigator.language.slice(0, 2);
  console.log("Browser language:", lang); // Debug
  return ["pt", "en", "es"].includes(lang) ? lang : "pt";
}

// Define o idioma
function setLanguage(lang) {
  console.log("Setting language:", lang); // Debug
  if (!translations[lang]) {
    console.error("Invalid language:", lang); // Debug
    return;
  }
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang === "pt" ? "pt-br" : lang;
  const t = translations[lang];

  // Atualiza metadados
  console.log("Updating title to:", t.title); // Debug
  document.title = t.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    console.log("Updating meta description to:", t.meta_description); // Debug
    metaDescription.setAttribute("content", t.meta_description);
  } else {
    console.error("Meta description not found"); // Debug
  }

  // Atualiza textos principais
  const title = document.querySelector("h1");
  if (title) {
    console.log("Updating h1 to:", t.title); // Debug
    title.textContent = t.title;
  } else {
    console.error("h1 not found"); // Debug
  }
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    console.log("Updating subtitle to:", t.subtitle); // Debug
    subtitle.textContent = t.subtitle;
  } else {
    console.error(".subtitle not found"); // Debug
  }
  const bio = document.querySelector(".bio");
  if (bio) {
    console.log("Updating bio to:", t.bio); // Debug
    bio.textContent = t.bio;
  } else {
    console.error(".bio not found"); // Debug
  }
  const footerMade = document.querySelector("footer p:nth-child(1)");
  if (footerMade) {
    console.log("Updating footer made to:", t.footer.made); // Debug
    footerMade.innerHTML = `${t.footer.made} <span>Juan Ibanez</span>`;
  } else {
    console.error("Footer made not found"); // Debug
  }
  const footerRights = document.querySelector("footer p:nth-child(2)");
  if (footerRights) {
    console.log("Updating footer rights to:", t.footer.rights); // Debug
    footerRights.textContent = t.footer.rights;
  } else {
    console.error("Footer rights not found"); // Debug
  }

  // Atualiza atributos alt das imagens
  const avatar = document.querySelector(".avatar");
  if (avatar) {
    console.log("Updating avatar alt to:", t.images_alt.avatar); // Debug
    avatar.setAttribute("alt", t.images_alt.avatar);
  } else {
    console.error(".avatar not found"); // Debug
  }
  const linkImages = document.querySelectorAll(".links li img");
  linkImages.forEach((img, i) => {
    const key = linkOrder[i];
    if (key && t.images_alt[key]) {
      console.log(`Updating link image ${i} alt to:`, t.images_alt[key]); // Debug
      img.setAttribute("alt", t.images_alt[key]);
    } else {
      console.error(`Alt text key not found for index ${i}`); // Debug
    }
  });

  // Atualiza textos dos links
  const links = document.querySelectorAll(".links li a");
  console.log("Found links:", links.length); // Debug
  links.forEach((link, i) => {
    link.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });
    const key = linkOrder[i];
    if (key && t.links[key]) {
      console.log(`Updating link ${i} text to:`, t.links[key]); // Debug
      const img = link.querySelector("img");
      if (img) {
        link.appendChild(document.createTextNode(` ${t.links[key]}`));
      } else {
        console.error(`Image not found in link ${i}`); // Debug
      }
    } else {
      console.error(`Link key not found for index ${i}`); // Debug
    }
  });

  // Atualiza rótulos de tema e idioma
  const themeLabel = document.querySelector(".theme-label");
  if (themeLabel) {
    console.log("Updating theme label to:", t.theme); // Debug
    themeLabel.textContent = t.theme;
  } else {
    console.error(".theme-label not found"); // Debug
  }
  const languageLabel = document.querySelector(".language-switch label");
  if (languageLabel) {
    console.log("Updating language label to:", t.language); // Debug
    languageLabel.textContent = t.language;
  } else {
    console.error(".language-switch label not found"); // Debug
  }
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    console.log("Updating language select title to:", t.language_select_title); // Debug
    languageSelect.setAttribute("title", t.language_select_title);
  } else {
    console.error("#languageSelect not found"); // Debug
  }
}

// =========================
// INICIALIZAÇÃO GERAL
// =========================

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Debug
  // Tema
  setInitialTheme();
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
    console.log("Theme toggle listener added"); // Debug
  }

  // Listener para mudanças no tema do sistema
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
  console.log("System theme change listener added"); // Debug

  // Idioma
  const savedLang = localStorage.getItem("language") || getBrowserLang();
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    console.log("Setting initial language select value to:", savedLang); // Debug
    languageSelect.value = savedLang;
    setLanguage(savedLang);
    languageSelect.addEventListener("change", (e) => {
      console.log("Language select changed to:", e.target.value); // Debug
      setLanguage(e.target.value);
    });
  } else {
    console.error("Elemento #languageSelect não encontrado"); // Debug
  }
});
