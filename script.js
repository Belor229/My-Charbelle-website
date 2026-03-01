// Serena's Mobile Interactive Narrative Logic

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Logic (Slide System)
    const slides = document.querySelectorAll('.slide');
    const nextBtns = document.querySelectorAll('.next-btn');
    const giftBtn = document.getElementById('gift-btn');
    let currentSlide = 0;

    function goToSlide(index) {
        if (index >= slides.length) return;

        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');

        currentSlide = index;
        slides[currentSlide].classList.add('active');
    }

    nextBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            // Play music on first click if not playing
            if (currentSlide === 0) {
                tryStartMusic();
            }
            goToSlide(currentSlide + 1);
        });
    });

    if (giftBtn) {
        giftBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // 2. Counter Logic (Since 2025-09-10)
    const startDate = new Date('2025-09-10T00:00:00');
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours;
    }
    setInterval(updateCounter, 1000 * 60); // Update every minute is enough for h/d
    updateCounter();

    // 3. Heart Animation Engine (Canvas)
    const canvas = document.getElementById('heart-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let hearts = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Heart {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.size = Math.random() * 15 + 5;
                this.speed = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.swing = Math.random() * 2;
                this.swingStep = 0;
            }
            update() {
                this.y -= this.speed;
                this.swingStep += 0.02;
                this.x += Math.sin(this.swingStep) * this.swing;
                if (this.y < -50) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(255, 154, 158, ${this.opacity})`;
                ctx.font = `${this.size}px serif`;
                ctx.fillText('❤', this.x, this.y);
            }
        }

        for (let i = 0; i < 20; i++) hearts.push(new Heart());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            hearts.forEach(h => {
                h.update();
                h.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 4. Music Logic
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let musicPlaying = false;

    function tryStartMusic() {
        if (!musicPlaying) {
            music.play().then(() => {
                musicPlaying = true;
                musicBtn.innerText = '⏸️';
            }).catch(() => {
                console.log("Music auto-play blocked");
            });
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (musicPlaying) {
                music.pause();
                musicBtn.innerText = '🎵';
            } else {
                music.play();
                musicBtn.innerText = '⏸️';
            }
            musicPlaying = !musicPlaying;
        });
    }
});
