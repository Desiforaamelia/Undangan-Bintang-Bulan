document.addEventListener('DOMContentLoaded', function () {
    const btnOpen = document.getElementById('open-invitation');
    const coverSection = document.querySelector('.cover-section');
    const mainContent = document.getElementById('main-content');
    const btnMusic = document.getElementById('btn-music');
    const bgMusic = document.getElementById('bg-music');
    const rsvpForm = document.getElementById('rsvp-form');

    const weddingDate = new Date('december 28, 2025 08:00:00').getTime();


    if (btnOpen) {
        btnOpen.addEventListener('click', openInvitation);
    }

    if (btnMusic && bgMusic) {
        btnMusic.addEventListener('click', toggleMusic);
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVP);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });


    function openInvitation() {
        coverSection.classList.add('open');
        mainContent.classList.remove('hidden');

        if (bgMusic) {
            bgMusic.play().catch(error => {
                console.log('Autoplay prevented by browser:', error);
            });
        }

        const sections = document.querySelectorAll('section:not(.cover-section)');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('fade-in');
            }, index * 300);
        });
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play();
            btnMusic.classList.remove('paused');
        } else {
            bgMusic.pause();
            btnMusic.classList.add('paused');
        }
    }

    function handleRSVP(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const message = document.getElementById('message').value;

        alert(`Terima kasih, ${name}! RSVP Anda telah diterima. ${attendance === 'yes' ? 'Kami menantikan kehadiran Anda!' : 'Kami akan merindukan Anda di perayaan kami.'}`);

        rsvpForm.reset();
    }

    function handleSmoothScroll(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = formatTime(days);
        document.getElementById('hours').innerText = formatTime(hours);
        document.getElementById('minutes').innerText = formatTime(minutes);
        document.getElementById('seconds').innerText = formatTime(seconds);

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});
