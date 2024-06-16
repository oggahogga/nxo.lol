document.addEventListener('DOMContentLoaded', function() {
    const starsCanvas = document.getElementById('stars');
    const starsCtx = starsCanvas.getContext('2d');
    let width, height, stars = [];

    function init() {
        resizeCanvas();
        createStars();
        animateStars();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        starsCanvas.width = width;
        starsCanvas.height = height;
        createStars();
    }

    function createStars() {
        stars = [];
        const starCount = (width * height) / 20000; // Reduced star count
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6, // Slightly faster initial velocity
                vy: (Math.random() - 0.5) * 0.6, // Slightly faster initial velocity
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    function animateStars() {
        starsCtx.clearRect(0, 0, width, height);
        drawStars();
        requestAnimationFrame(animateStars);
    }

    function drawStars() {
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.x += star.vx;
            star.y += star.vy;

            // Wrap-around effect (like Pac-Man)
            if (star.x < 0) star.x += width;
            if (star.x > width) star.x -= width;
            if (star.y < 0) star.y += height;
            if (star.y > height) star.y -= height;

            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fillStyle = 'white';
            starsCtx.fill();
        }
        connectAndOrbitStars();
    }

    function connectAndOrbitStars() {
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    // Draw connection line
                    drawConnection(stars[i], stars[j], distance);

                    // Apply reduced gravitational-like force for orbit effect
                    const force = (100 - distance) / 50000; // Reduced force for gentler pull
                    const ax = force * dx / distance;
                    const ay = force * dy / distance;

                    stars[i].vx -= ax * stars[j].radius / stars[i].radius;
                    stars[i].vy -= ay * stars[j].radius / stars[i].radius;
                    stars[j].vx += ax * stars[i].radius / stars[j].radius;
                    stars[j].vy += ay * stars[i].radius / stars[j].radius;
                }
            }
        }
    }

    function drawConnection(star1, star2, distance) {
        starsCtx.beginPath();
        starsCtx.moveTo(star1.x, star1.y);
        starsCtx.lineTo(star2.x, star2.y);
        starsCtx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
        starsCtx.stroke();

        // Wrap-around connections
        const dx = star2.x - star1.x;
        const dy = star2.y - star1.y;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        if (Math.abs(dx) > halfWidth || Math.abs(dy) > halfHeight) {
            if (Math.abs(dx) > halfWidth) {
                drawWrappedLine(star1, star2, dx > 0 ? width : -width, 0);
            }
            if (Math.abs(dy) > halfHeight) {
                drawWrappedLine(star1, star2, 0, dy > 0 ? height : -height);
            }
        }
    }

    function drawWrappedLine(star1, star2, xOffset, yOffset) {
        starsCtx.beginPath();
        starsCtx.moveTo(star1.x, star1.y);
        starsCtx.lineTo(star2.x + xOffset, star2.y + yOffset);
        starsCtx.strokeStyle = `rgba(255, 255, 255, ${1 - Math.sqrt(xOffset * xOffset + yOffset * yOffset) / 100})`;
        starsCtx.stroke();
    }

    init();

    const nlCanvas = document.getElementById('northern-lights');
    const nlCtx = nlCanvas.getContext('2d');
    nlCanvas.width = window.innerWidth;
    nlCanvas.height = 200; // Reduced height

    const lights = [];
    const lightCount = 8;
    for (let i = 0; i < lightCount; i++) {
        lights.push({
            x: i * (nlCanvas.width / lightCount) + (Math.random() * (nlCanvas.width / lightCount)),
            y: Math.random() * nlCanvas.height / 2,
            width: Math.random() * 500 + 400, // Increased width
            height: Math.random() * 100 + 50, // Reduced height
            vx: (Math.random() - 0.5) * 0.01, // Slower speed
            vy: (Math.random() - 0.5) * 0.01, // Slower speed
            angle: Math.random() * Math.PI / 8 - Math.PI / 16,
            angleSpeed: (Math.random() - 0.5) * 0.0002, // Slower rotation
            color: `rgba(0, ${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, 0.15)`
        });
    }

    function drawNorthernLights() {
        nlCtx.clearRect(0, 0, nlCanvas.width, nlCanvas.height);

        for (let i = 0; i < lights.length; i++) {
            const light = lights[i];
            light.x += light.vx;
            light.y += light.vy;
            light.angle += light.angleSpeed;

            if (light.x < 0 || light.x > nlCanvas.width) light.vx *= -1;
            if (light.y < 0 || light.y > nlCanvas.height) light.vy *= -1;

            nlCtx.save();
            nlCtx.translate(light.x, light.y);
            nlCtx.rotate(light.angle);
            nlCtx.fillStyle = light.color;
            nlCtx.fillRect(-light.width / 2, -light.height / 2, light.width, light.height);
            nlCtx.restore();
        }

        requestAnimationFrame(drawNorthernLights);
    }

    drawNorthernLights();
});
