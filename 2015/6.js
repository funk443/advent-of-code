// Copyright (C) 2024  CToID <funk443@yandex.com>
//
// This program is free software: you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see
// <https://www.gnu.org/licenses/>.

import {readFileSync} from "node:fs";
import {printResult} from "../utils.js";

const LIGHTS_WIDTH = 1000;
const LIGHTS_HEIGHT = 1000;

const input = readFileSync("../inputs/2015/6", "utf8")
    .trim()
    .split("\n")
    .map(rawStr => parseInstruction(rawStr));

function parseInstruction(rawStr) {
    const result = {};
    const [x1, y1, x2, y2] = rawStr
        .match(/\d+/g)
        .map(raw => parseInt(raw));

    result.start = [x1, y1];
    result.end = [x2, y2];

    if (rawStr.match(/on/))
        result.mode = "on";
    else if (rawStr.match(/off/))
        result.mode = "off";
    else
        result.mode = "toggle";

    return result;
}

function applyToRegion(
    lights,
    [x1, y1],
    [x2, y2],
    fn
) {
    function calcIndex(x, y) {
        return y * LIGHTS_WIDTH + x % LIGHTS_WIDTH;
    }

    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            const index = calcIndex(x, y);
            lights[index] = fn(lights[index]);
        }
    }

    return lights;
}

function solve1() {
    const lights = new Array(LIGHTS_WIDTH * LIGHTS_HEIGHT).fill(0);

    for (let {start, end, mode} of input) {
        switch (mode) {
        case "on":
            applyToRegion(lights, start, end, _ => 1);
            break;

        case "off":
            applyToRegion(lights, start, end, _ => 0);
            break;

        case "toggle":
            applyToRegion(lights, start, end, x => x == 1 ? 0 : 1);
            break;

        default:
            console.warn("WARNING: unknown mode in the input.");
            console.warn(`    ${mode}`);
            continue;
        }
    }

    return lights.filter(x => x == 1).length;
}

function solve2() {
    const lights = new Array(LIGHTS_WIDTH * LIGHTS_HEIGHT).fill(0);

    for (let {start, end, mode} of input) {
        switch (mode) {
        case "on":
            applyToRegion(lights, start, end, x => x + 1);
            break;

        case "off":
            applyToRegion(lights, start, end, x => Math.max(0, x - 1));
            break;

        case "toggle":
            applyToRegion(lights, start, end, x => x + 2);
            break;

        default:
            console.warn("WARNING: unknown mode in the input.");
            console.warn(`    ${mode}`);
            continue;
        }
    }

    return lights.reduce(
        (acc, brightness) => acc + brightness,
        0
    );
}

printResult(2015, 6, solve1(), solve2());
