(() => {
  // Fade in the nav-bar brand name once the hero has scrolled past.
  const navBar = document.querySelector(".site-nav-bar");
  const hero = document.getElementById("top");
  if (!navBar || !hero) return;

  const onScroll = () => {
    const show = hero.getBoundingClientRect().bottom < 60;
    navBar.classList.toggle("is-scrolled", show);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
