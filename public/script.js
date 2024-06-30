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
        const starCount = (width * height) / 20000;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
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
                    drawConnection(stars[i], stars[j], distance);
                    const force = (100 - distance) / 50000;
                    const ax = force * dx / distance;
                    const ay = force * dy / distance;

                    stars[i].vx -= ax * stars[j].radius / stars[i].radius;
                    stars[i].vy -= ay * stars.j.radius / stars.i.radius;
                    stars.j.vx += ax * stars.i.radius / stars.j.radius;
                    stars.j.vy += ay * stars.i.radius / stars.j.radius;
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
    nlCanvas.height = 200;

    const lights = [];
    const lightCount = 8;
    for (let i = 0; i < lightCount; i++) {
        lights.push({
            x: i * (nlCanvas.width / lightCount) + (Math.random() * (nlCanvas.width / lightCount)),
            y: Math.random() * nlCanvas.height / 2,
            width: Math.random() * 500 + 400,
            height: Math.random() * 100 + 50,
            vx: (Math.random() - 0.5) * 0.01,
            vy: (Math.random() - 0.5) * 0.01,
            angle: Math.random() * Math.PI / 8 - Math.PI / 16,
            angleSpeed: (Math.random() - 0.5) * 0.0002,
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

    let keySequence = [];
    const targetSequence = ['ArrowUp', 'ArrowDown', '7', '7', '7'];

    document.addEventListener('keydown', (event) => {
        keySequence.push(event.key);

        if (keySequence.length > targetSequence.length) {
            keySequence.shift();
        }

        if (keySequence.join('') === targetSequence.join('')) {
            openDevConsole();
        }
    });

    function openDevConsole() {
        const devConsole = document.createElement('iframe');
        devConsole.style.position = 'fixed';
        devConsole.style.width = '100%';
        devConsole.style.height = '100%';
        devConsole.style.top = '0';
        devConsole.style.left = '0';
        devConsole.style.zIndex = '10000';
        devConsole.style.background = 'rgba(0, 0, 0, 0.8)';
        devConsole.src = 'about:blank';
        document.body.appendChild(devConsole);

        const script = document.createElement('script');
        script.innerHTML = `
            console.log('Dev console opened');
            document.write('<style>body { margin: 0; font-family: monospace; background: #1e1e1e; color: #d4d4d4; }</style>');
            document.write('<div id="console" style="position: fixed; bottom: 0; width: 100%; height: 30%; background-color: #1e1e1e; border-top: 2px solid #888; padding: 10px; box-sizing: border-box; display: flex; flex-direction: column;">');
            document.write('<div id="output" style="flex: 1; overflow-y: auto; white-space: pre-wrap; padding: 5px; background-color: #1e1e1e; color: #d4d4d4;"></div>');
            document.write('<div id="input" style="display: flex;">');
            document.write('<input type="text" id="command" placeholder="Enter command..." style="flex: 1; padding: 10px; border: none; background-color: #333; color: #d4d4d4;">');
            document.write('<button id="send" style="padding: 10px; background-color: #555; color: #d4d4d4; border: none;">Send</button>');
            document.write('</div></div>');

            const output = document.getElementById('output');
            const commandInput = document.getElementById('command');
            const sendButton = document.getElementById('send');

            function logMessage(message) {
                output.textContent += message + '\\n';
                output.scrollTop = output.scrollHeight;
            }

            sendButton.addEventListener('click', () => {
                const command = commandInput.value.trim();
                if (command) {
                    document.title = command; // Change the title of the page to the command
                    document.body.innerHTML = command; // Change the body content to the command
                    commandInput.value = '';
                }
            });

            commandInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    sendButton.click();
                }
            });
        `;
        devConsole.contentDocument.body.appendChild(script);
    }
});
