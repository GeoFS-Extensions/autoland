"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstChild = void 0;
function firstChild(node) {
    return node.previousSibling === null;
}
exports.firstChild = firstChild;
