// Serena's Birthday Website Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Counter Logic
    const startDate = new Date('2025-09-10T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    if (document.getElementById('days')) {
        setInterval(updateCounter, 1000);
        updateCounter();
    }

    // 2. Scroll Reveal Logic
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 3. Music Control
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');
    let isPlaying = false;

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '🎵';
            } else {
                bgMusic.play().catch(e => console.log("Auto-play prevented, waiting for interaction"));
                musicBtn.innerHTML = '⏸️';
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. Secret Section
    const secretTrigger = document.getElementById('secret-trigger');
    const secretContent = document.getElementById('secret-content');

    if (secretTrigger) {
        secretTrigger.addEventListener('click', () => {
            secretContent.style.display = 'block';
            secretContent.scrollIntoView({ behavior: 'smooth' });
            secretTrigger.style.display = 'none';
        });
    }
});
