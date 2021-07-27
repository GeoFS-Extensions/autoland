"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicValue = void 0;
class DynamicValue {
    constructor(expr) {
        this.expr = expr;
    }
    toString() {
        return this.expr;
    }
}
exports.DynamicValue = DynamicValue;
