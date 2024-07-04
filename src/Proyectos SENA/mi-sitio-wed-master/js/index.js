document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.querySelector('.rain');
    const numDrops = 100;

    for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        rainContainer.appendChild(drop);
    }

    const thunder = document.createElement('div');
    thunder.classList.add('thunder');
    document.body.appendChild(thunder);

    function flashThunder() {
        thunder.style.display = 'block';
        thunder.style.animation = 'flash 0.5s ease-in-out';
        setTimeout(() => {
            thunder.style.display = 'none';
            thunder.style.animation = '';
        }, 500);
    }

    function randomThunder() {
        const time = Math.random() * 10000 + 5000; // De 5 a 15 segundos
        setTimeout(() => {
            flashThunder();
            randomThunder();
        }, time);
    }

    randomThunder();
});
