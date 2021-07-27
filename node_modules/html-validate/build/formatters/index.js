"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatter = void 0;
const checkstyle_1 = __importDefault(require("./checkstyle"));
const codeframe_1 = __importDefault(require("./codeframe"));
const json_1 = __importDefault(require("./json"));
const stylish_1 = __importDefault(require("./stylish"));
const text_1 = __importDefault(require("./text"));
const availableFormatters = {
    checkstyle: checkstyle_1.default,
    codeframe: codeframe_1.default,
    json: json_1.default,
    stylish: stylish_1.default,
    text: text_1.default,
};
/**
 * Get formatter function by name.
 *
 * @param name - Name of formatter.
 * @returns Formatter function or null if it doesn't exist.
 */
function getFormatter(name) {
    var _a;
    return (_a = availableFormatters[name]) !== null && _a !== void 0 ? _a : null;
}
exports.getFormatter = getFormatter;
