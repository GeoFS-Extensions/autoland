"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const a17y_1 = __importDefault(require("./a17y"));
const document_1 = __importDefault(require("./document"));
const recommended_1 = __importDefault(require("./recommended"));
const standard_1 = __importDefault(require("./standard"));
const presets = {
    "html-validate:a17y": a17y_1.default,
    "html-validate:document": document_1.default,
    "html-validate:recommended": recommended_1.default,
    "html-validate:standard": standard_1.default,
    /* @deprecated aliases */
    "htmlvalidate:recommended": recommended_1.default,
    "htmlvalidate:document": document_1.default,
};
module.exports = presets;
