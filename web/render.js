fetch("galaxy.json").then(res => res.json()).then(data => {
    const MAX_OBJECT_SIZE = 3;
    const MIN_OBJECT_SIZE = 3;
    const MAX_OBJECT_HOVER_SIZE = 2;
    const MIN_OBJECT_HOVER_SIZE = 1;
    const FONT_SIZE = 15;
    const MAX_ZOOM_DISTANCE = 0.0000000001;
    const MIN_ZOOM_DISTANCE = 25;
    let OBJECT_DISTANCE_VISUALIZATION_LIMIT = 10;

    let zoom = 0.004;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    let hoveredType = null;
    let hoveredObject = null;
    let selectedObject = null;
    let hoveredSpectralClass = null;

    let NAME_VANISH_DISTANCE = 0.70;
    let SHOW_NAMES = true;
    let SHOW_LINE_DISTANCE = false;
    let CLICK_TO_SELECT = false;
    let UNIFORM_STAR_COLOR = true;

    const canvas = document.getElementById("galaxy");
    const ctx = canvas.getContext("2d");

    const legend = document.getElementById("galaxy");

    const legendDivs = document.querySelectorAll('.legend div');

    const info_panel = document.getElementById('info_panel');
    const info_content = document.getElementById('info_content');

    const ship_content = document.getElementById('ship_content');
    const shipvalues = document.getElementById('shipvalues');
    const shipSelect = document.getElementById('shipSelect');

    const nameShowDistance = document.getElementById('nameDistance');
    const showNames = document.getElementById('showNames');
    const showDistanceLines = document.getElementById('showDistanceLines');
    const maxDistanceLines = document.getElementById('maxDistanceLines');
    const clickToSelect = document.getElementById('clickToSelect');
    const uniformStarColor = document.getElementById('uniformStarColor');

    const currentZoom = document.getElementById('currentZoom');
    currentZoom.innerText = zoom.toFixed(5);

    nameShowDistance.addEventListener('change', () => {
        NAME_VANISH_DISTANCE = nameShowDistance.value;
        draw();
    });

    showNames.addEventListener('change', () => {
        SHOW_NAMES = showNames.checked;
        if (showNames.checked == true) { nameShowDistance.disabled = false }
        else { nameShowDistance.disabled = true }
        draw();
    })

    showDistanceLines.addEventListener('change', () => {
        SHOW_LINE_DISTANCE = showDistanceLines.checked;
        if (showDistanceLines.checked == true) maxDistanceLines.disabled = false;
        else maxDistanceLines.disabled = true;
        draw();
    })

    maxDistanceLines.addEventListener('change', () => {
        OBJECT_DISTANCE_VISUALIZATION_LIMIT = Math.round(maxDistanceLines.value);
        draw();
    })

    clickToSelect.addEventListener('change', () => {
        CLICK_TO_SELECT = clickToSelect.checked;
        draw();
    })

    uniformStarColor.addEventListener('change', () => {
        UNIFORM_STAR_COLOR = uniformStarColor.checked;
        draw();
    })

    let object_count = {
        star: 0,
        t1_astroid: 0,
        t2_astroid: 0,
        t3_astroid: 0,
        rogue_planet: 0,
        anomaly: 0,
        blackHole: 0,
        mainBlackHole: 0
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
            case 'mainBlackHole': object_count.mainBlackHole++; continue;
        }
    }

    // Sternklassen zählen
    const spectralClassMap = {
        O: 'o_star_count',
        B: 'b_star_count',
        A: 'a_star_count',
        F: 'f_star_count',
        G: 'g_star_count',
        K: 'k_star_count',
        M: 'm_star_count',
        L: 'l_star_count',
        T: 't_star_count',
        Y: 'y_star_count'
    };
    const spectralClassCounts = {
        O: 0, B: 0, A: 0, F: 0, G: 0, K: 0, M: 0, L: 0, T: 0, Y: 0
    };

    data.forEach(obj => {
        if (
            obj.type === "star" &&
            obj.metadata &&
            obj.metadata.informationBase &&
            obj.metadata.informationBase.starSpectral &&
            obj.metadata.informationBase.starSpectral.h
        ) {
            const h = obj.metadata.informationBase.starSpectral.h;
            if (spectralClassCounts.hasOwnProperty(h)) {
                spectralClassCounts[h]++;
            }
        }
    });

    // HTML aktualisieren
    Object.entries(spectralClassMap).forEach(([klass, elemId]) => {
        const elem = document.getElementById(elemId);
        if (elem) {
            elem.innerText = `(${spectralClassCounts[klass]})`;
        }
    });

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
    mainBlackHole_count.innerText = `(${object_count.mainBlackHole})`;

    console.log("Objekte: " + data.length.toString());

    console.log(JSON.stringify(object_count, "\n", 2));

    legendDivs.forEach(div => {
        div.addEventListener('mouseenter', () => {
            const spectralClass = div.getAttribute('data-spectral-class');
            if (spectralClass) {
                hoveredType = null;
                hoveredSpectralClass = spectralClass;
            } else {
                const id = div.id;
                if (id.startsWith("legend.")) {
                    hoveredType = id.split(".")[1];
                    hoveredSpectralClass = null;
                } else {
                    hoveredType = null;
                    hoveredSpectralClass = null;
                }
            }
            draw();
        });

        div.addEventListener('mouseleave', () => {
            hoveredType = null;
            hoveredSpectralClass = null;
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
            div.style.cursor = 'default'; // Kein Pointer auf dem ganzen Div

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

            // Nur das Label ist hoverbar!
            const label = document.createElement('span');
            label.className = 'legend-label';
            label.style.cursor = 'pointer';
            label.innerText = type.charAt(0).toUpperCase() + type.slice(1);
            div.appendChild(label);

            label.addEventListener('mouseenter', () => {
                hoveredType = type;
                label.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                draw();
            });
            label.addEventListener('mouseleave', () => {
                hoveredType = null;
                label.style.backgroundColor = '';
                draw();
            });

            legend.appendChild(div);
        });

        // Sternklassen-Legende
        const spectralClasses = [
            { key: 'O', color: '#9bb0ff' },
            { key: 'B', color: '#aabfff' },
            { key: 'A', color: '#cad7ff' },
            { key: 'F', color: '#f8f7ff' },
            { key: 'G', color: '#fff4ea' },
            { key: 'K', color: '#ffd2a1' },
            { key: 'M', color: '#ffcc6f' },
            { key: 'L', color: '#ff9900' },
            { key: 'T', color: '#cc6600' },
            { key: 'Y', color: '#660066' }
        ];
        spectralClasses.forEach(cls => {
            const div = document.createElement('div');
            div.id = `legend.${cls.key}`;
            div.setAttribute('data-spectral-class', cls.key);
            div.style.cursor = 'default';

            // Dot als farbiger Kreis
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.marginRight = '6px';
            dot.style.backgroundColor = cls.color;

            div.appendChild(dot);

            // Nur das Label ist hoverbar!
            const label = document.createElement('span');
            label.className = 'legend-label';
            label.style.cursor = 'pointer';
            label.innerText = cls.key + "-Stern";
            div.appendChild(label);

            // Counter
            const countSpan = document.createElement('span');
            countSpan.id = `${cls.key.toLowerCase()}_star_count`;
            countSpan.style.marginLeft = '6px';
            div.appendChild(countSpan);

            label.addEventListener('mouseenter', () => {
                hoveredType = null;
                hoveredSpectralClass = cls.key;
                label.style.backgroundColor = 'rgba(255,255,255,0.1)';
                draw();
            });
            label.addEventListener('mouseleave', () => {
                hoveredSpectralClass = null;
                label.style.backgroundColor = '';
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
        } else if (!CLICK_TO_SELECT || !selectedObject) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            let found = null;

            for (const obj of data) {
                const x = obj.x * zoom + offsetX;
                const y = obj.y * zoom + offsetY;
                const baseSize = 6;
                let scaleFactor = 1;
                if (hoveredType) scaleFactor = (obj.type === hoveredType) ? 2 : 1;
                if (hoveredObject && obj === hoveredObject) scaleFactor = 3;
                const size = Math.max(Math.min(baseSize * scaleFactor, MAX_OBJECT_SIZE), MAX_OBJECT_SIZE);
                const hitRadius = Math.max(MAX_OBJECT_SIZE + (zoom * 1), size);

                if (Math.abs(x - mouseX) < hitRadius && Math.abs(y - mouseY) < hitRadius) {
                    found = obj;
                    break;
                }
            }

            if (found !== hoveredObject) {
                hoveredObject = found;
                if (!CLICK_TO_SELECT) selectedObject = null;
                updateInfoPanel(hoveredObject || selectedObject);
                draw();
            }
        }
    });

    // Klick: Objekt auswählen, Panel bleibt sichtbar und scrollbar
    canvas.addEventListener("mouseup", e => {
        isDragging = false;
        if (CLICK_TO_SELECT) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            let found = null;

            for (const obj of data) {
                const x = obj.x * zoom + offsetX;
                const y = obj.y * zoom + offsetY;
                const baseSize = 6;
                let scaleFactor = 1;
                if (hoveredType) scaleFactor = (obj.type === hoveredType) ? 2 : 1;
                if (hoveredObject && obj === hoveredObject) scaleFactor = 3;
                const size = Math.max(Math.min(baseSize * scaleFactor, MAX_OBJECT_SIZE), MAX_OBJECT_SIZE);
                const hitRadius = Math.max(MAX_OBJECT_SIZE + (zoom * 1), size);

                if (Math.abs(x - mouseX) < hitRadius && Math.abs(y - mouseY) < hitRadius) {
                    found = obj;
                    break;
                }
            }

            selectedObject = found;
            hoveredObject = found; // <--- Diese Zeile sorgt für das korrekte Umschalten!
            updateInfoPanel(selectedObject || hoveredObject);
            draw();
        }
    });

    canvas.addEventListener("mouseup", () => isDragging = false);
    canvas.addEventListener("mouseleave", () => {
        isDragging = false;
        if (!CLICK_TO_SELECT) hoveredObject = null;
        updateInfoPanel(selectedObject || hoveredObject);
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
        if (zoom < MAX_ZOOM_DISTANCE) zoom = MAX_ZOOM_DISTANCE;
        if (zoom > MIN_ZOOM_DISTANCE) zoom = MIN_ZOOM_DISTANCE;

        offsetX = mouseX - worldX * zoom;
        offsetY = mouseY - worldY * zoom;

        currentZoom.innerText = zoom.toFixed(10);

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

            // 1. Sternklassen-Hover hat Vorrang, betrifft aber nur Sterne!
            if (hoveredSpectralClass) {
                if (obj.type === "star") {
                    const h = obj.metadata?.informationBase?.starSpectral?.h;
                    if (h === hoveredSpectralClass) {
                        alpha = 1;
                        size = MAX_OBJECT_HOVER_SIZE * zoom;
                    } else {
                        alpha = 0.15;
                        size = MIN_OBJECT_HOVER_SIZE * zoom;
                    }
                } else {
                    // Alle anderen Typen werden ausgegraut!
                    alpha = 0.05;
                    size = MIN_OBJECT_HOVER_SIZE * zoom;
                }
            }
            // 2. Typen-Hover (nur wenn keine Sternklasse gehovt wird)
            else if (hoveredType) {
                if (obj.type === hoveredType) {
                    alpha = 1;
                    size = MAX_OBJECT_HOVER_SIZE * zoom;
                } else {
                    alpha = 0.3;
                    size = MIN_OBJECT_HOVER_SIZE * zoom;
                }
            }

            // 3. Einzelobjekt-Hover/Select
            if (hoveredObject && obj === hoveredObject) {
                alpha = 1;
                size = MAX_OBJECT_HOVER_SIZE * 1.5 * zoom;
            }

            size = Math.max(Math.min(size, 20), 1.5); // Clamp MIN & MAX

            ctx.globalAlpha = alpha;

            switch (obj.type) {
                case 'star':
                    // Wenn Farbinformation vorhanden, nutze sie, sonst fallback auf 'yellow'
                    ctx.fillStyle = (
                        obj.metadata &&
                        obj.metadata.informationBase &&
                        obj.metadata.informationBase.starSpectral &&
                        obj.metadata.informationBase.starSpectral.color &&
                        !UNIFORM_STAR_COLOR
                    ) ? obj.metadata.informationBase.starSpectral.color : 'yellow';
                    break;
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
            // Namen anzeigen, wenn einer der Hover-Fälle zutrifft
            if (
                SHOW_NAMES && (
                    zoom > NAME_VANISH_DISTANCE ||
                    (hoveredType && obj.type === hoveredType) ||
                    (hoveredObject && obj === hoveredObject) ||
                    (hoveredSpectralClass && obj.type === "star" && obj.metadata?.informationBase?.starSpectral?.h === hoveredSpectralClass)
                )
            ) {
                ctx.fillStyle = (obj.type === 'anomaly') ? 'magenta' : 'white';
                ctx.fillStyle = (obj.type === 'mainBlackHole') ? 'magenta' : ctx.fillStyle;
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

        updateInfoPanel(selectedObject || hoveredObject);
    }

    function updateInfoPanel(obj) {
        if (!obj) {
            info_content.innerHTML = `<span>Bewege den Mauszeiger über ein Objekt...</span>`;
            return;
        }

        let html = `<b>Name:</b> ${obj.name}<br>`;
        html += `<b>Typ:</b> ${obj.type}<br>`;
        html += `<b>Position:</b> x=${obj.x.toFixed(2)}, y=${obj.y.toFixed(2)} (Lj)<br>`;
        html += `<b>Distanz zum Zentrum:</b> ${obj.distanceToCenter ? obj.distanceToCenter.toFixed(2) : "-"} Lj<br>`;

        // Metadaten anzeigen, falls vorhanden
        if (obj.metadata && obj.metadata.informationBase) {
            const info = obj.metadata.informationBase;
            if (obj.type === "star") {
                html += `<hr><b>Sternendaten:</b><br>`;
                html += `Spektralklasse: ${info.starSpectral?.h ?? "-"}-${info.starSpectral?.s ?? "-"} (${info.starSpectral?.name ?? "-"})<br>`;
                html += `Temperatur: ${info.starTemperature ?? "-"} °K (${info.starSpectral?.color ?? "-"})<br>`;
                html += `Masse: ${info.starMass?.toFixed(3) ?? "-"} Sonnenmassen<br>`;
                html += `Radius: ${info.starRad?.toFixed(3) ?? "-"} Sonnenradien<br>`;
                html += `Leuchtkraft: ${info.starLum?.toFixed(5) ?? "-"} L☉<br>`;
                html += `Masse (kg): ${info.starMassKG ? info.starMassKG.toExponential(3) : "-"}<br>`;
                // Planeten anzeigen
                if (Array.isArray(info.planetSystem)) {
                    html += `<hr><b>Planeten (${info.planetSystem.length}):</b><br>`;
                    info.planetSystem.forEach((planet, idx) => {
                        let OTD = planet.OrbitalTimeInSec / (24 * 3600);

                        html += `<u>Planet ${idx + 1}: ${planet.name}</u><br>`;
                        html += `&nbsp;Höhe: ${planet.height.toFixed(2)} AE<br>`;
                        html += `&nbsp;Masse: ${planet.massEM} Erdmassen<br>`;
                        html += `&nbsp;Umlaufzeit: ${planet.OrbitalTimeInYears} Jahre`;
                        if (OTD < 100) { html += `(${OTD} Tage)<br>` } else { html += "<br>" }
                        html += `&nbsp;Primäre Ressourcen: - <br>`;
                        html += `&nbsp;Sekundäre Ressourcen: - <br>`;
                        if (planet.moons && planet.moons.length > 0) {
                            html += `&nbsp;Monde (${planet.moons.length}):<br>`;
                            planet.moons.forEach((moon, min) => {
                                html += `&nbsp;&nbsp;• ${moon.name} (Höhe: ${moon.height.toFixed(0)} km, Masse: ${moon.massEM} EM, Umlaufzeit: ${(moon.OrbitalTimeInSec / 3600).toFixed(2)} h (${(moon.OrbitalTimeInSec / (24 * 3600)).toFixed(3)} Tage)<br>`;
                            });
                        }
                        html += "<br>"
                    });
                }
            }

            if (obj.type === "rogue_planet" || obj.type === "planet") {
                html += `<hr><b>Planetendaten:</b><br>`;
                html += `Masse: ${info.massEM ?? "-"} Erdmassen<br>`;
                if (obj.type == "planet") html += `Höhe: ${info.height ?? "-"} AE<br>`;
                html += `&nbsp;Primäre Ressourcen: - <br>`;
                html += `&nbsp;Sekundäre Ressourcen: - <br>`;
                if (info.moons && info.moons.length > 0) {
                    html += `Monde (${info.moons.length}):<br>`;
                    info.moons.forEach((moon, mi) => {
                        html += `&nbsp;&nbsp;• ${moon.name} (Höhe: ${moon.height.toFixed(0)} km, Masse: ${moon.massEM} EM, Umlaufzeit: ${(moon.OrbitalTimeInSec / 3600).toFixed(2)} h (${(moon.OrbitalTimeInSec / (24 * 3600).toFixed(3)).toFixed(3)} Tage)<br>`;
                    });
                }
            }

            // Weitere Typen wie Asteroidenfelder, Anomalien etc. kannst du hier ergänzen
        }

        // Ressourcen anzeigen, falls vorhanden
        if (obj.metadata && obj.metadata.resource) {
            const res = obj.metadata.resource;
            if (Array.isArray(res) && res.length > 0) {
                html += `<hr><b>Ressourcen:</b><br>`;
                res.forEach(r => {
                    html += `${r.res}: ${r.amount}<br>`;
                });
            }
        }
        if (obj.metadata && obj.metadata.specialresource) {
            const res = obj.metadata.specialresource;
            if (Array.isArray(res) && res.length > 0) {
                html += `<b>Spezialressourcen:</b><br>`;
                res.forEach(r => {
                    html += `${r.res}: ${r.amount}<br>`;
                });
            }
        }

        info_content.innerHTML = html;
    }

    resize();
    createLegend();
})