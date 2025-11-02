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

// HZML
const legend_Star_amount = document.getElementById("star_count");
const legend_o_Star_amount = document.getElementById("o_star_count");
const legend_b_Star_amount = document.getElementById("b_star_count");
const legend_a_Star_amount = document.getElementById("a_star_count");
const legend_f_Star_amount = document.getElementById("f_star_count");
const legend_g_Star_amount = document.getElementById("g_star_count");
const legend_k_Star_amount = document.getElementById("k_star_count");
const legend_m_Star_amount = document.getElementById("m_star_count");
const legend_l_Star_amount = document.getElementById("l_star_count");
const legend_t_Star_amount = document.getElementById("t_star_count");
const legend_y_Star_amount = document.getElementById("y_star_count");

let Star_amount_Information = {
    star: +legend_Star_amount.innerText | 0,
    o_star: +legend_o_Star_amount.innerText | 0,
    b_star: +legend_b_Star_amount.innerText | 0,
    a_star: +legend_a_Star_amount.innerText | 0,
    f_star: +legend_f_Star_amount.innerText | 0,
    g_star: +legend_g_Star_amount.innerText | 0,
    k_star: +legend_k_Star_amount.innerText | 0,
    m_star: +legend_m_Star_amount.innerText | 0,
    l_star: +legend_l_Star_amount.innerText | 0,
    t_star: +legend_t_Star_amount.innerText | 0,
    y_star: +legend_y_Star_amount.innerText | 0,
    update: () => {
        legend_Star_amount.innerText = Star_amount_Information.star;
        legend_o_Star_amount.innerText = Star_amount_Information.o_star;
        legend_b_Star_amount.innerText = Star_amount_Information.b_star;
        legend_a_Star_amount.innerText = Star_amount_Information.a_star;
        legend_f_Star_amount.innerText = Star_amount_Information.f_star;
        legend_g_Star_amount.innerText = Star_amount_Information.g_star;
        legend_k_Star_amount.innerText = Star_amount_Information.k_star;
        legend_m_Star_amount.innerText = Star_amount_Information.m_star;
        legend_l_Star_amount.innerText = Star_amount_Information.l_star;
        legend_t_Star_amount.innerText = Star_amount_Information.t_star;
        legend_y_Star_amount.innerText = Star_amount_Information.y_star;
    }
}
log("Starter Legend Star Information");
log(Star_amount_Information);
Star_amount_Information.update();

const legend_interstellar_t1_astroid_count = document.getElementById("interstellar_t1_astroid_count")
const legend_interstellar_t2_astroid_count = document.getElementById("interstellar_t2_astroid_count")
const legend_interstellar_t3_astroid_count = document.getElementById("interstellar_t3_astroid_count")

let InterstellarAstroid_amount_Information = {
    t1_astroid: +legend_interstellar_t1_astroid_count.innerText | 0,
    t2_astroid: +legend_interstellar_t2_astroid_count.innerText | 0,
    t3_astroid: +legend_interstellar_t3_astroid_count.innerText | 0,
    update: () => {
        legend_interstellar_t1_astroid_count.innerText = InterstellarAstroid_amount_Information.t1_astroid;
        legend_interstellar_t2_astroid_count.innerText = InterstellarAstroid_amount_Information.t2_astroid;
        legend_interstellar_t3_astroid_count.innerText = InterstellarAstroid_amount_Information.t3_astroid;
    }
}
log("Starter Legend Interstellar Astroid Information");
log(InterstellarAstroid_amount_Information);
InterstellarAstroid_amount_Information.update();

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
        Star_amount_Information.star = GALAXY_INFORMATION.range.spaceObjectTypes.star.amount;
        log("Loaded Star_amount_Information.star from .range.spaceObjectTypes.star.amount: " + Star_amount_Information.star)

        const temp = GALAXY_INFORMATION.range.starClassAmount;
        log(temp);
    })
    .then(() => {
        console.info("\x1b[32mLoaded all Information!\x1b[0m");
    })
    .catch(err => console.error(err));
