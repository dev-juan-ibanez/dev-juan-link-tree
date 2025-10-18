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

document.addEventListener("DOMContentLoaded", () => {
  setInitialTheme();
  document.getElementById("themeToggle").addEventListener("change", toggleTheme);
});
