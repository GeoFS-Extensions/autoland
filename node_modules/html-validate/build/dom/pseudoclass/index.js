"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const first_child_1 = require("./first-child");
const last_child_1 = require("./last-child");
const nth_child_1 = require("./nth-child");
const table = {
    "first-child": first_child_1.firstChild,
    "last-child": last_child_1.lastChild,
    "nth-child": nth_child_1.nthChild,
};
function factory(name) {
    const fn = table[name];
    if (fn) {
        return fn;
    }
    else {
        throw new Error(`Pseudo-class "${name}" is not implemented`);
    }
}
exports.factory = factory;
