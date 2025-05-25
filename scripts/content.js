(function () {
  const observer = new MutationObserver((mutations, obs) => {
    const owlStage = document.querySelector(".owl-stage");
    if (owlStage && owlStage.querySelectorAll(".card-cursos").length > 0) {
      obs.disconnect();
      procesarCursos();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  function procesarCursos() {
    const sesskeyMatch = document
      .querySelector('a[href*="sesskey="]')
      ?.href.match(/sesskey=([\w]+)/);
    const sesskey = sesskeyMatch ? sesskeyMatch[1] : null;

    const cards = document.querySelectorAll(".card-cursos");

    cards.forEach((card) => {
      const courseId = card.getAttribute("data-course-id");
      const footer = card.querySelector(".card-footer");

      if (!footer || !courseId) return;

      if (footer.querySelector(".custom-msg-btn")) return;

      const newButtonDiv = document.createElement("div");
      newButtonDiv.className = "container-icon myovay_stringsfootercontainer";

      const enlace = document.createElement("a");
      enlace.href = `https://educacionadistancia.juntadeandalucia.es/formacionprofesional/local/mail/create.php?course=${courseId}&sesskey=${sesskey}`;
      enlace.className = "color-secondary custom-msg-btn";
      enlace.title = "Enviar mensaje";
      enlace.style.textAlign = "center";

      const iconSpan = document.createElement("span");
      iconSpan.className = "icon-footer mensaje-icon";
      iconSpan.textContent = "📩";

      const textSpan = document.createElement("span");
      textSpan.className = "text myovay_stringsfooter";
      textSpan.textContent = "Mensaje";

      enlace.appendChild(iconSpan);
      enlace.appendChild(document.createElement("br"));
      enlace.appendChild(textSpan);
      newButtonDiv.appendChild(enlace);

      footer.appendChild(newButtonDiv);
    });
  }
})();
