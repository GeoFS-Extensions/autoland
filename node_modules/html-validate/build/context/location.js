"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceLocation = void 0;
function sliceSize(size, begin, end) {
    if (typeof size !== "number") {
        return size;
    }
    if (typeof end !== "number") {
        return size - begin;
    }
    if (end < 0) {
        end = size + end;
    }
    return Math.min(size, end - begin);
}
/**
 * Calculate a new location by offsetting this location.
 *
 * If the references text with newlines the wrap parameter must be set to
 * properly calculate line and column information. If not given the text is
 * assumed to contain no newlines.
 *
 * @param location Source location
 * @param begin - Start location. Default is 0.
 * @param end - End location. Default is size of location. Negative values are
 * counted from end, e.g. `-2` means `size - 2`.
 * @param wrap - If given, line/column is wrapped for each newline occuring
 * before location end.
 */
function sliceLocation(location, begin, end, wrap) {
    if (!location)
        return null;
    const size = sliceSize(location.size, begin, end);
    const sliced = {
        filename: location.filename,
        offset: location.offset + begin,
        line: location.line,
        column: location.column + begin,
        size,
    };
    /* if text content is provided try to find all newlines and modify line/column accordingly */
    if (wrap) {
        let index = -1;
        const col = sliced.column;
        do {
            index = wrap.indexOf("\n", index + 1);
            if (index >= 0 && index < begin) {
                sliced.column = col - (index + 1);
                sliced.line++;
            }
            else {
                break;
            }
        } while (true); // eslint-disable-line no-constant-condition
    }
    return sliced;
}
exports.sliceLocation = sliceLocation;
