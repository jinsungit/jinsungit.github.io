(() => {
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const emailButton = document.querySelector("[data-copy-email]");
  if (emailButton) {
    emailButton.addEventListener("click", async () => {
      const email = emailButton.getAttribute("data-copy-email");
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const label = emailButton.getAttribute("aria-label");
        const icon = emailButton.querySelector("i");
        if (icon) {
          const originalClass = icon.className;
          icon.className = "fa-solid fa-check";
          emailButton.setAttribute("aria-label", "Email address copied to clipboard");
          setTimeout(() => {
            icon.className = originalClass;
            if (label) emailButton.setAttribute("aria-label", label);
          }, 2000);
        } else {
          const originalText = emailButton.textContent;
          emailButton.textContent = "Copied!";
          emailButton.setAttribute("aria-label", "Email address copied to clipboard");
          setTimeout(() => {
            emailButton.textContent = originalText;
            if (label) emailButton.setAttribute("aria-label", label);
          }, 2000);
        }
      } catch {
        window.location.href = "mailto:" + email;
      }
    });
  }
})();
