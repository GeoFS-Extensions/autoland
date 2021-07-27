"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedError = void 0;
class NestedError extends Error {
    constructor(message, nested) {
        super(message);
        Error.captureStackTrace(this, NestedError);
        if (nested) {
            this.stack += `\nCaused by: ${nested.stack}`;
        }
    }
}
exports.NestedError = NestedError;
