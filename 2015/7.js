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

const ANSWER_WIRE = "a";

const input = readFileSync("../inputs/2015/7", "utf8")
    .trim()
    .split("\n");

const operations = input.map(parseInput);

function parseInput(line) {
    const regexps = [
        {
            name: "assign",
            regexp: /^(\w+) -> (\w+)/
        },
        {
            name: "and",
            regexp: /^(\w+) AND (\w+) -> (\w+)/
        },
        {
            name: "or",
            regexp: /^(\w+) OR (\w+) -> (\w+)/
        },
        {
            name: "lshift",
            regexp: /^(\w+) LSHIFT (\w+) -> (\w+)/
        },
        {
            name: "rshift",
            regexp: /^(\w+) RSHIFT (\w+) -> (\w+)/
        },
        {
            name: "not",
            regexp: /^NOT (\w+) -> (\w+)/
        }
    ];

    let result = undefined;

    for (let {name, regexp} of regexps) {
        const isMatched = line.match(regexp);
        if (!isMatched) continue;

        const groups = isMatched.slice(1);
        result = {name};

        switch (name) {
        case "assign":
        case "not": {
            const [from, to] = groups;

            result.from = from;
            result.to = to;
        } break;

        case "and":
        case "or":
        case "lshift":
        case "rshift": {
            const [left, right, to] = groups;
            result.left = left;
            result.right = right;
            result.to = to;
        } break;
        }
    }

    if (!result) {
        console.warn("WARNING: unknown input line.");
        console.warn(`    ${line}`);
    }

    return result;
}

function makeWires() {
    const result = new Map();

    for (let line of input) {
        const group = line.match(/([a-z]+)/g);
        if (!group) continue;

        for (let name of group) {
            result.set(name, undefined);
        }
    }

    return result;
}

function solve1() {
    const wires = makeWires();

    let notDoneYet = true;
    while (notDoneYet) {
        notDoneYet = false;

        for (let operation of operations) {
            switch (operation.name) {
            case "assign": {
                const {from, to} = operation;
                const num = parseInt(from);

                if (!isNaN(num)) {
                    wires.set(to, num);
                    break;
                }

                const otherWire = wires.get(from);
                if (otherWire !== undefined) {
                    wires.set(to, otherWire);
                    break;
                }

                notDoneYet = true;
            } break;

            case "not": {
                const {from, to} = operation;
                const num = parseInt(from);

                if (!isNaN(num)) {
                    wires.set(to, 65536 + ~num);
                    break;
                }

                const otherWire = wires.get(from);
                if (otherWire !== undefined) {
                    wires.set(to, 65536 + ~otherWire);
                    break;
                }

                notDoneYet = true;
            } break;

            case "and": {
                const {left, right, to} = operation;
                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum & rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire & rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum & rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire & rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "or": {
                const {left, right, to} = operation;
                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum | rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire | rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum | rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire | rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "lshift": {
                const {left, right, to} = operation;
                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum << rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire << rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum << rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire << rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "rshift": {
                const {left, right, to} = operation;
                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum >> rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire >> rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum >> rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire >> rightNum);
                    break;
                }

                notDoneYet = true;
            } break;
            }
        }
    }

    return wires.get(ANSWER_WIRE);
}

function solve2() {
    const wires = makeWires();
    wires.set("b", solve1());

    let notDoneYet = true;
    while (notDoneYet) {
        notDoneYet = false;

        for (let operation of operations) {
            switch (operation.name) {
            case "assign": {
                const {from, to} = operation;

                if (wires.get(to) !== undefined) break;

                const num = parseInt(from);

                if (!isNaN(num)) {
                    wires.set(to, num);
                    break;
                }

                const otherWire = wires.get(from);
                if (otherWire !== undefined) {
                    wires.set(to, otherWire);
                    break;
                }

                notDoneYet = true;
            } break;

            case "not": {
                const {from, to} = operation;

                if (wires.get(to) !== undefined) break;

                const num = parseInt(from);

                if (!isNaN(num)) {
                    wires.set(to, 65536 + ~num);
                    break;
                }

                const otherWire = wires.get(from);
                if (otherWire !== undefined) {
                    wires.set(to, 65536 + ~otherWire);
                    break;
                }

                notDoneYet = true;
            } break;

            case "and": {
                const {left, right, to} = operation;

                if (wires.get(to) !== undefined) break;

                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum & rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire & rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum & rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire & rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "or": {
                const {left, right, to} = operation;

                if (wires.get(to) !== undefined) break;

                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum | rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire | rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum | rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire | rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "lshift": {
                const {left, right, to} = operation;

                if (wires.get(to) !== undefined) break;

                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum << rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire << rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum << rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire << rightNum);
                    break;
                }

                notDoneYet = true;
            } break;

            case "rshift": {
                const {left, right, to} = operation;

                if (wires.get(to) !== undefined) break;

                const leftNum = parseInt(left);
                const rightNum = parseInt(right);

                if (!isNaN(leftNum) && !isNaN(rightNum)) {
                    wires.set(to, leftNum >> rightNum);
                    break;
                }

                const leftWire = wires.get(left);
                const rightWire = wires.get(right);

                if (leftWire !== undefined && rightWire !== undefined) {
                    wires.set(to, leftWire >> rightWire);
                    break;
                }

                if (!isNaN(leftNum) && rightWire !== undefined) {
                    wires.set(to, leftNum >> rightWire);
                    break;
                }

                if (leftWire !== undefined && !isNaN(rightNum)) {
                    wires.set(to, leftWire >> rightNum);
                    break;
                }

                notDoneYet = true;
            } break;
            }
        }
    }

    return wires.get(ANSWER_WIRE);
}

printResult(2015, 7, solve1(), solve2());
