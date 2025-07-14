document.querySelectorAll("header nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  });
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  alert(
    `Mensagem enviada!\n\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  );

  contactForm.reset();
});

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", function (e) {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "🌙";
  } else {
    this.textContent = "☀️";
  }
});
