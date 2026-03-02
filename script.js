// Serena's Final Narrative Masterpiece Logic

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Logic (Slide System)
    const slides = document.querySelectorAll('.slide');
    const nextBtns = document.querySelectorAll('.next-btn');
    const giftBtn = document.getElementById('gift-btn');
    let currentSlide = 0;

    function goToSlide(index) {
        if (index >= slides.length) return;

        // Handle outgoing slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');

        // Handle incoming slide
        currentSlide = index;
        slides[currentSlide].classList.remove('prev');
        slides[currentSlide].classList.add('active');

        // Scroll to top of the new slide (important for mobile)
        slides[currentSlide].scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (currentSlide === 0) {
                // Emotional transition starts music
                toggleMusic(true);
                document.body.classList.add('story-started');
            }
            goToSlide(currentSlide + 1);
        });
    });

    if (giftBtn) {
        giftBtn.addEventListener('click', () => {
            const password = prompt("Notre mots de passe :");
            if (password === "100925") {
                goToSlide(currentSlide + 1);
            } else {
                alert("Ce n'est pas le bon mot de passe... Petit indice : notre date spéciale.");
            }
        });
    }

    // 2. Counter Logic (Since 2025-09-10)
    const startDate = new Date('2025-09-10T00:00:00');
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const daysEl = document.getElementById('days');
        if (daysEl) daysEl.innerText = days;
    }
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
                this.size = Math.random() * 15 + 10;
                this.speed = Math.random() * 1.8 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.swing = Math.random() * 3;
                this.swingStep = 0;
            }
            update() {
                this.y -= this.speed;
                this.swingStep += 0.01;
                this.x += Math.sin(this.swingStep) * this.swing;
                if (this.y < -50) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(255, 154, 158, ${this.opacity})`;
                ctx.font = `${this.size}px serif`;
                ctx.fillText('❤', this.x, this.y);
            }
        }

        for (let i = 0; i < 25; i++) hearts.push(new Heart());

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

    // 4. Robust Music Logic
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    function toggleMusic(forcePlay = false) {
        if (!isMusicPlaying || forcePlay) {
            // Set start time to 24 seconds on first play
            if (music.currentTime === 0) {
                music.currentTime = 20.0;
            }
            music.play().then(() => {
                isMusicPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerText = '⏸️';
            }).catch(e => console.log("Audio blocked by browser, waiting for more interaction."));
        } else {
            music.pause();
            isMusicPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.innerText = '🎵';
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }

    // Initial check for counter in case it's on a later slide
    updateCounter();
});
