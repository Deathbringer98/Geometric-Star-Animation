document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numStars = 50;
    const stars = [];
    const lines = [];
    const maxLineLength = 200;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    function distance(star1, star2) {
        return Math.sqrt((star1.x - star2.x) ** 2 + (star1.y - star2.y) ** 2);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        lines.length = 0;

        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                if (distance(stars[i], stars[j]) < maxLineLength) {
                    lines.push([stars[i], stars[j]]);
                }
            }
        }

        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line[0].x, line[0].y);
            ctx.lineTo(line[1].x, line[1].y);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        });

        stars.forEach(star => {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
            if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
        });

        requestAnimationFrame(draw);
    }

    draw();
});
