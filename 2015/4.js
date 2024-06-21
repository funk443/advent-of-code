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
import md5 from "js-md5";

const input = readFileSync("../inputs/2015/4", "utf8").trim();

function hasNZerosAtStart(str, n) {
    return str.slice(0, n) == "0".repeat(n);
}

function solve(nZero) {
    let count = 1;

    while (true) {
        if (hasNZerosAtStart(md5(`${input}${count}`), nZero))
            return count;
        count++;
    }
}

printResult(2015, 4, solve(5), solve(6));
