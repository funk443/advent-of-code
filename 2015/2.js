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

const input = readFileSync("../inputs/2015/2", "utf8")
    .trim()
    .split("\n")
    .map(raw => raw.split("x").map(rawNum => parseInt(rawNum)))
    .map(dim => dim.sort((a, b) => a - b));

function calc1([a, b, c]) {
    return 2 * (a * b + b * c + c * a) + a * b;
}

function calc2([a, b, c]) {
    return 2 * (a + b) + a * b * c;
}

function solve(calcFn) {
    return input.reduce(
        (acc, currentVal) => acc + calcFn(currentVal),
        0
    );
}

printResult(2015, 2, solve(calc1), solve(calc2));
