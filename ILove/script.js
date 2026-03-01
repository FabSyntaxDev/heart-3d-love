const heartContainer = document.getElementById('heart-container');
const particlesContainer = document.getElementById('particles-container');

function createHeart() {
    const text = "I Love You";
    const totalWords = 150; // Increased for better volume
    const radius = 220;

    for (let i = 0; i < totalWords; i++) {
        const angle = (i / totalWords) * 2 * Math.PI;

        // Parametric heart equation
        // x = 16 sin^3(t)
        // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)

        const x = 16 * Math.pow(Math.sin(angle), 3);
        const y = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

        const word = document.createElement('span');
        word.className = 'heart-word';
        word.innerText = text;

        // Scale the coordinates
        const posX = x * (radius / 16);
        const posY = y * (radius / 16);

        // Add random Z depth to make it look volumetric
        const posZ = (Math.random() - 0.5) * 60;

        word.style.left = `calc(50% + ${posX}px)`;
        word.style.top = `calc(50% + ${posY}px)`;
        // We set the base position with translate3d, but the animation will handle the rotation
        word.style.transform = `translate3d(-50%, -50%, ${posZ}px)`;

        // Staggered appearance
        word.style.animation = `fadeIn 1s ease forwards`; // Removed delay from here
        word.style.animationDelay = `${i * 0.01}s, 0s`; // First for fadeIn, second for counterRotate (which we'll handle in CSS)

        heartContainer.appendChild(word);
    }
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Add keyframes for fadeIn dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

createHeart();
createParticles();
