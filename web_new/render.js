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

let star_amount_information = {
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
        legend_Star_amount.innerText = star_amount_information.star;
        legend_o_Star_amount.innerText = star_amount_information.o_star;
        legend_b_Star_amount.innerText = star_amount_information.b_star;
        legend_a_Star_amount.innerText = star_amount_information.a_star;
        legend_f_Star_amount.innerText = star_amount_information.f_star;
        legend_g_Star_amount.innerText = star_amount_information.g_star;
        legend_k_Star_amount.innerText = star_amount_information.k_star;
        legend_m_Star_amount.innerText = star_amount_information.m_star;
        legend_l_Star_amount.innerText = star_amount_information.l_star;
        legend_t_Star_amount.innerText = star_amount_information.t_star;
        legend_y_Star_amount.innerText = star_amount_information.y_star;
    }
}
console.log("Starter Legend Star Information", star_amount_information);

const legend_interstellar_t1_astroid_count = document.getElementById("interstellar_t1_astroid_count")
const legend_interstellar_t2_astroid_count = document.getElementById("interstellar_t2_astroid_count")
const legend_interstellar_t3_astroid_count = document.getElementById("interstellar_t3_astroid_count")

let interstellarAstroid_amount_information = {
    t1_astroid: +legend_interstellar_t1_astroid_count.innerText | 0,
    t2_astroid: +legend_interstellar_t2_astroid_count.innerText | 0,
    t3_astroid: +legend_interstellar_t3_astroid_count.innerText | 0,
    update: () => {
        legend_interstellar_t1_astroid_count.innerText = interstellarAstroid_amount_information.t1_astroid;
        legend_interstellar_t2_astroid_count.innerText = interstellarAstroid_amount_information.t2_astroid;
        legend_interstellar_t3_astroid_count.innerText = interstellarAstroid_amount_information.t3_astroid;
    }
}
console.log("Starter Legend Interstellar Astroid Information", interstellarAstroid_amount_information);

const legend_rogue_planet_count = document.getElementById("rogue_planet_count");
const legend_anomaly_count = document.getElementById("anomaly_count");
const legend_blackHole_count = document.getElementById("blackHole_count");
const legend_mainBlackHole_count = document.getElementById("mainBlackHole_count");
let other_amount_information = {
    rogue_planet: +legend_rogue_planet_count.innerText | 0,
    anomaly: +legend_anomaly_count.innerText | 0,
    black_hole: +legend_blackHole_count.innerText | 0,
    main_black_hole: +legend_mainBlackHole_count.innerText | 0,
    update: () => {
        legend_rogue_planet_count.innerText = other_amount_information.rogue_planet;
        legend_anomaly_count.innerText = other_amount_information.anomaly;
        legend_blackHole_count.innerText = other_amount_information.black_hole;
        legend_mainBlackHole_count.innerText = other_amount_information.main_black_hole;
    }
}
console.log("Starter Legend Special Object Information", other_amount_information)
log("")

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
        console.log("Galaxy Information", GALAXY_INFORMATION);
        return fetch('galaxy.json.gz');
    })
    .then(res => res.arrayBuffer())
    .then(buf => {
        GALAXY_DATA = JSON.parse(new TextDecoder().decode(gunzipSync(new Uint8Array(buf))));
        console.log("Galaxy Data First Interstellar Object.", GALAXY_DATA["0_0"].objects[1]);
        console.log("Galaxy Data Full.", GALAXY_DATA);
        log("");
    })
    .then(() => {
        star_amount_information.star = GALAXY_INFORMATION.range.spaceObjectTypes.star.amount;
        log("Loaded Star_amount_Information.star from .range.spaceObjectTypes.star.amount: " + star_amount_information.star)

        let temp = GALAXY_INFORMATION.range.starClassAmount;
        console.log("Complete starClassAmountList: ", temp)
        star_amount_information.o_star = temp.O;
        log("Loaded Star_amount_Information.o_star from .range.starClassAmount.O: " + temp.O)
        star_amount_information.b_star = temp.B;
        log("Loaded Star_amount_Information.b_star from .range.starClassAmount.B: " + temp.B)
        star_amount_information.a_star = temp.A;
        log("Loaded Star_amount_Information.a_star from .range.starClassAmount.A: " + temp.A)
        star_amount_information.f_star = temp.F;
        log("Loaded Star_amount_Information.f_star from .range.starClassAmount.F: " + temp.F)
        star_amount_information.g_star = temp.G;
        log("Loaded Star_amount_Information.g_star from .range.starClassAmount.G: " + temp.G)
        star_amount_information.k_star = temp.K;
        log("Loaded Star_amount_Information.k_star from .range.starClassAmount.K: " + temp.K)
        star_amount_information.m_star = temp.M;
        log("Loaded Star_amount_Information.m_star from .range.starClassAmount.M: " + temp.M)
        star_amount_information.l_star = temp.L;
        log("Loaded Star_amount_Information.l_star from .range.starClassAmount.L: " + temp.L)
        star_amount_information.t_star = temp.T;
        log("Loaded Star_amount_Information.t_star from .range.starClassAmount.T: " + temp.T)
        star_amount_information.y_star = temp.Y;
        log("Loaded Star_amount_Information.y_star from .range.starClassAmount.Y: " + temp.Y)
        star_amount_information.update();
        log("Amount Values Updated for Stars");
        log("");
        
        interstellarAstroid_amount_information.t1_astroid = GALAXY_INFORMATION.range.spaceObjectTypes.interstellar_t1_astroid.amount;
        log("Loaded InterstellarAstroid_amount_Information.t1_astroid from .range.spaceObjectTypes.interstellar_t1_astroid.amount: " + interstellarAstroid_amount_information.t1_astroid)
        interstellarAstroid_amount_information.t2_astroid = GALAXY_INFORMATION.range.spaceObjectTypes.interstellar_t2_astroid.amount;
        log("Loaded InterstellarAstroid_amount_Information.t2_astroid from .range.spaceObjectTypes.interstellar_t2_astroid.amount: " + interstellarAstroid_amount_information.t2_astroid)
        interstellarAstroid_amount_information.t3_astroid = GALAXY_INFORMATION.range.spaceObjectTypes.interstellar_t3_astroid.amount;
        log("Loaded InterstellarAstroid_amount_Information.t3_astroid from .range.spaceObjectTypes.interstellar_t3_astroid.amount: " + interstellarAstroid_amount_information.t3_astroid)
        interstellarAstroid_amount_information.update();
        log("Amount Values Updated for Interstellar Astroid Fields");
        log("");

        //? Black Holes and Rogue Planets Aren't implemented jet.

        // other_amount_information.rogue_planet = GALAXY_INFORMATION.range.spaceObjectTypes.rogue_planet.amount;
        // log("Loaded other_amount_information.rogue_planet from .range.spaceObjectTypes.rogue_planet.amount: " + other_amount_information.rogue_planet)
        other_amount_information.anomaly = GALAXY_INFORMATION.range.spaceObjectTypes.anomaly.amount;
        log("Loaded other_amount_information.anomaly from .range.spaceObjectTypes.anomaly.amount: " + other_amount_information.anomaly)
        // other_amount_information.black_hole = GALAXY_INFORMATION.range.spaceObjectTypes.blackHole.amount;
        // log("Loaded other_amount_information.rogue_planet from .range.spaceObjectTypes.blackHole.amount: " + other_amount_information.black_hole)
        other_amount_information.main_black_hole = GALAXY_INFORMATION.range.spaceObjectTypes.mainBlackHole.amount;
        log("Loaded other_amount_information.main_black_hole from .range.spaceObjectTypes.mainBlackHole.amount: " + other_amount_information.main_black_hole)
        other_amount_information.update();
        log("Amount Values Updated for Special Objects");
        // log("");
    })
    .then(() => {
        console.info("\x1b[32mLoaded all Information!\x1b[0m");
    })
    .then(() => {
        
    })
    .catch(err => console.error(err));
