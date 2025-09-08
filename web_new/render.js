import { gunzipSync, unzipSync } from 'https://cdn.skypack.dev/fflate@0.8.2?min';

// Constants
const MAX_OBJECT_SIZE = 3;
const MIN_OBJECT_SIZE = 3;
const MAX_OBJECT_HOVER_SIZE = 2;
const MIN_OBJECT_HOVER_SIZE = 1;
const FONT_SIZE = 15;
const MAX_ZOOM_DISTANCE = 0.1;
const MIN_ZOOM_DISTANCE = 25;
let OBJECT_DISTANCE_VISUALIZATION_LIMIT = 10;

// State Variables
let zoom = 0.4;
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
let CLICK_TO_SELECT = true;
let UNIFORM_STAR_COLOR = true;
let DETAILED_RESOURCE_NAMES = false;

// Canvas and Context
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

// UI Elements
const info_panel = document.getElementById('info_panel');
const info_content = document.getElementById('info_content');
const currentZoom = document.getElementById('currentZoom');
currentZoom.innerText = zoom.toFixed(2);

// Data
let galaxyData = new Map(); // Map to store loaded sector data
let rangeData = null; // Data from range.json

// Load range.json separately
fetch('range.json')
    .then(res => res.json())
    .then(range => {
        rangeData = range;

        // Load Galaxy Data from galaxyData.gz
        return fetch('galaxyData.gz');
    })
    .then(res => res.arrayBuffer())
    .then(buffer => {
        const decompressed = unzipSync(new Uint8Array(buffer));

        rangeData.array.forEach(fileName => {
            const fileData = decompressed[fileName];
            if (fileData) {
                const fileString = new TextDecoder().decode(fileData);
                galaxyData.set(fileName, JSON.parse(fileString));
                console.log({file:fileName, json:JSON.parse(fileString)});
            }
        });

        initialize();
    })
    .catch(err => console.error('Failed to load galaxy data or range.json:', err));

function initialize() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', startDrag);
    canvas.addEventListener('mousemove', drag);
    canvas.addEventListener('mouseup', endDrag);
    canvas.addEventListener('wheel', zoomCanvas);
    render();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

function render() {
    if (!rangeData) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const visibleSectors = calculateVisibleSectors();

    visibleSectors.forEach(sectorName => {
        const sector = galaxyData.get(sectorName);
        if (!sector) return;

        sector.objects.forEach(obj => {
            const x = obj.x * zoom + offsetX;
            const y = obj.y * zoom + offsetY;

            if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) return;

            let alpha = 1;
            let size = MIN_OBJECT_HOVER_SIZE * zoom;

            if (hoveredSpectralClass) {
                if (obj.type === 'star') {
                    const h = obj.metadata.starSpectral.h;
                    if (h === hoveredSpectralClass) {
                        alpha = 1;
                        size = MAX_OBJECT_HOVER_SIZE * zoom;
                    } else {
                        alpha = 0.15;
                        size = MIN_OBJECT_HOVER_SIZE * zoom;
                    }
                } else {
                    alpha = 0.05;
                    size = MIN_OBJECT_HOVER_SIZE * zoom;
                }
            } else if (hoveredType) {
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
                size = MAX_OBJECT_HOVER_SIZE * 1.5 * zoom;
            }

            size = Math.max(Math.min(size, 20), 1.5);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = obj.metadata?.starSpectral?.color || 'white';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            if (SHOW_NAMES && zoom > NAME_VANISH_DISTANCE) {
                ctx.fillStyle = 'white';
                ctx.font = `${FONT_SIZE}px monospace`;
                ctx.fillText(obj.name, x + size + 3, y - size - 3);
            }

            ctx.globalAlpha = 1;
        });
    });
}

function calculateVisibleSectors() {
    const sectorCountX = Math.ceil(canvas.width / (1000 * zoom)) + 2;
    const sectorCountY = Math.ceil(canvas.height / (1000 * zoom)) + 2;

    const startX = Math.floor(offsetX / 1000) - 1;
    const startY = Math.floor(offsetY / 1000) - 1;

    const visibleSectors = [];
    for (let x = startX; x < startX + sectorCountX; x++) {
        for (let y = startY; y < startY + sectorCountY; y++) {
            const sectorName = `${x}_${y}`;
            if (rangeData.array.includes(sectorName)) {
                visibleSectors.push(sectorName);
            }
        }
    }

    return visibleSectors;
}

function startDrag(e) {
    isDragging = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
}

function drag(e) {
    if (!isDragging) return;
    offsetX = e.clientX - dragStartX;
    offsetY = e.clientY - dragStartY;
    render();
}

function endDrag() {
    isDragging = false;
}

function zoomCanvas(e) {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const zoomDirection = e.deltaY > 0 ? -1 : 1;
    const scale = 1 + zoomDirection * zoomIntensity;

    const worldX = (mouseX - offsetX) / zoom;
    const worldY = (mouseY - offsetY) / zoom;

    zoom *= scale;
    zoom = Math.max(MAX_ZOOM_DISTANCE, Math.min(MIN_ZOOM_DISTANCE, zoom));

    offsetX = mouseX - worldX * zoom;
    offsetY = mouseY - worldY * zoom;

    currentZoom.innerText = zoom.toFixed(2);
    render();
}