const departure = new Date('2026-09-23T04:50:00+05:30').getTime();
const countdownNodes = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes')
};

function updateCountdown() {
  const remaining = Math.max(0, departure - Date.now());
  const totalMinutes = Math.floor(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  countdownNodes.days.textContent = String(days).padStart(2, '0');
  countdownNodes.hours.textContent = String(hours).padStart(2, '0');
  countdownNodes.minutes.textContent = String(minutes).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 60000);

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

const checklist = [...document.querySelectorAll('.checklist input')];
const progressLabel = document.querySelector('#progress-label');
function updateProgress() {
  const packed = checklist.filter((item) => item.checked).length;
  progressLabel.textContent = `${packed} / ${checklist.length} packed`;
}
checklist.forEach((item) => item.addEventListener('change', updateProgress));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const header = document.querySelector('.site-header');
let ticking = false;
function updateScrollState() {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 24);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && scrollY < window.innerHeight) {
    document.documentElement.style.setProperty('--parallax', `${scrollY * 0.35}px`);
    document.querySelector('.hero-copy').style.opacity = String(Math.max(0.35, 1 - scrollY / (window.innerHeight * 0.9)));
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState);
    ticking = true;
  }
}, { passive: true });
updateScrollState();

if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.experience-card, .gallery-tile, .photo-frame').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
      card.style.setProperty('--tilt-x', `${x}deg`);
      card.style.setProperty('--tilt-y', `${y}deg`);
      card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
