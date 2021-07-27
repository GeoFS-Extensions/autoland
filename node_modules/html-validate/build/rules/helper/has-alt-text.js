"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAltText = void 0;
function hasAltText(image) {
    const alt = image.getAttribute("alt");
    /* missing or boolean */
    if (alt === null || alt.value === null) {
        return false;
    }
    return alt.isDynamic || alt.value.toString() !== "";
}
exports.hasAltText = hasAltText;
