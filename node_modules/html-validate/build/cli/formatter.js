"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const formatters_1 = require("../formatters");
const error_1 = require("../error");
function wrap(formatter, dst) {
    return (results) => {
        const output = formatter(results);
        if (dst) {
            const dir = path_1.default.dirname(dst);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            fs_1.default.writeFileSync(dst, output, "utf-8");
            return null;
        }
        else {
            return output;
        }
    };
}
function loadFormatter(name) {
    const fn = formatters_1.getFormatter(name);
    if (fn) {
        return fn;
    }
    try {
        /* eslint-disable-next-line import/no-dynamic-require */
        return require(name);
    }
    catch (error) {
        throw new error_1.UserError(`No formatter named "${name}"`, error);
    }
}
function getFormatter(formatters) {
    const fn = formatters.split(",").map((cur) => {
        const [name, dst] = cur.split("=", 2);
        const fn = loadFormatter(name);
        return wrap(fn, dst);
    });
    return (report) => {
        return fn
            .map((formatter) => formatter(report.results))
            .filter(Boolean)
            .join("\n");
    };
}
exports.getFormatter = getFormatter;
