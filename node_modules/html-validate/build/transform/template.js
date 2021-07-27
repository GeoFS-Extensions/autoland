"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateExtractor = exports.computeOffset = void 0;
const fs_1 = __importDefault(require("fs"));
const espree = require("espree");
const walk = require("acorn-walk");
function joinTemplateLiteral(nodes) {
    let offset = nodes[0].start;
    let output = "";
    for (const node of nodes) {
        output += " ".repeat(node.start - offset);
        output += node.value.raw;
        offset = node.end;
    }
    return output;
}
/**
 * Compute source offset from line and column and the given markup.
 *
 * @param position - Line and column.
 * @param data - Source markup.
 * @returns The byte offset into the markup which line and column corresponds to.
 */
function computeOffset(position, data) {
    let line = position.line;
    let column = position.column + 1;
    for (let i = 0; i < data.length; i++) {
        if (line > 1) {
            /* not yet on the correct line */
            if (data[i] === "\n") {
                line--;
            }
        }
        else if (column > 1) {
            /* not yet on the correct column */
            column--;
        }
        else {
            /* line/column found, return current position */
            return i;
        }
    }
    /* istanbul ignore next: should never reach this line unless espree passes bad
     * positions, no sane way to test */
    throw new Error("Failed to compute location offset from position");
}
exports.computeOffset = computeOffset;
function extractLiteral(node, filename, data) {
    switch (node.type) {
        /* ignored nodes */
        case "FunctionExpression":
        case "Identifier":
            return null;
        case "Literal":
            if (typeof node.value !== "string") {
                return null;
            }
            return {
                data: node.value.toString(),
                filename: null,
                line: node.loc.start.line,
                column: node.loc.start.column + 1,
                offset: computeOffset(node.loc.start, data) + 1,
            };
        case "TemplateLiteral":
            return {
                data: joinTemplateLiteral(node.quasis),
                filename: null,
                line: node.loc.start.line,
                column: node.loc.start.column + 1,
                offset: computeOffset(node.loc.start, data) + 1,
            };
        case "TaggedTemplateExpression":
            return {
                data: joinTemplateLiteral(node.quasi.quasis),
                filename: null,
                line: node.quasi.loc.start.line,
                column: node.quasi.loc.start.column + 1,
                offset: computeOffset(node.quasi.loc.start, data) + 1,
            };
        case "ArrowFunctionExpression": {
            const whitelist = ["Literal", "TemplateLiteral"];
            if (whitelist.includes(node.body.type)) {
                return extractLiteral(node.body, filename, data);
            }
            else {
                return null;
            }
        }
        /* istanbul ignore next: this only provides a better error, all currently known nodes are tested */
        default: {
            const loc = node.loc.start;
            const context = `${filename}:${loc.line}:${loc.column}`;
            throw Error(`Unhandled node type "${node.type}" at "${context}" in extractLiteral`);
        }
    }
}
function compareKey(node, key, filename) {
    switch (node.type) {
        case "Identifier":
            return node.name === key;
        case "Literal":
            return node.value === key;
        /* istanbul ignore next: this only provides a better error, all currently known nodes are tested */
        default: {
            const loc = node.loc.start;
            const context = `${filename}:${loc.line}:${loc.column}`;
            throw Error(`Unhandled node type "${node.type}" at "${context}" in compareKey`);
        }
    }
}
class TemplateExtractor {
    constructor(ast, filename, data) {
        this.ast = ast;
        this.filename = filename;
        this.data = data;
    }
    static fromFilename(filename) {
        const source = fs_1.default.readFileSync(filename, "utf-8");
        const ast = espree.parse(source, {
            ecmaVersion: 2017,
            sourceType: "module",
            loc: true,
        });
        return new TemplateExtractor(ast, filename, source);
    }
    /**
     * Create a new [[TemplateExtractor]] from javascript source code.
     *
     * `Source` offsets will be relative to the string, i.e. offset 0 is the first
     * character of the string. If the string is only a subset of a larger string
     * the offsets must be adjusted manually.
     *
     * @param source - Source code.
     * @param filename - Optional filename to set in the resulting
     * `Source`. Defauls to `"inline"`.
     */
    static fromString(source, filename) {
        const ast = espree.parse(source, {
            ecmaVersion: 2017,
            sourceType: "module",
            loc: true,
        });
        return new TemplateExtractor(ast, filename || "inline", source);
    }
    /**
     * Convenience function to create a [[Source]] instance from an existing file.
     *
     * @param filename - Filename with javascript source code. The file must exist
     * and be readable by the user.
     * @returns An array of Source's suitable for passing to [[Engine]] linting
     * functions.
     */
    static createSource(filename) {
        const data = fs_1.default.readFileSync(filename, "utf-8");
        return [
            {
                column: 1,
                data,
                filename,
                line: 1,
                offset: 0,
            },
        ];
    }
    /**
     * Extract object properties.
     *
     * Given a key `"template"` this method finds all objects literals with a
     * `"template"` property and creates a [[Source]] instance with proper offsets
     * with the value of the property. For instance:
     *
     * ```
     * const myObj = {
     *   foo: 'bar',
     * };
     * ```
     *
     * The above snippet would yield a `Source` with the content `bar`.
     *
     */
    extractObjectProperty(key) {
        const result = [];
        const { filename, data } = this;
        walk.simple(this.ast, {
            Property(node) {
                if (compareKey(node.key, key, filename)) {
                    const source = extractLiteral(node.value, filename, data);
                    if (source) {
                        source.filename = filename;
                        result.push(source);
                    }
                }
            },
        });
        return result;
    }
}
exports.TemplateExtractor = TemplateExtractor;
