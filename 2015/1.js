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

import { readFileSync } from "node:fs";
import { printResult } from "../utils.js";

const input = readFileSync("../inputs/2015/1", "utf8").trim();

function solve1() {
    let floor = 0;

    for (let c of input) {
        switch (c) {
        case "(":
            floor++;
            break;

        case ")":
            floor--;
            break;

        default:
            console.warn("WARNING: invalid char in the input.");
            continue;
        }
    }

    return floor;
}

function solve2() {
    let floor = 0;
    let count = 0;

    for (let c of input) {
        if (floor == -1)
            break;

        switch (c) {
        case "(":
            floor++;
            break;

        case ")":
            floor--;
            break;

        default:
            console.warn("WARNING: invalid char in the input.");
            continue;
        }

        count++;
    }

    return count;
}

printResult(2015, 1, solve1(), solve2());
