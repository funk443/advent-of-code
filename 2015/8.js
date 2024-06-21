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

const input = readFileSync("../inputs/2015/8", "utf8")
    .trim()
    .split("\n");

function solve1() {
    let chars = 0;
    let memory = 0;

    for (let line of input) {
        const strContent = line.slice(1, -1);
        chars += line.length;

        const matched = strContent.match(/\w|\\{2}|\\"|\\x.{2}/g) ?? [];
        memory += matched.length;
    }

    return chars - memory;
}

function solve2() {
    let oldChars = 0;
    let newChars = 0;

    for (let line of input) {
        oldChars += line.length;

        const replaced = line
            .replace(/\\/g, "\\\\")
            .replace(/"/g, "\\\"");
        newChars += (replaced.length + 2);
    }

    return newChars - oldChars;
}

printResult(2015, 8, solve1(), solve2());
