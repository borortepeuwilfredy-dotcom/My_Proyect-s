let sealClicks = 0;

function clickSeal(event) {
    event.stopPropagation();
    const seal = document.getElementById('waxSeal');
    if (!seal || sealClicks >= 5) return;

    sealClicks++;
    seal.classList.remove('shake');
    void seal.offsetWidth;
    seal.classList.add('shake');
    spawnWaxParticles(event.clientX, event.clientY);

    if (sealClicks <= 4) {
        const crack = document.getElementById('crack' + sealClicks);
        if (crack) crack.style.opacity = '1';
        const heart = document.getElementById('sealHeart');
        if (heart) heart.style.opacity = String(1 - sealClicks * 0.25);
    }

    if (sealClicks === 5) {
        setTimeout(() => {
            const envelope = document.getElementById('envelope');
            if (envelope) envelope.classList.add('open');
            setTimeout(createExplosion, 600);
        }, 200);
    }
}

function spawnWaxParticles(x, y) {
    const container = document.body;
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.classList.add('wax-particle');
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const moveX = `${Math.random() * 80 - 40}px`;
        const moveY = `${Math.random() * 80 - 40}px`;

        p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${moveX}, ${moveY}) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 400 + 300,
            easing: 'ease-out',
            fill: 'forwards'
        });

        container.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

function createExplosion() {
    const colors = ['#ff7675', '#fd79a8', '#e84393', '#fbc531', '#9b59b6', '#ffffff'];
    const container = document.body;
    const envelope = document.getElementById('envelope');
    const rect = envelope ? envelope.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 10 + 12;
        const isHeart = Math.random() > 0.4;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        if (isHeart) {
            particle.innerHTML = `<svg width="${size}px" height="${size}px" viewBox="0 0 24 24" fill="${colors[Math.floor(Math.random() * colors.length)]}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        } else {
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '25%';
        }

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        const burstX = Math.random() * 600 - 300;
        const burstY = -(Math.random() * 120 + 100);
        const duration = Math.random() * 500 + 800;

        particle.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${burstX * 0.5}px, ${burstY * 0.45}px) scale(1.2) rotate(${Math.random() * 180}deg)`, opacity: 1, offset: 0.2 },
            { transform: `translate(${burstX}px, ${burstY}px) scale(1) rotate(${Math.random() * 540}deg)`, opacity: 0.85 }
        ], {
            duration,
            easing: 'cubic-bezier(0.15, 0.85, 0.4, 1)',
            fill: 'forwards'
        });

        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration + 300);
    }

    setTimeout(createSnowfall, 900);
}

function createSnowfall() {
    const colors = ['#ffffff', '#f8f4f0', '#ffeef2', '#ffe0df'];
    const container = document.body;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < 70; i++) {
        const delay = Math.random() * 1200;
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 12 + 14;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * screenWidth}px`;
            particle.style.top = `${-size - Math.random() * 80}px`;
            particle.style.opacity = '0.85';

            const driftX = Math.random() * 240 - 120;
            const duration = Math.random() * 1800 + 5200;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.85 },
                { transform: `translate(${driftX}px, ${screenHeight + size + 50}px) scale(1)`, opacity: 0.2 }
            ], {
                duration,
                easing: 'linear',
                fill: 'forwards'
            });

            container.appendChild(particle);
            setTimeout(() => particle.remove(), duration + 500);
        }, delay);
    }
}

