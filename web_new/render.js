import { gunzipSync } from 'https://cdn.skypack.dev/fflate@0.8.2?min';

function log(message) { console.log(message) }

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

let GALAXY_DATA = {};
let GALAXY_INFORMATION = {};

fetch('galaxyInformation.json')
    .then(res => res.arrayBuffer())
    .then(buf => {
        GALAXY_INFORMATION = JSON.parse(new TextDecoder().decode(buf));
        log("Galaxy Information")
        log(GALAXY_INFORMATION);
        return fetch('galaxy.json.gz');
    })
    .then(res => res.arrayBuffer())
    .then(buf => {
        GALAXY_DATA = JSON.parse(new TextDecoder().decode(gunzipSync(new Uint8Array(buf))));
        log("Galaxy Data First Interstellar Object.")
        log(GALAXY_DATA["0_0"].objects[1]);
        log("Galaxy Data First Interstellar Object JSON String.")
        log(JSON.stringify(GALAXY_DATA["0_0"].objects[1]));
        log("Galaxy Data Full.")
        log(GALAXY_DATA);
    })
    .then(() => {
        console.info("\x1b[32mLoaded all Information!\x1b[0m");
    })
    .catch(err => console.error(err));
