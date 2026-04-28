(() => {
  const container = document.getElementById("news-list");
  if (!container) return;

  const NEWS_PATH = "assets/data/news.json";
  const INITIAL_COUNT = 10;

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const match = String(dateStr).match(/^(\d{4})-(\d{2})/);
    const dt = match
      ? new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, 1)
      : new Date(dateStr);
    if (Number.isNaN(dt.getTime())) return dateStr;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  }

  function getTypeInfo(rawType) {
    const t = String(rawType || "").toLowerCase();
    if (!t) return null;

    switch (t) {
      case "paper":
        return { icon: "fa-scroll", label: "Paper" };
      case "grant":
        return { icon: "fa-hand-holding-dollar", label: "Grant" };
      case "talk":
        return { icon: "fa-microphone-lines", label: "Talk" };
      case "activity":
        return { icon: "fa-people-group", label: "Activity" };
      default:
        return { icon: "fa-circle-dot", label: rawType };
    }
  }

  function createNewsItem(entry) {
    const wrapper = document.createElement("article");
    wrapper.className = "news-item";

    const metaCol = document.createElement("div");
    const dateEl = document.createElement("div");
    dateEl.className = "news-date";
    dateEl.textContent = formatDate(entry.date);

    metaCol.appendChild(dateEl);

    const mainCol = document.createElement("div");
    const titleEl = document.createElement("div");
    titleEl.className = "news-title";

    if (entry.link) {
      const link = document.createElement("a");
      link.href = entry.link;
      link.textContent = entry.title;
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      titleEl.appendChild(link);
    } else {
      titleEl.textContent = entry.title;
    }

    const descEl = document.createElement("div");
    descEl.className = "news-description";
    if (entry.description) {
      descEl.textContent = entry.description;
    }

    mainCol.appendChild(titleEl);
    if (entry.description) mainCol.appendChild(descEl);

    wrapper.appendChild(metaCol);
    wrapper.appendChild(mainCol);

    const typeInfo = getTypeInfo(entry.type);
    if (typeInfo) {
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "news-type-icon";
      iconWrapper.setAttribute("aria-label", typeInfo.label);
      iconWrapper.setAttribute("title", typeInfo.label);

      const icon = document.createElement("i");
      icon.className = `fa-solid ${typeInfo.icon}`;
      icon.setAttribute("aria-hidden", "true");

      iconWrapper.appendChild(icon);
      wrapper.appendChild(iconWrapper);
    }

    return wrapper;
  }

  function renderNews(data) {
    container.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      const empty = document.createElement("p");
      empty.className = "news-description";
      empty.textContent = "More updates coming soon.";
      container.appendChild(empty);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da;
    });

    const recent = sorted.slice(0, INITIAL_COUNT);
    const past = sorted.slice(INITIAL_COUNT);

    for (const entry of recent) {
      container.appendChild(createNewsItem(entry));
    }

    if (past.length > 0) {
      const pastWrapper = document.createElement("div");
      pastWrapper.className = "news-past";
      pastWrapper.setAttribute("aria-hidden", "true");

      for (const entry of past) {
        pastWrapper.appendChild(createNewsItem(entry));
      }

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "news-expand-btn";
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.textContent = `View past news (${past.length})`;

      toggleBtn.addEventListener("click", () => {
        const expanded = pastWrapper.classList.toggle("is-expanded");
        toggleBtn.setAttribute("aria-expanded", String(expanded));
        pastWrapper.setAttribute("aria-hidden", String(!expanded));
        toggleBtn.textContent = expanded ? "Show less" : `View past news (${past.length})`;
      });

      container.appendChild(pastWrapper);
      container.appendChild(toggleBtn);
    }
  }

  fetch(NEWS_PATH)
    .then((res) => (res.ok ? res.json() : []))
    .then(renderNews)
    .catch(() => {
      renderNews([]);
    });
})();
