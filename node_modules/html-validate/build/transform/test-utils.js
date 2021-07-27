"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSource = exports.transformString = exports.transformFile = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param filename - Filename to read data from. Must be readable.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
function transformFile(fn, filename, chain) {
    const data = fs_1.default.readFileSync(filename, "utf-8");
    const source = {
        filename,
        line: 1,
        column: 1,
        offset: 0,
        data,
    };
    return transformSource(fn, source, chain);
}
exports.transformFile = transformFile;
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param data - String to transform.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
function transformString(fn, data, chain) {
    const source = {
        filename: "inline",
        line: 1,
        column: 1,
        offset: 0,
        data,
    };
    return transformSource(fn, source, chain);
}
exports.transformString = transformString;
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param data - Source to transform.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
function transformSource(fn, source, chain) {
    const defaultChain = (source) => [source];
    const context = {
        hasChain: /* istanbul ignore next */ () => true,
        chain: chain || defaultChain,
    };
    return Array.from(fn.call(context, source));
}
exports.transformSource = transformSource;
