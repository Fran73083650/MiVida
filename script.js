document.addEventListener('DOMContentLoaded', function() {
    const initialButton = document.querySelector('.big-button');
    const initialContainer = document.getElementById('initialButton');
    const mainContent = document.getElementById('mainContent');
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    initialButton.addEventListener('click', function() {
        // Ocultar el botón inicial con una animación de desvanecimiento
        initialContainer.style.opacity = '0';
        
        // Mostrar el contenido principal
        setTimeout(() => {
            initialContainer.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Intentar reproducir la música
            music.volume = 0.5;
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Reproducción exitosa");
                    musicToggle.style.display = "none";
                }).catch(error => {
                    console.log("Reproducción prevenida:", error);
                    music.pause();
                    musicToggle.style.display = "block";
                    musicToggle.classList.add('muted');
                });
            }
            
            // Iniciar el efecto de máquina de escribir
            typeWriter();
            
            // Iniciar los corazones flotantes
            setInterval(createFloatingHearts, 800);
        }, 500);
    });

    // Control de música
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicToggle.classList.remove('muted');
        } else {
            music.pause();
            musicToggle.classList.add('muted');
        }
    });
});
// Efecto de máquina de escribir
const text = "💗Para la mujer más hermosa del mundo💗";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typingText").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Controla la velocidad de aparición
    }
}

// Control de la música - múltiples estrategias para asegurar autoplay
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Función para intentar reproducir la música
    function tryPlayMusic() {
        music.volume = 0.5;
        music.muted = false;
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Autoplay successful");
                musicToggle.style.display = "none"; // Ocultar el botón si la reproducción automática funciona
            }).catch(error => {
                console.log("Autoplay prevented:", error);
                music.pause();
                musicToggle.style.display = "block"; // Mostrar el botón si la reproducción automática falla
                musicToggle.classList.add('muted');
            });
        }
    }
    
    // Primer intento de reproducción
    tryPlayMusic();
    
    // Intentar reproducir en varios eventos de usuario comunes
    const userEvents = ['click', 'touchstart', 'keydown', 'scroll'];
    
    function onUserInteraction() {
        if (music.paused) {
            tryPlayMusic();
        }
        
        // Remover los event listeners después del primer uso exitoso
        userEvents.forEach(event => {
            document.removeEventListener(event, onUserInteraction);
        });
    }
    
    // Agregar event listeners para detectar interacción del usuario
    userEvents.forEach(event => {
        document.addEventListener(event, onUserInteraction, { once: true });
    });
    
    // Añadir evento al botón para controlar la música (si aparece)
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicToggle.classList.remove('muted');
        } else {
            music.pause();
            musicToggle.classList.add('muted');
        }
    });
    
    // Iniciar el efecto de máquina de escribir
    typeWriter();
});

// Carrusel de imágenes con cambio automático y frases románticas
let index = 0;
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const romanticTexts = [
    ["💗 Eres mi felicidad 💗", "✨ Te amo cada día más ✨"],
    ["💕 Gracias por estar a mi lado 💕", "💘 Eres lo mejor que me pasó 💘"],
    ["💖 Mi amor por ti es infinito 💖", "🌸 Eres mi persona favorita 🌸"]
];

const leftText = document.querySelector('.left-text');
const rightText = document.querySelector('.right-text');

function showSlide() {
    if (slides) {
        // Multiplicamos por el ancho exacto del contenedor
        const offset = window.innerWidth <= 400 ? 280 : 300;
        slides.style.transform = `translateX(${-index * offset}px)`;

        // Cambiar los textos románticos con una animación de aparición
        leftText.style.opacity = 0;
        rightText.style.opacity = 0;

        setTimeout(() => {
            leftText.textContent = romanticTexts[index][0];
            rightText.textContent = romanticTexts[index][1];
            leftText.style.opacity = 1;
            rightText.style.opacity = 1;
        }, 500);
    }
}

function nextSlide() {
    if (images.length > 0) {
        index = (index + 1) % images.length;
        showSlide();
    }
}

// Cambio automático cada 3 segundos
setInterval(nextSlide, 3000);

// Mostrar el primer slide correctamente
showSlide();

// Función para crear corazones flotantes
function createFloatingHearts() {
    // Crear elemento para el corazón
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Posición inicial aleatoria en toda la pantalla
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    
    // Tamaño aleatorio más grande
    const size = Math.random() * 25 + 15; // Entre 15px y 40px
    heart.style.fontSize = `${size}px`;
    
    // Color aleatorio (tonos rosados y celestes)
    const colors = [
        '#ff99cc', '#ff66b3', '#ff3399', 
        '#66ccff', '#99ddff', '#cceeff',
        '#ffb3d9', '#80bfff'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.color = randomColor;
    
    // Contenido del corazón (emojis variados)
    const heartSymbols = ['❤️', '💕', '💗', '💓', '💖', '💝', '💘', '💞'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Añadir al body
    document.body.appendChild(heart);
    
    // Animación de movimiento y desaparición
    const animationDuration = Math.random() * 5 + 5; // 5-10 segundos
    
    // Dirección aleatoria para el movimiento
    const direction = Math.floor(Math.random() * 4); // 0-3 para diferentes direcciones
    let animation;
    
    switch(direction) {
        case 0: // Arriba
            animation = `floatHeartUp ${animationDuration}s ease-in-out`;
            break;
        case 1: // Derecha
            animation = `floatHeartRight ${animationDuration}s ease-in-out`;
            break;
        case 2: // Abajo
            animation = `floatHeartDown ${animationDuration}s ease-in-out`;
            break;
        case 3: // Izquierda
            animation = `floatHeartLeft ${animationDuration}s ease-in-out`;
            break;
    }
    
    heart.style.animation = animation;
    
    // Eliminar el corazón después de la animación
    setTimeout(() => {
        heart.remove();
    }, animationDuration * 1000);
}

// Crear corazones periódicamente
setInterval(createFloatingHearts, 800);