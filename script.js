(() => {
  const root = document.documentElement;

  // Theme toggle (remembers choice)
  const isDark = () =>
    root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  document.getElementById('theme').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#0e1118' : '#eef1f5';
  });

  // Copy email
  const copy = document.getElementById('copy');
  copy.addEventListener('click', async () => {
    const email = document.getElementById('mail').textContent.trim();
    try { await navigator.clipboard.writeText(email); copy.textContent = 'Copied'; }
    catch (e) { copy.textContent = 'Press Ctrl+C on the address'; }
    setTimeout(() => (copy.textContent = 'Copy email'), 2000);
  });

  // Highlight current section in the nav
  const links = [...document.querySelectorAll('.nav a')];
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('on'));
        map.get(e.target.id)?.classList.add('on');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Hide the portrait gracefully if the image is missing
  const img = document.querySelector('.avatar');
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
