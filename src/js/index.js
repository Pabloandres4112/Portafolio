document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("changing-text");
    const texts = ["Pablo", "Programador"];
    let currentIndex = 0;

    const changeText = () => {
        textElement.classList.remove("typewriter");
        setTimeout(() => {
            textElement.textContent = texts[currentIndex];
            textElement.classList.add("typewriter");
            currentIndex = (currentIndex + 1) % texts.length;
        }, 200);
    };

    changeText();
    setInterval(changeText, 3000);
});

function toggleSkillDetail(skillId) {
    const skillDetail = document.getElementById(skillId);
    
    // Verificar si el detalle de habilidad actualmente está visible
    const isVisible = window.getComputedStyle(skillDetail).display !== 'none';
    
    // Ocultar todos los detalles de habilidades
    const allSkills = document.querySelectorAll('.skill-detail');
    allSkills.forEach(skill => {
        skill.style.display = 'none';
    });
    
    // Mostrar el detalle de habilidad sólo si no estaba visible anteriormente
    if (!isVisible) {
        skillDetail.style.display = 'block';
    }
}

window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (window.scrollY > heroHeight) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

const numCircles = 20; // Número de círculos

const circlesContainer = document.getElementById('circles-container');

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    
    // Posiciones aleatorias
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    
    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;

    circlesContainer.appendChild(circle);
}

// Crear los círculos
for (let i = 0; i < numCircles; i++) {
    createCircle();
}


document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');

    // Iterar sobre cada enlace
    navLinks.forEach(function(link) {
        // Agregar un listener de click a cada enlace
        link.addEventListener('click', function(e) {
            // Prevenir el comportamiento predeterminado del enlace
            e.preventDefault();

            // Agregar la clase de animación al cuerpo
            document.body.classList.add('fade-out');

            // Obtener la URL de destino del enlace
            const href = this.getAttribute('href');

            // Esperar un breve momento para que se complete la animación de desvanecimiento
            setTimeout(function() {
                // Navegar a la nueva URL
                window.location.href = href;
            }, 800); // Ajusta el tiempo según la duración de tu animación CSS
        });
    });
});
