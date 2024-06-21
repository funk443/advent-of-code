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

const input = readFileSync("../inputs/2015/5", "utf8")
    .trim()
    .split("\n");

function isNiceString(str) {
    return str.match(/(.*[aeiou].*){3,}/g)
        && str.match(/([a-zA-z])\1/g)
        && !str.match(/ab|cd|pq|xy/g)
}

function isRealNiceString(str) {
    return str.match(/(.{2}).*\1/g)
        && str.match(/(.).\1/g);
}

function solve(predFn) {
    return input.filter(str => predFn(str)).length;
}

printResult(2015, 5, solve(isNiceString), solve(isRealNiceString));
