"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConditionalComment = void 0;
const context_1 = require("../context");
const regexp = /<!(?:--)?\[(.*?)\](?:--)?>/g;
function* parseConditionalComment(comment, commentLocation) {
    let match;
    while ((match = regexp.exec(comment)) !== null) {
        const expression = match[1];
        const begin = match.index;
        const end = begin + match[0].length;
        const location = context_1.sliceLocation(commentLocation, begin, end, comment);
        yield {
            expression,
            location,
        };
    }
}
exports.parseConditionalComment = parseConditionalComment;
