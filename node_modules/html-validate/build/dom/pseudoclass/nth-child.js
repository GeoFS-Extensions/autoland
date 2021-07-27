"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nthChild = void 0;
const cache = {};
function getNthChild(node) {
    if (!node.parent) {
        return -1;
    }
    if (!cache[node.unique]) {
        const parent = node.parent;
        const index = parent.childElements.findIndex((cur) => {
            return cur.unique === node.unique;
        });
        cache[node.unique] = index + 1; /* nthChild starts at 1 */
    }
    return cache[node.unique];
}
function nthChild(node, args) {
    const n = parseInt(args.trim(), 10);
    const cur = getNthChild(node);
    return cur === n;
}
exports.nthChild = nthChild;
