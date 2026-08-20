(() => {
  const GA_MEASUREMENT_ID = "G-58L4TFZB72";

  // Load Google Analytics once and apply to every page that includes main.js.
  if (GA_MEASUREMENT_ID && !window.__gaInitialized) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    const gaConfigScript = document.createElement("script");
    gaConfigScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(gaConfigScript);

    window.__gaInitialized = true;
  }

  const sharedFooter = `
    <div class="container footer-inner">
      <p>&copy; <span id="year"></span> Jin Sun. All rights reserved.</p>
    </div>
  `;

  const footerMount = document.querySelector("[data-shared-footer]");
  if (footerMount) {
    footerMount.innerHTML = sharedFooter.trim();
  }

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

  // Highlight the closest upcoming class in a schedule table. Rows for actual
  // class meetings carry data-date="YYYY-MM-DD"; rows for breaks/reading days/
  // finals period are left untagged and are never highlighted.
  const scheduleRows = document.querySelectorAll("tr[data-date]");
  if (scheduleRows.length) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextRow = null;
    let nextDiff = Infinity;

    scheduleRows.forEach((row) => {
      const [y, m, d] = row.getAttribute("data-date").split("-").map(Number);
      const rowDate = new Date(y, m - 1, d);
      const diff = rowDate - today;
      if (diff >= 0 && diff < nextDiff) {
        nextDiff = diff;
        nextRow = row;
      }
    });

    if (nextRow) {
      nextRow.classList.add("sched-next-row");
      const dateCell = nextRow.querySelector("td:first-child");
      if (dateCell) {
        const label = document.createElement("span");
        label.className = "sched-next-label";
        label.textContent = nextDiff === 0 ? "Today" : "Next class";
        dateCell.appendChild(label);
      }
    }
  }
})();
