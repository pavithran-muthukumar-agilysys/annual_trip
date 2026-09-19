const departure = new Date('2026-09-23T09:55:00+05:30').getTime();
const firstFlightTime = document.querySelector('.day-one .time');
if (firstFlightTime) firstFlightTime.textContent = '09:55';
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

const spocGroups = [
  { name: 'Vijay Masilamani', phone: '919003385247', pnr: 'CPX5LJ', members: ['Vignesh Ashokkumar', 'Pon Madhavan', 'Divya Damodaran', 'Vijay Masilamani', 'Balajiraj Nagarajan', 'Swetha Ravi', 'Saanthasheelan Sankaran', 'Vinodh Kumar'] },
  { name: 'Suriyakumar Jayavel', phone: '918012194050', pnr: 'EG7HYT', members: ['Hariseshan Kandan', 'Korlapati Srikanth', 'Lakshman Raj', 'Palannagari Jyothi', 'Rajasekaran Ellappan', 'Suriyakumar Jayavel', 'Tinuranjen Thirumalairajan', 'Vicknesh Rajan'] },
  { name: 'Jeevarathinam Thangaraj', phone: '917868802151', pnr: 'EFPEKV', members: ['Manickavasagam Muthaiya', 'Sathish Kumar Chellamuthu', 'Balakrishnan Nambirajan', 'Jeevarathinam Thangaraj', 'Gugan Elumalai', 'Prasanna Pothiraju', 'Sriram Natarajasundaram', 'Sripradosh Chandrasekar'] },
  { name: 'Namritha Muthukumaran', phone: '919385300978', pnr: 'EG3DFI', members: ['Bala Baskar', 'Diwakar Venkatesan', 'Vishali Muthukumaran', 'Namritha Muthukumaran', 'Kanishkar', 'Ganapathi Arumugam', 'Kiruba Sangaree', 'Yuvan Kumar Senthil Kumar'] },
  { name: 'Srinath Elumalai', phone: '919442360192', pnr: 'CQCH4L', members: ['Bhagavathkrishna Thangasamy', 'Sathivictor Premkumar', 'Madhumitha Rambert', 'Srinath Elumalai', 'Indrakumar Patturajan', 'Akilan Asaithambi', 'Arjun Hariprasad', 'Santhoshkumar Sundaresan'] },
  { name: 'Krithika Manokaran', phone: '919841566336', pnr: 'mixed PNRs', members: ['Balaji Meenachiayyan · 8JOEQO-01', 'Arun Chandrasekar · 8JOEQO-02', 'Bhavin Daiya · 8JOEQO-03', 'Pavithran Muthu Kumar · 8JOEQO-04', 'Krithika Manokaran · 8LGGA5-05', 'Prasanth Kumar · 8LYZDM-06', 'Vignash Raveendaran · 8LCHN7-07', 'Yuvaraj Ravi · 8LCHN7-08'] }
];

const spocPanel = document.querySelector('.spoc-panel');
if (spocPanel) {
  spocPanel.innerHTML = '<div class="spoc-heading"><span class="detail-icon">S</span><div><b>SPOC &amp; members</b><p>Choose a group to see its passenger directory</p></div><div class="spoc-meta"><span>6 groups</span><span>48 travelers</span><span>Live roster</span></div></div><div class="spoc-tools"><span class="spoc-results">Showing 6 groups</span><input class="spoc-search" type="search" placeholder="Search a group or member" aria-label="Search SPOC groups and members" /></div><div class="spoc-groups"></div><small class="spoc-note">WhatsApp connects to the SPOC head. Ticket references are adapted from the shared itinerary.</small>';
}

if (spocPanel) {
  document.querySelector('.logistics-grid').appendChild(spocPanel);
}

if (spocPanel) {
  spocPanel.id = 'spoc';
  const rosterGrid = spocPanel.querySelector('.spoc-groups');
  const dialog = document.createElement('dialog');
  let selectedGroup = spocGroups[0];
  rosterGrid.className = 'spoc-coins';
  rosterGrid.innerHTML = spocGroups.map((group, groupIndex) => {
    const initials = group.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
    const memberSearchText = group.members.join(' ');
    return `<button class="spoc-group spoc-coin" type="button" data-group-index="${groupIndex}"><span class="spoc-coin-mark">${initials}</span><strong>${group.name}</strong><small>${group.pnr}</small><span class="sr-only">${memberSearchText}</span></button>`;
  }).join('');
  const searchInput = spocPanel.querySelector('.spoc-search');
  const resultLabel = spocPanel.querySelector('.spoc-results');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleGroups = 0;
    rosterGrid.querySelectorAll('.spoc-coin').forEach((coin) => {
      const matches = coin.textContent.toLowerCase().includes(query);
      coin.hidden = !matches;
      coin.classList.toggle('search-match', Boolean(query && matches));
      if (matches) visibleGroups += 1;
    });
    resultLabel.textContent = `Showing ${visibleGroups} group${visibleGroups === 1 ? '' : 's'}`;
  });
  dialog.className = 'group-dialog';
  dialog.innerHTML = '<div class="group-dialog-card"><button class="dialog-close" type="button" aria-label="Close group members">×</button><div class="dialog-kicker">Your travel group</div><div class="dialog-title"><span class="dialog-avatar"></span><div><h3></h3><p></p></div></div><div class="dialog-actions"><a class="dialog-whatsapp" target="_blank" rel="noreferrer">Connect on WhatsApp</a></div><ol class="dialog-members"></ol></div>';
  spocPanel.appendChild(dialog);
  spocPanel.querySelector('.spoc-note').insertAdjacentHTML('beforebegin', '<button class="know-group" type="button">Know your group <span aria-hidden="true">↗</span></button>');

  const showGroup = (group) => {
    selectedGroup = group;
    const initials = group.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
    dialog.querySelector('.dialog-avatar').textContent = initials;
    dialog.querySelector('h3').textContent = group.name;
    dialog.querySelector('.dialog-title p').textContent = `${group.members.length} travelers · ${group.pnr}`;
    dialog.querySelector('.dialog-whatsapp').href = `https://wa.me/${group.phone}`;
    dialog.querySelector('.dialog-members').innerHTML = group.members.map((member, memberIndex) => { const memberParts = member.split(' · '); const memberName = group.pnr === 'mixed PNRs' ? memberParts[0] : member; const memberTicket = group.pnr === 'mixed PNRs' ? memberParts[1] : `${group.pnr}-${String(memberIndex + 1).padStart(2, '0')}`; return `<li><span>${memberName}</span><small>${memberTicket}</small></li>`; }).join('');
    dialog.showModal();
  };

  rosterGrid.querySelectorAll('.spoc-coin').forEach((coin) => {
    coin.addEventListener('click', () => showGroup(spocGroups[Number(coin.dataset.groupIndex)]));
  });
  spocPanel.querySelector('.know-group').addEventListener('click', () => showGroup(selectedGroup));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
