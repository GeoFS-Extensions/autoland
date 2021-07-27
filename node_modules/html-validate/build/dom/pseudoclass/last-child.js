"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastChild = void 0;
function lastChild(node) {
    return node.nextSibling === null;
}
exports.lastChild = lastChild;
