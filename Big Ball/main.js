const ball = document.querySelector('.ball');
const perkSpace = document.querySelector('.perks');
const scoreCard = document.querySelector('.scoreCard');
const areas = document.querySelectorAll('.area');

let leftPush = 0;

let t = 0;
let hDir = 2;
let vDir = 3;
let score = 0;


function updateScore() {
  scoreCard.innerHTML = Math.round(score);

  if (score < -15 || ball.offsetHeight < 30) {
    alert(Math.round(score));
    score = 0;
    ball.style.height = '70px';
    ball.style.width = '70px';
    perkSpace.replaceChildren();
  }
}

// ball motion
function update(position) {
  // Vertical
  const g = 0.35;
  const restitution = 1;
  const h = window.innerHeight - ball.offsetHeight;

  t += g;

  ball.style.top = `${position.top + t}px`;

  if (position.top > h) {
    ball.style.top = `${h}px`;
    t *= -restitution;
  }

  if (position.top < 0) {
    ball.style.top = `0px`;
    t *= -1;
  }

  // Horizontal

  const m = 5;
  const w = window.innerWidth - ball.offsetWidth;

  const horizontalStep = 0.9 * m;


  if (position.left <= w && hDir == 2) {
    ball.style.left = `${leftPush + position.left + horizontalStep}px`;
  } else if (position.left >= w) {
    hDir = 4;
    ball.style.left = `${position.left - horizontalStep}px`;
  } else if (position.left < 0) {
    hDir = 2;
  } else if (position.left < w && hDir == 4) {
    ball.style.left = `${position.left + leftPush - horizontalStep}px`;
  }

  console.log(position.left, w)
  leftPush = 0;
}

//perks update
function perksUpdate(position) {
  const greens = document.querySelectorAll('.greens');
  const reds = document.querySelectorAll('.reds');
  [...greens, ...reds].forEach((p) => {
    pPos = p.getBoundingClientRect();
    const toRemove = new Set();
    if ((((position.right + position.left) / 2) < pPos.right) && (((position.right + position.left) / 2) > pPos.left) && (position.bottom > 615)) {
      toRemove.add(p);
    }
    toRemove.forEach((e) => {
      if (p.classList.contains('greens')) {
        score += 5;
        ball.style.height = `${ball.offsetHeight + 5}px`;
        ball.style.width = `${ball.offsetWidth + 5}px`;
      } else {
        score -= 3;
        ball.style.height = `${ball.offsetHeight - 5}px`;
        ball.style.width = `${ball.offsetWidth - 5}px`;
      }
      perkSpace.removeChild(e);
    });
    toRemove.clear();
  });
}

//clicks
areas.forEach((area) => {
  area.addEventListener('click', () => {
    if (area.classList.contains('leftArea')) {
      leftPush = -50;
    } else {
      leftPush = 50;
    }
  });
});

//keys
let lastPressTime = 0;
const interval = 300;

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const now = Date.now();

  if (now - lastPressTime < interval) return;

  if (event.key === 'ArrowLeft') {
    leftPush = -50;
    lastPressTime = now;
  } else if (event.key === 'ArrowRight') {
    leftPush = 50;
    lastPressTime = now;
  }
});

//perks spawn
setInterval(() => {
  score += 1 / 100;
  const position = ball.getBoundingClientRect();
  update(position);
  perksUpdate(position);
  updateScore();
}, 10);

setInterval(() => {
  const perk = document.createElement('span');
  if (Math.random() < 0.5) {
    perk.classList.add('greens');
  } else {
    perk.classList.add('reds');
  }
  perk.style.left = `${97*Math.random()}%`;
  perkSpace.appendChild(perk);

  setTimeout(() => {
    if (perk.parentNode === perkSpace) {
      perkSpace.removeChild(perk);
    }
  }, 10000);
}, 2000 - score);

console.log(position)