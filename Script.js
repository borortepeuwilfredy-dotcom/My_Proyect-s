let clickCount = 0;
const messages = [
    "NO PRESIONAR",
    "¿En serio lo vas a presionar?",
    "Te dije que no...",
    "¡Oye, detente! 🛑",
    "Bueno, tú lo buscaste..."
];

function handleInteractionMode() {
    const btn = document.getElementById('actionBtn');
    clickCount++;

    if (clickCount < messages.length) {
        btn.innerText = messages[clickCount];
        if (clickCount === 3) btn.style.backgroundColor = '#e67e22';
        if (clickCount === 4) btn.style.backgroundColor = '#2ecc71';
    } else {
        document.getElementById('clickSection').style.display = 'none';
        const giftCard = document.getElementById('giftCard');
        giftCard.classList.add('show');
        document.body.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
        startConfetti();
    }
}

function startConfetti() {
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#9b59b6', '#2ecc71', '#ffffff'];
    const container = document.body;

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = (Math.random() * 8 + 5) + 'px';
        confetti.style.height = (Math.random() * 8 + 5) + 'px';
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';
        container.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}
