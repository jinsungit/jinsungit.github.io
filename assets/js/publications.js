(() => {
  const container = document.getElementById("publications-list");
  if (!container) return;

  const DATA_PATH = "assets/data/publications.json";
  const filterButtons = Array.from(
    document.querySelectorAll(".pub-filter-button")
  );
  const searchInput = document.getElementById("pub-search-input");

  let allPubs = [];
  let currentKind = "all";
  let currentQuery = "";

  function normalize(str) {
    return (str || "").toLowerCase();
  }

  function matchesFilters(pub) {
    if (currentKind !== "all" && pub.kind !== currentKind) return false;

    if (!currentQuery) return true;

    const haystack = normalize(
      [
        pub.title,
        pub.authors,
        pub.venue,
        (pub.tags || []).join(" "),
      ].join(" ")
    );

    return haystack.includes(normalize(currentQuery));
  }

  function createPubItem(pub) {
    const item = document.createElement("article");
    item.className = "pub-item";
    if (pub.highlight) item.classList.add("pub-highlight");

    const titleEl = document.createElement("div");
    titleEl.className = "pub-title";

    if (pub.links && pub.links.paper) {
      const link = document.createElement("a");
      link.href = pub.links.paper;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = pub.title;
      titleEl.appendChild(link);
    } else {
      titleEl.textContent = pub.title;
    }

    const authorsEl = document.createElement("div");
    authorsEl.className = "pub-authors";
    const names = (pub.authors || "").split(",");
    authorsEl.innerHTML = names
      .map((nameRaw) => {
        const name = nameRaw.trim();
        if (!name) return "";
        if (/jin sun|your name/i.test(name)) {
          return `<strong>${name}</strong>`;
        }
        return name;
      })
      .filter(Boolean)
      .join(", ");

    const metaEl = document.createElement("div");
    metaEl.className = "pub-meta";
    const parts = [];
    if (pub.venue) parts.push(pub.venue);
    if (pub.year) parts.push(pub.year);
    if (pub.kind) parts.push(pub.kind);
    metaEl.textContent = parts.join(" · ");

    const linksRow = document.createElement("div");
    linksRow.className = "pub-links";

    if (pub.links) {
      if (pub.links.paper) {
        const paperLink = document.createElement("a");
        paperLink.className = "pub-link";
        paperLink.href = pub.links.paper;
        paperLink.target = "_blank";
        paperLink.rel = "noopener noreferrer";
        paperLink.textContent = "Paper";
        linksRow.appendChild(paperLink);
      }
      if (pub.links.arxiv) {
        const arxivLink = document.createElement("a");
        arxivLink.className = "pub-link";
        arxivLink.href = pub.links.arxiv;
        arxivLink.target = "_blank";
        arxivLink.rel = "noopener noreferrer";
        arxivLink.textContent = "arXiv";
        linksRow.appendChild(arxivLink);
      }
      if (pub.links.code) {
        const codeLink = document.createElement("a");
        codeLink.className = "pub-link";
        codeLink.href = pub.links.code;
        codeLink.target = "_blank";
        codeLink.rel = "noopener noreferrer";
        codeLink.textContent = "Code";
        linksRow.appendChild(codeLink);
      }
      if (pub.links.project) {
        const projLink = document.createElement("a");
        projLink.className = "pub-link";
        projLink.href = pub.links.project;
        projLink.target = "_blank";
        projLink.rel = "noopener noreferrer";
        projLink.textContent = "Project page";
        linksRow.appendChild(projLink);
      }
    }

    const tagsRow = document.createElement("div");
    tagsRow.className = "pub-tags";
    (pub.tags || []).forEach((tag) => {
      const span = document.createElement("span");
      span.className = "pub-tag-pill";
      span.textContent = tag;
      tagsRow.appendChild(span);
    });

    item.appendChild(titleEl);
    item.appendChild(authorsEl);
    item.appendChild(metaEl);
    if (linksRow.childElementCount > 0) item.appendChild(linksRow);
    if (tagsRow.childElementCount > 0) item.appendChild(tagsRow);

    return item;
  }

  function groupByYear(pubs) {
    const map = new Map();
    for (const pub of pubs) {
      const year = pub.year || "Other";
      if (!map.has(year)) map.set(year, []);
      map.get(year).push(pub);
    }
    return map;
  }

  function render() {
    container.innerHTML = "";
    const filtered = allPubs.filter(matchesFilters);

    if (filtered.length === 0) {
      const msg = document.createElement("p");
      msg.className = "pub-meta";
      msg.textContent = "No publications match the current filters.";
      container.appendChild(msg);
      return;
    }

    const groups = groupByYear(filtered);
    const years = Array.from(groups.keys()).sort((a, b) => Number(b) - Number(a));

    for (const year of years) {
      const yearGroup = document.createElement("section");
      yearGroup.className = "pub-year-group";

      const heading = document.createElement("div");
      heading.className = "pub-year-heading";
      heading.textContent = year;
      yearGroup.appendChild(heading);

      const pubs = groups.get(year).slice().sort((a, b) => {
        const ta = a.title || "";
        const tb = b.title || "";
        return ta.localeCompare(tb);
      });

      for (const pub of pubs) {
        yearGroup.appendChild(createPubItem(pub));
      }

      container.appendChild(yearGroup);
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.getAttribute("data-kind") || "all";
      currentKind = kind;

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      currentQuery = event.target.value || "";
      render();
    });
  }

  fetch(DATA_PATH)
    .then((res) => (res.ok ? res.json() : []))
    .then((data) => {
      if (!Array.isArray(data)) return;
      allPubs = data;
      render();
    })
    .catch(() => {
      allPubs = [];
      render();
    });
})();
