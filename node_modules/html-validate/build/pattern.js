"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describePattern = exports.parsePattern = void 0;
function parsePattern(pattern) {
    switch (pattern) {
        case "kebabcase":
            return /^[a-z0-9-]+$/;
        case "camelcase":
            return /^[a-z][a-zA-Z0-9]+$/;
        case "underscore":
            return /^[a-z0-9_]+$/;
        default:
            // eslint-disable-next-line security/detect-non-literal-regexp
            return new RegExp(pattern);
    }
}
exports.parsePattern = parsePattern;
function describePattern(pattern) {
    const regexp = parsePattern(pattern).toString();
    switch (pattern) {
        case "kebabcase":
        case "camelcase":
        case "underscore": {
            return `${regexp} (${pattern})`;
        }
        default:
            return regexp;
    }
}
exports.describePattern = describePattern;
