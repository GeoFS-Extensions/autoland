"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const nested_error_1 = require("./nested-error");
class UserError extends nested_error_1.NestedError {
}
exports.UserError = UserError;
