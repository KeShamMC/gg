const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');
menuBtn.addEventListener('click', () => navList.classList.toggle('open'));

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
reveals.forEach((el) => io.observe(el));

const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((0.5 - y / rect.height)) * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});

const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 10)) }, () => ({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    r: Math.random() * 1.8 + 0.2,
    spd: Math.random() * 0.35 + 0.05
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(165, 219, 255, 0.85)';
    ctx.fill();

    s.y += s.spd;
    if (s.y > starsCanvas.height + 5) {
      s.y = -5;
      s.x = Math.random() * starsCanvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateStars();
