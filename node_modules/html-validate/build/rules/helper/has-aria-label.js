"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAriaLabel = void 0;
function hasAriaLabel(node) {
    const label = node.getAttribute("aria-label");
    /* missing or boolean */
    if (label === null || label.value === null) {
        return false;
    }
    return label.isDynamic || label.value.toString() !== "";
}
exports.hasAriaLabel = hasAriaLabel;
