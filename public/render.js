const MAX_OBJECT_SIZE = 3;
const MIN_OBJECT_SIZE = 3;
const MAX_OBJECT_HOVER_SIZE = 2;
const MIN_OBJECT_HOVER_SIZE = 1;
const FONT_SIZE = 15;
const OBJECT_DISTANCE_VISUALIZATION_LIMIT = 10;

let NAME_VANISH_DISTANCE = 0.70;
let SHOW_LINE_DISTANCE = false;

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

const legend = document.getElementById("galaxy");

const legendDivs = document.querySelectorAll('.legend div');

const nameShowDistance = document.getElementById('nameDistance');
const showDistanceLines = document.getElementById('showDistanceLines');
const maxDistanceLines = document.getElementById('maxDistanceLines');

nameShowDistance.addEventListener('change', () => {
    NAME_VANISH_DISTANCE = nameShowDistance.value;
    console.log("new nameShowDistance: " + NAME_VANISH_DISTANCE);

});
showDistanceLines.addEventListener('change', () => {
    SHOW_LINE_DISTANCE = showDistanceLines.checked;
    console.log("new showDistanceLines: " + SHOW_LINE_DISTANCE);
    if (showDistanceLines.checked == true) maxDistanceLines.disabled = false;
    else maxDistanceLines.disabled = true;
})

maxDistanceLines.addEventListener('change', () => {
    OBJECT_DISTANCE_VISUALIZATION_LIMIT = Math.round(maxDistanceLines.value);
})

const info_panel = document.getElementById('info_panel');

fetch("galaxy.json")
    .then(res => res.json())
    .then(data => {

        let zoom = 0.05;
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;

        let hoveredType = null;
        let hoveredObject = null;

        let object_count = {
            star: 0,
            t1_astroid: 0,
            t2_astroid: 0,
            t3_astroid: 0,
            rogue_planet: 0,
            anomaly: 0,
            blackHole: 0
        }

        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            switch (element.type) {
                case 'star': object_count.star++; continue;
                case 't1_astroid': object_count.t1_astroid++; continue;
                case 't2_astroid': object_count.t2_astroid++; continue;
                case 't3_astroid': object_count.t3_astroid++; continue;
                case 'rogue_planet': object_count.rogue_planet++; continue;
                case 'anomaly': object_count.anomaly++; continue;
                case 'blackHole': object_count.blackHole++; continue;
                case 'mainBlackHole': object_count.blackHole++; continue;
            }
        }
        const star_count = document.getElementById('star_count');
        star_count.innerText = `(${object_count.star})`;
        const t1_astroid_count = document.getElementById('t1_astroid_count');
        t1_astroid_count.innerText = `(${object_count.t1_astroid})`;
        const t2_astroid_count = document.getElementById('t2_astroid_count');
        t2_astroid_count.innerText = `(${object_count.t2_astroid})`;
        const t3_astroid_count = document.getElementById('t3_astroid_count');
        t3_astroid_count.innerText = `(${object_count.t3_astroid})`;
        const rogue_planet_count = document.getElementById('rogue_planet_count');
        rogue_planet_count.innerText = `(${object_count.rogue_planet})`;
        const anomaly_count = document.getElementById('anomaly_count');
        anomaly_count.innerText = `(${object_count.anomaly})`;
        const blackHole_count = document.getElementById('blackHole_count');
        blackHole_count.innerText = `(${object_count.blackHole})`;
        const mainBlackHole_count = document.getElementById('mainBlackHole_count');
        mainBlackHole_count.innerText = `(${object_count.blackHole})`;

        console.log("Objekte: " + data.length.toString());

        console.log(JSON.stringify(object_count, "\n", 2));

        legendDivs.forEach(div => {
            div.addEventListener('mouseenter', () => {
                // hoveredType auf den Typ setzen, der im Text steht (klein geschrieben)
                // Beispiel: 'Stern' -> 'star'
                // Du kannst auch die Farbe oder den Text auslesen
                // Da du im HTML "Stern", "Asteroidenhaufen", "Einzelgänger-Planet" hast, mappe sie:
                const text = div.textContent.toLowerCase();

                if (text.includes('stern')) hoveredType = 'star';
                else if (text.includes('t1 - asteroidenhaufen')) hoveredType = 't1_astroid';
                else if (text.includes('t2 - asteroidenhaufen')) hoveredType = 't2_astroid';
                else if (text.includes('t3 - asteroidenhaufen')) hoveredType = 't3_astroid';
                else if (text.includes('einzelgänger')) hoveredType = 'rogue_planet';
                else if (text.includes('anomalie')) hoveredType = 'anomaly';
                else if (text.includes('schwarzes loch')) hoveredType = 'blackHole';
                else if (text.includes('schwarzes loch (zentrum)')) hoveredType = 'mainBlackHole';
                else hoveredType = null;

                draw();
            });
            div.addEventListener('mouseleave', () => {
                hoveredType = null;
                draw();
            });
        });

        // Helper: Abstand zweier Punkte
        function dist(a, b) {
            return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        }

        // Legend mit farbigen Punkten & Hover Highlight
        function createLegend() {
            legend.innerHTML = '';
            const types = [...new Set(data.map(o => o.type))];
            types.forEach(type => {
                const div = document.createElement('div');
                div.style.cursor = 'pointer';
                div.style.margin = '3px';
                div.style.padding = '2px 6px';
                div.style.border = '1px solid white';
                div.style.display = 'inline-flex';
                div.style.alignItems = 'center';
                div.style.color = 'white';
                div.style.userSelect = 'none';

                // Dot als farbiger Kreis
                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.borderRadius = '50%';
                dot.style.marginRight = '6px';
                dot.style.backgroundColor = (() => {
                    switch (type) {
                        case 'star': return 'yellow';
                        case 't1_astroid': return 'lightgray';
                        case 't2_astroid': return 'gray';
                        case 't3_astroid': return 'darkgreen';
                        case 'rogue_planet': return 'blue';
                        case 'anomaly': return 'magenta';
                        case 'blackHole': return 'pink';
                        case 'mainBlackHole': return 'magenta';
                        default: return 'white';
                    }
                })();

                div.appendChild(dot);
                div.appendChild(document.createTextNode(type.charAt(0).toUpperCase() + type.slice(1)));

                div.addEventListener('mouseenter', () => {
                    hoveredType = type;
                    // Optional: Legendeneintrag visuell hervorheben
                    div.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    draw();
                });
                div.addEventListener('mouseleave', () => {
                    hoveredType = null;
                    div.style.backgroundColor = '';
                    draw();
                });

                legend.appendChild(div);
            });
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            offsetX = canvas.width / 2;
            offsetY = canvas.height / 2;
            draw();
        }

        canvas.addEventListener("mousedown", e => {
            isDragging = true;
            dragStartX = e.clientX - offsetX;
            dragStartY = e.clientY - offsetY;
        });

        canvas.addEventListener("mousemove", e => {
            if (isDragging) {
                offsetX = e.clientX - dragStartX;
                offsetY = e.clientY - dragStartY;
                draw();
            } else {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                let found = null;

                for (const obj of data) {
                    const x = obj.x * zoom + offsetX;
                    const y = obj.y * zoom + offsetY;

                    // Größe des Objekts (wie beim Zeichnen)
                    const baseSize = 6;
                    let scaleFactor = 1;
                    if (hoveredType) {
                        scaleFactor = (obj.type === hoveredType) ? 2 : 1;
                    }
                    if (hoveredObject && obj === hoveredObject) {
                        scaleFactor = 3;
                    }
                    const size = Math.max(Math.min(baseSize * scaleFactor, MAX_OBJECT_SIZE), MAX_OBJECT_SIZE);

                    // Hitbox Radius flexibel zwischen MIN_OBJECT_SIZE und MAX_OBJECT_SIZE
                    const hitRadius = Math.max(MAX_OBJECT_SIZE + (zoom * 1), size);

                    if (Math.abs(x - mouseX) < hitRadius && Math.abs(y - mouseY) < hitRadius) {
                        found = obj;
                        break;
                    }
                }

                if (found !== hoveredObject) {
                    hoveredObject = found;
                    draw();
                }
            }
        });

        canvas.addEventListener("mouseup", () => isDragging = false);
        canvas.addEventListener("mouseleave", () => {
            isDragging = false;
            hoveredObject = null;
            draw();
        });

        canvas.addEventListener("wheel", e => {
            e.preventDefault();
            const zoomIntensity = 0.1;
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            const zoomDirection = e.deltaY > 0 ? -1 : 1;
            const scale = 1 + zoomDirection * zoomIntensity;

            const worldX = (mouseX - offsetX) / zoom;
            const worldY = (mouseY - offsetY) / zoom;

            zoom *= scale;
            if (zoom < 0.00001) zoom = 0.00001;
            if (zoom > 25) zoom = 25;

            offsetX = mouseX - worldX * zoom;
            offsetY = mouseY - worldY * zoom;

            draw();
        });

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            data.forEach(obj => {
                const x = obj.x * zoom + offsetX;
                const y = obj.y * zoom + offsetY;

                if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50)
                    return;

                let alpha = 1;
                let size = MIN_OBJECT_HOVER_SIZE * zoom;

                if (hoveredType) {
                    if (obj.type === hoveredType) {
                        alpha = 1;
                        size = MAX_OBJECT_HOVER_SIZE * zoom;
                    } else {
                        alpha = 0.3;
                        size = MIN_OBJECT_HOVER_SIZE * zoom;
                    }
                }

                if (hoveredObject && obj === hoveredObject) {
                    alpha = 1;
                    size = MAX_OBJECT_HOVER_SIZE * 1.5 * zoom; // noch größer beim Objekt-Hover
                }

                size = Math.max(Math.min(size, 20), 1.5); // Clamp MIN & MAX

                ctx.globalAlpha = alpha;

                switch (obj.type) {
                    case 'star': ctx.fillStyle = 'yellow'; break;
                    case 't1_astroid': ctx.fillStyle = 'lightgray'; break;
                    case 't2_astroid': ctx.fillStyle = 'gray'; break;
                    case 't3_astroid': ctx.fillStyle = 'darkgreen'; break;
                    case 'rogue_planet': ctx.fillStyle = 'blue'; break;
                    case 'anomaly': ctx.fillStyle = 'magenta'; break;
                    case 'blackHole': ctx.fillStyle = 'pink'; break;
                    case 'mainBlackHole': ctx.fillStyle = 'magenta'; break;
                    default: ctx.fillStyle = 'white'; break;
                }

                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();

                // Namen anzeigen, wenn entweder zoom > threshold oder Objekt gehighlightet
                if (zoom > NAME_VANISH_DISTANCE || (hoveredType && obj.type === hoveredType) || (hoveredObject && obj === hoveredObject)) {
                    ctx.fillStyle = (obj.type === 'anomaly') ? 'magenta' : 'white';
                    ctx.fillStyle = (obj.type === 'mainBlackHole') ? 'magenta' : 'white';
                    ctx.font = `${FONT_SIZE}px monospace`;
                    ctx.fillText(obj.name, x + size + 3, y - size - 3);
                }

                ctx.globalAlpha = 1;
            });

            if (hoveredObject && SHOW_LINE_DISTANCE) {
                const neighbors = data
                    .filter(o => o !== hoveredObject)
                    .map(o => ({ obj: o, dist: dist(o, hoveredObject) }))
                    .sort((a, b) => a.dist - b.dist)
                    .slice(0, OBJECT_DISTANCE_VISUALIZATION_LIMIT);

                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'white';
                ctx.lineWidth = 1;

                neighbors.forEach(({ obj, dist }) => {
                    const x1 = hoveredObject.x * zoom + offsetX;
                    const y1 = hoveredObject.y * zoom + offsetY;
                    const x2 = obj.x * zoom + offsetX;
                    const y2 = obj.y * zoom + offsetY;

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();

                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    ctx.font = '10px monospace';
                    ctx.fillText(dist.toFixed(1), midX + 5, midY - 5);
                });
            }
        }

        resize();
        createLegend();
    });
