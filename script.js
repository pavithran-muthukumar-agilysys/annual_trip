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
