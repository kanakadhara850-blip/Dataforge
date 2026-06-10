const canvas = document.getElementById("sparkle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 6; i++) {
        particles.push({
            x: mouse.x,
            y: mouse.y,
            size: Math.random() * 6 + 2,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            alpha: 1
        });
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.02;

        ctx.beginPath();

        const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size
        );

        gradient.addColorStop(0, `rgba(0,255,255,${p.alpha})`);
        gradient.addColorStop(1, `rgba(123,47,255,0)`);

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
