"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const h30_1 = __importDefault(require("./h30"));
const h32_1 = __importDefault(require("./h32"));
const h36_1 = __importDefault(require("./h36"));
const h37_1 = __importDefault(require("./h37"));
const h67_1 = __importDefault(require("./h67"));
const h71_1 = __importDefault(require("./h71"));
const bundledRules = {
    "wcag/h30": h30_1.default,
    "wcag/h32": h32_1.default,
    "wcag/h36": h36_1.default,
    "wcag/h37": h37_1.default,
    "wcag/h67": h67_1.default,
    "wcag/h71": h71_1.default,
};
exports.default = bundledRules;
