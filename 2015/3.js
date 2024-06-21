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

const input = readFileSync("../inputs/2015/3", "utf8").trim();

function removeDuplicates(arr) {
    function isPosEqual([x1, y1], [x2, y2]) {
        return x1 == x2 && y1 == y2;
    }

    const result = [];

    for (let pos of arr) {
        if (result.find(visitedPos => isPosEqual(pos, visitedPos)))
            continue;

        result.push(pos);
    }

    return result;
}

function solve1() {
    const visited = [];
    const pos = [0, 0];

    for (let c of input) {
        visited.push(structuredClone(pos));

        switch (c) {
        case "^":
            pos[1]++;
            break;

        case "v":
            pos[1]--;
            break;

        case "<":
            pos[0]--;
            break;

        case ">":
            pos[0]++;
            break;

        default:
            console.warn("WARNING: invalid char in the input.");
            console.warn(`    ${c}`);
            continue;
        }
    }

    return removeDuplicates(visited).length;
}

function solve2() {
    function* whoseTurn() {
        let turn = true;

        while (true) {
            turn = !turn;
            yield turn;
        }
    }

    const visited = [];
    const pos1 = [0, 0];
    const pos2 = [0, 0];
    const whose = whoseTurn();

    for (let c of input) {
        visited.push(structuredClone(pos1));
        visited.push(structuredClone(pos2));
        const pos = whose.next().value ? pos1 : pos2;
        switch (c) {
        case "^":
            pos[1]++;
            break;

        case "v":
            pos[1]--;
            break;

        case "<":
            pos[0]--;
            break;

        case ">":
            pos[0]++;
            break;

        default:
            console.warn("WARNING: invalid char in the input.");
            console.warn(`    ${c}`);
            continue;
        }
    }

    return removeDuplicates(visited).length;
}

printResult(2015, 3, solve1(), solve2());
