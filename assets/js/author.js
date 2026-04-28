/**
 * Author-style home: loads publications.json.
 * Optional per-paper fields: "cover" (image URL), "blurb" (one-line teaser).
 * Backlist: highlighted papers that have a real image cover (non-empty cover URL).
 */
(() => {
  const shelfRoot = document.getElementById("author-shelf-grid");
  if (!shelfRoot) return;

  const DATA_PATH = "assets/data/publications.json";

  function hasImageCover(pub) {
    return typeof pub.cover === "string" && pub.cover.trim().length > 0;
  }

  function sortPubs(a, b) {
    if (b.year !== a.year) return b.year - a.year;
    return (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0);
  }

  function primaryHref(links) {
    if (!links) return null;
    return links.paper || links.arxiv || links.project || links.code || null;
  }

  function renderShelf(pubs) {
    shelfRoot.innerHTML = "";
    if (!pubs.length) {
      shelfRoot.innerHTML =
        '<p class="author-shelf-empty">No highlighted papers with a <code>cover</code> image yet—set <code>highlight: true</code> and a non-empty <code>cover</code> URL in <code>publications.json</code>.</p>';
      return;
    }

    pubs.forEach((pub) => {
      const href = primaryHref(pub.links);
      const wrap = document.createElement("article");
      wrap.className = "author-book";

      const link = document.createElement(href ? "a" : "div");
      link.className = "author-book-link";
      if (href) {
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      const cover = document.createElement("div");
      cover.className = "author-book-cover";
      const img = document.createElement("img");
      img.src = pub.cover.trim();
      img.alt = pub.title || "Publication cover";
      img.loading = "lazy";
      cover.appendChild(img);

      const title = document.createElement("h3");
      title.className = "author-book-title";
      title.textContent = pub.title || "Untitled";

      const meta = document.createElement("p");
      meta.className = "author-book-meta";
      meta.textContent = [pub.venue, pub.year].filter(Boolean).join(" · ");

      link.appendChild(cover);
      link.appendChild(title);
      link.appendChild(meta);
      wrap.appendChild(link);

      const blurbText =
        typeof pub.blurb === "string" && pub.blurb.trim().length > 0 ? pub.blurb.trim() : "";
      if (blurbText) {
        const blurb = document.createElement("p");
        blurb.className = "author-book-blurb";
        blurb.textContent = blurbText;
        wrap.appendChild(blurb);
      }

      shelfRoot.appendChild(wrap);
    });
  }

  fetch(DATA_PATH)
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load publications");
      return r.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        renderShelf([]);
        return;
      }
      const sorted = [...data].sort(sortPubs);
      const backlist = sorted.filter((p) => p.highlight === true && hasImageCover(p));
      renderShelf(backlist);
    })
    .catch(() => {
      shelfRoot.innerHTML =
        '<p class="author-error">Could not load publications. Serve this page over HTTP(S) so <code>publications.json</code> can load.</p>';
    });
})();
