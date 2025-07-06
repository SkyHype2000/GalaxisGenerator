import * as res from "./resources";
export type resMapLayout = {
    legend: string[];
    map: number[][];
};
export type resourceFound = {
    "planet:atmosphere": res.resource[];
    "planet:noAtmosphere": res.resource[];
    planet: res.resource[];
    "moon:atmosphere": res.resource[];
    "moon:noAtmosphere": res.resource[];
    stellar_astroid: res.resource[];
    interstellar_t1_astroid: res.resource[];
    interstellar_t2_astroid: res.resource[];
    interstellar_t3_astroid: res.resource[];
    gas_planet: res.resource[];
    interstellar_space: res.resource[];
    neutron_star: res.resource[];
    none: res.resource[];
};
