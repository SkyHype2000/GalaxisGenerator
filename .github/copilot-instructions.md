# Copilot Instructions for GalaxisGenerator

## Project Overview
- This is a procedural galaxy generator written in TypeScript/JavaScript, focused on generating a large array of celestial objects with random properties and exporting results for web visualization.
- Main logic is in `script/ts/generate.ts`, with supporting modules in `script/ts/` and configuration/constants in `script/ts/config.ts`.
- Resource maps for different celestial types are stored as JSON in `src/resmap/` and loaded dynamically.
- Output is written to `web/galaxy.json` and visualized via `web/index.html` and `web/render.js`.

## Build & Run Workflow
- Source is TypeScript, but output JS files are written to the project root (`tsconfig.json`).
- To run the generator, use `startGenerateSystem.bat` (calls `node generate.js`).
- To run the resource map generator, use `startResMap.bat` (calls `node resmap.js`).
- No automated tests or build scripts; manual execution only.

## Key Patterns & Conventions
- All randomization uses a seeded RNG (`config.rng` from `seedrandom`).
- Object types and their generation logic are defined in `config.ts` and used throughout the generator.
- Galaxy objects are stored in a global array `galaxy` and written to disk at the end of generation.
- Resource generation uses map files named `resourceMap_<type>.json` in `src/resmap/`.
- Atmosphere, planet, and moon data are generated with custom functions, often using physical formulas (see comments for rationale).
- All output data is intended for web visualization, not scientific accuracy.

## Integration Points
- External dependencies: `seedrandom`, `pngjs` (see `package.json`).
- Type definitions for dependencies are included in `devDependencies`.
- Web frontend expects output in `web/galaxy.json`.

## Examples
- To add a new celestial type, update `config.ts` (`types` array) and add a corresponding resource map in `src/resmap/`.
- To change galaxy size or object count, edit `config.ts` (`radius`, `count`).
- To adjust physical formulas, modify functions in `generate.ts` (e.g., `generateAtmosphericInformation`).

## Notes
- No test framework or CI/CD; all changes are validated by running the generator and inspecting output.
- Project is intentionally "inefficient and inaccurate" for creative purposes.

---
If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
