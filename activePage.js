document.addEventListener('DOMContentLoaded', () => {
  const activePage = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach((link) => {
    if (link.href.includes(activePage)) {
      link.classList.add('active');
    }
  });
});

// Scroll boxes (skills, projects): show a hint while there is more to read,
// and drop the bottom fade once the end is reached.
document.addEventListener('DOMContentLoaded', () => {
  const hintText = document.documentElement.lang === 'it' ? 'Scorri per vedere altro ↓' : 'Scroll for more ↓';

  document.querySelectorAll('.ColText .ScrollArea').forEach((area) => {
    const box = area.closest('.ColText');
    const hint = document.createElement('div');
    hint.className = 'ScrollHint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = hintText;
    box.appendChild(hint);

    const update = () => {
      const canScroll = area.scrollHeight > area.clientHeight + 2;
      const atEnd = area.scrollTop + area.clientHeight >= area.scrollHeight - 4;
      box.classList.toggle('can-scroll', canScroll);
      box.classList.toggle('is-at-end', !canScroll || atEnd);
    };

    area.addEventListener('scroll', () => {
      if (area.scrollTop > 10) box.classList.add('has-scrolled');
      update();
    }, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });
});
