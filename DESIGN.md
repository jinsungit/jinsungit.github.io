# Site design & configuration reference

Static personal academic site (HTML, CSS, minimal JS). Intended for **GitHub Pages** or any static host—no build step, no server-side code.

---

## 1. Project layout

| Path | Role |
|------|------|
| `index.html` | Home: hero, news, explore cards |
| `research.html` | Research intro, project cards, publications (JSON-driven) |
| `teaching.html` | Teaching intro, current/past courses, philosophy, supervision |
| `about.html` | Bio, positions/education timeline, journey photos, personal |
| `404.html` | Not found |
| `assets/css/main.css` | Global tokens, typography, layout, header/footer, cards |
| `assets/css/home.css` | Home-only: hero, portrait, news, highlights |
| `assets/css/research.css` | Research page: projects, publication list, filters |
| `assets/css/teaching.css` | Teaching page: courses, tables, philosophy |
| `assets/css/about.css` | About page: bio grid, timeline, journey grid |
| `assets/js/main.js` | Footer year; email “copy to clipboard” for `[data-copy-email]` |
| `assets/js/news.js` | Loads `news.json`, sorts, shows 10 + expand, type icons |
| `assets/js/publications.js` | Loads `publications.json`, groups by year, filters/search |
| `assets/data/news.json` | News entries |
| `assets/data/publications.json` | Publication entries |
| `assets/img/` | Images: e.g. `profile.jpg` (home hero), `pattern-neural.svg`, `about/` journey shots |

Each HTML page loads **`main.css`** plus its **page CSS** where applicable. **Font Awesome** is loaded only on **`index.html`** (news type icons).

---

## 2. Typography

### 2.1 Font families (CSS variables)

| Variable | Stack | Use |
|----------|--------|-----|
| `--font-sans` | `"DM Sans"`, system UI fallbacks | Body, UI, nav, tables |
| `--font-serif` | `"Source Serif 4"`, Georgia fallbacks | `h1`–`h4`, brand title |

**Rationale:** Claude’s product uses commercial faces (e.g. Styrene, Tiempos). This stack uses **free Google Fonts** with a similar editorial feel: **DM Sans** (clean, slightly warm UI) + **Source Serif 4** (headings).

### 2.2 Loading fonts

Google Fonts URL (used on all main pages):

```text
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,500;0,8..60,600;0,8..60,700&display=swap
```

### 2.3 Type scale (global, `main.css`)

| Element | Notes |
|---------|--------|
| `body` | `14px`, `line-height: 1.55` |
| `h1` | `clamp(1.95rem, 2.8vw, 2.45rem)`, letter-spacing `-0.03em` |
| `h2` | `clamp(1.35rem, 2.1vw, 1.7rem)` |
| `h3` | `1.08rem` |
| `.eyebrow` | Uppercase, `0.68rem`, wide letter-spacing |
| Headings | `font-family: var(--font-serif)` |

### 2.4 Links

- Default links: `color: var(--color-accent)`; animated underline via `::after`.
- **`.link-button`** (home hero / 404): pill CTA; `::after` disabled so underline does not fight the pill shape.

---

## 3. Color system

All primary colors are defined on **`:root`** in `assets/css/main.css`. Prefer **variables** over hard-coded hex when extending UI.

### 3.1 Main (page) palette

| Token | Default | Role |
|-------|---------|------|
| `--color-bg` | `#e8e4de` | Page background base (warm cream) |
| `--color-surface` | `#f2efe8` | Cards, panels, “paper” (cream, not pure white) |
| `--color-surface-muted` | `#e2e8ee` | Tables, sidebars, soft blue-gray cream |
| `--color-text` | `#2a3140` | Primary text |
| `--color-muted` | `#6d6a66` | Secondary text |
| `--color-border` | `#d8d2c9` | Borders |
| `--color-accent` | `#3a5f78` | Links, accents (dusty blue) |
| `--color-accent-strong` | `#2d4c62` | Darker blue (buttons, active filters) |
| `--color-accent-soft` | `#e4ecf2` | Light blue tint for mixes / hovers |
| `--shadow-soft` | `0 12px 32px rgba(42, 49, 64, 0.08)` | Elevated shadows |

**Body background** (layered):

1. Radial: `#dde6ee` at top (soft cool highlight).
2. Linear: `#f0ebe4` → `var(--color-bg)` → `#e4e0d8`.

### 3.2 Header & footer

| Token | Default | Role |
|-------|---------|------|
| `--header-footer-bg` | `#2d4558` | Bar background (muted navy) |
| `--header-footer-text` | `#fffbf5` | Bright text on bar |
| `--header-footer-muted` | `rgba(255, 251, 245, 0.72)` | Nav / brand subtitle on bar |
| `--header-footer-border` | `rgba(255, 247, 235, 0.12)` | Bar borders |
| `--header-footer-accent` | `#c9dff0` | Underline / focus accents on bar |
| `--header-footer-pattern` | `url("../img/pattern-neural.svg")` | Tiled neural motif |

Pattern tile size on header/footer: **`background-size: 150px 150px`** (see `main.css`).

**Accessibility:** If `prefers-reduced-motion` or `prefers-contrast: high`, the header/footer **pattern image is disabled** (solid bar only).

### 3.3 Scrollbar layout

`html { scrollbar-gutter: stable; }` — reserves space for the vertical scrollbar so content does not shift when switching between short and long pages.

---

## 4. Layout & spacing

### 4.1 Container

- **`.container`**: `max-width: 960px`, horizontal padding `1.15rem`, centered.

### 4.2 Sections

- **`.section`**: vertical padding `2.35rem 0`.
- **`.section-header`**: `margin-bottom: 1.05rem`.

### 4.3 Header grid

- **`.header-inner`**: `display: grid`; `grid-template-columns: 1fr auto 1fr`.
- **Brand**: column 1, `justify-self: start`.
- **Nav**: column 2, `justify-self: center` (nav stays visually centered even with only two children—the third column is empty).
- **`< 600px`**: brand subtitle hidden; nav gaps slightly reduced.

### 4.4 Cards & grids

- **`.card-grid`**: 3 columns → 2 at `≤900px` → 1 at `≤640px`; gap `0.95rem`.
- **`.card`**: uses `--color-surface`, `--radius-md`, light border/shadow; hover lift `translateY(-1px)`.

---

## 5. Page-specific design notes

### 5.1 Home (`home.css` + `index.html`)

- **Hero**: two-column grid (`1.5fr` / `1.1fr`); stacks to one column `≤900px`.
- **Portrait**: `.portrait-frame` `max-width: 220px`, gradient border using accent + `--color-surface`.
- **Contact buttons**: `.hero-links` live **inside** `.hero-photo`, directly under the portrait; `max-width: 220px` to align with image width; desktop `align-items: flex-end` on `.hero-photo`.
- **Home-only brand**: `class="brand brand-hidden"` on index hides the header brand (visibility) while keeping grid space.
- **News**: see §6.

### 5.2 Research (`research.css`)

- Project cards reuse `.card` / `.project-grid`.
- Publications panel: radial background using `--color-surface`, `--color-surface-muted`, `--color-accent-soft`.
- Filter pills: active state uses gradient `--color-accent-strong` → `--color-accent`; label color `#f4f1eb`.

### 5.3 Teaching / About

- Teaching: course cards, `.table-wrapper` + `.course-table`, philosophy block.
- About: `.bio-grid` (main + sidebar), `.timeline`, `.journey-grid` (3 columns → responsive).

---

## 6. News (data + behavior)

### 6.1 File

`assets/data/news.json` — array of objects.

### 6.2 Fields

| Field | Required | Notes |
|-------|----------|--------|
| `date` | Yes | `YYYY-MM-DD` (day used for sort only; display is **month + year** via local parsing to avoid timezone off-by-one). |
| `title` | Yes | Headline |
| `description` | Optional | Body line under title |
| `link` | Optional | If non-empty, title becomes a link |
| `type` | Optional | Drives Font Awesome icon (see below) |

### 6.3 Display logic (`news.js`)

- **`INITIAL_COUNT = 10`**: newest ten shown first; rest in `.news-past` (hidden until expanded).
- **Sort**: descending by `date`.
- **Expand**: button “View past news (N)” toggles `.news-past.is-expanded`; label toggles to “Show less”.
- **Type icons** (Font Awesome 6, solid):

| `type` (lowercase) | Icon class | Meaning |
|--------------------|------------|---------|
| `paper` | `fa-scroll` | Paper |
| `grant` | `fa-hand-holding-dollar` | Grant |
| `talk` | `fa-microphone-lines` | Talk |
| `activity` | `fa-people-group` | Service, talks, and other professional activity (area chair, committees, etc.) |
| *other* | `fa-circle-dot` | Generic; `aria-label` / `title` = raw type string |

Icons sit in `.news-type-icon` at the right of each row.

---

## 7. Publications (data + behavior)

### 7.1 File

`assets/data/publications.json` — array of objects.

### 7.2 Typical fields

| Field | Role |
|-------|------|
| `year` | Grouping / sort |
| `title` | Linked if `links.paper` set |
| `authors` | Comma-separated; substring **“Jin Sun”** (case-insensitive) bolded in `publications.js` |
| `venue` | Shown in meta line |
| `kind` | `conference` \| `journal` \| `workshop` \| etc. — used by filter buttons |
| `links` | Optional: `paper`, `arxiv`, `code`, `project` |
| `tags` | Array of short strings |
| `highlight` | Optional boolean; adds highlight styling |

### 7.3 UI (`publications.js`)

- Filter buttons: `data-kind` `all` | `conference` | `journal` | `workshop`.
- Search box filters title, authors, venue, tags (client-side).
- Grouped by year, descending.

---

## 8. JavaScript utilities (`main.js`)

- **`#year`**: set to current calendar year.
- **`[data-copy-email]`** (e.g. Email button): copies attribute value to clipboard; shows “Copied!” briefly; falls back to `mailto:` if clipboard API fails.

No theme toggle (light-only design).

---

## 9. Neural header/footer pattern

- **Asset:** `assets/img/pattern-neural.svg` — gold nodes/lines on transparent background, **tiled** for a “network” look.
- **CSS path from `main.css`:** `url("../img/pattern-neural.svg")` (relative to `assets/css/`).

To change density or color, edit the SVG or adjust `--header-footer-pattern` / `background-size` on `.site-header` and `.site-footer`.

---

## 10. External assets

| Resource | Where loaded |
|----------|----------------|
| Google Fonts (DM Sans + Source Serif 4) | All main HTML pages |
| Font Awesome 6.5.1 (all.min.css) | `index.html` only (news icons) |

---

## 11. GitHub Pages notes

- Serve the repo root (or `docs/` if you move files) so paths like `assets/css/main.css` resolve from `/`.
- **`fetch`** for JSON requires **HTTP(S)** — opening `index.html` as `file://` will not load `news.json` / `publications.json` in most browsers. Use a local static server or push to Pages to preview data-driven sections.

---

## 12. Conventions for future edits

1. **New global color** → add or change a `:root` variable in `main.css`, then replace hard-coded values gradually.
2. **New page** → copy header/footer from an existing page; link `main.css` + optional page CSS; include the Google Fonts link.
3. **Tighter/looser layout** → start with `.container` max-width, `.section` padding, then page CSS.
4. **Accessibility** → keep semantic headings, `aria-label` on icon-only controls, visible `:focus-visible` styles (already on links and buttons).

---

*Last documented to match the repository state at authoring time. Update this file when you change tokens, behavior, or file structure.*
