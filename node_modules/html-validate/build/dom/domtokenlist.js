"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMTokenList = void 0;
const context_1 = require("../context");
const dynamic_value_1 = require("./dynamic-value");
function parse(text, baseLocation) {
    const tokens = [];
    const locations = baseLocation ? [] : undefined;
    for (let begin = 0; begin < text.length;) {
        let end = text.indexOf(" ", begin);
        /* if the last space was found move the position to the last character
         * in the string */
        if (end === -1) {
            end = text.length;
        }
        /* handle multiple spaces */
        const size = end - begin;
        if (size === 0) {
            begin++;
            continue;
        }
        /* extract token */
        const token = text.substring(begin, end);
        tokens.push(token);
        /* extract location */
        if (baseLocation) {
            const location = context_1.sliceLocation(baseLocation, begin, end);
            locations.push(location);
        }
        /* advance position to the character after the current end position */
        begin += size + 1;
    }
    return { tokens, locations };
}
class DOMTokenList extends Array {
    constructor(value, location) {
        if (value && typeof value === "string") {
            const { tokens, locations } = parse(value, location);
            super(...tokens);
            this.locations = locations;
        }
        else {
            super(0);
        }
        if (value instanceof dynamic_value_1.DynamicValue) {
            this.value = value.expr;
        }
        else {
            this.value = value;
        }
    }
    item(n) {
        return this[n];
    }
    location(n) {
        if (this.locations) {
            return this.locations[n];
        }
        else {
            throw new Error("Trying to access DOMTokenList location when base location isn't set");
        }
    }
    contains(token) {
        return this.indexOf(token) >= 0;
    }
}
exports.DOMTokenList = DOMTokenList;
