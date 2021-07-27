"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const DEFAULT_EXTENSIONS = ["html"];
function isDirectory(filename) {
    const st = fs_1.default.statSync(filename);
    return st.isDirectory();
}
function directoryPattern(extensions) {
    switch (extensions.length) {
        case 0:
            return "**";
        case 1:
            return path_1.default.join("**", `*.${extensions[0]}`);
        default:
            return path_1.default.join("**", `*.{${extensions.join(",")}}`);
    }
}
/**
 * Takes a number of file patterns (globs) and returns array of expanded
 * filenames.
 */
function expandFiles(patterns, options) {
    const cwd = options.cwd || process.cwd();
    const extensions = options.extensions || DEFAULT_EXTENSIONS;
    const files = patterns.reduce((result, pattern) => {
        /* process - as standard input */
        if (pattern === "-") {
            result.push("/dev/stdin");
            return result;
        }
        for (const filename of glob_1.default.sync(pattern, { cwd })) {
            /* if file is a directory recursively expand files from it */
            const fullpath = path_1.default.join(cwd, filename);
            if (isDirectory(fullpath)) {
                const dir = expandFiles([directoryPattern(extensions)], Object.assign({}, options, { cwd: fullpath }));
                result = result.concat(dir.map((cur) => path_1.default.join(filename, cur)));
                continue;
            }
            result.push(filename);
        }
        return result;
    }, []);
    /* only return unique matches */
    return Array.from(new Set(files));
}
exports.expandFiles = expandFiles;
