"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserError = void 0;
class ParserError extends Error {
    constructor(location, message) {
        super(message);
        this.location = location;
    }
}
exports.ParserError = ParserError;
