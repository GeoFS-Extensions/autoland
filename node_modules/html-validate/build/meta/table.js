"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaTable = void 0;
const ajv_1 = __importDefault(require("ajv"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const json_merge_patch_1 = __importDefault(require("json-merge-patch"));
const error_1 = require("../error");
const elements_json_1 = __importDefault(require("../schema/elements.json"));
const dynamicKeys = [
    "metadata",
    "flow",
    "sectioning",
    "heading",
    "phrasing",
    "embedded",
    "interactive",
];
const functionTable = {
    isDescendant,
    hasAttribute,
    matchAttribute,
};
function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
function overwriteMerge(a, b) {
    return b;
}
/**
 * AJV keyword "regexp" to validate the type to be a regular expression.
 * Injects errors with the "type" keyword to give the same output.
 */
/* istanbul ignore next: manual testing */
const ajvRegexpValidate = function (data, dataPath) {
    const valid = data instanceof RegExp;
    if (!valid) {
        ajvRegexpValidate.errors = [
            {
                dataPath,
                schemaPath: undefined,
                keyword: "type",
                message: "should be regexp",
                params: {
                    keyword: "type",
                },
            },
        ];
    }
    return valid;
};
const ajvRegexpKeyword = {
    schema: false,
    errors: true,
    validate: ajvRegexpValidate,
};
class MetaTable {
    constructor() {
        this.elements = {};
        this.schema = clone(elements_json_1.default);
    }
    init() {
        this.resolveGlobal();
    }
    /**
     * Extend validation schema.
     */
    extendValidationSchema(patch) {
        if (patch.properties) {
            this.schema = json_merge_patch_1.default.apply(this.schema, {
                patternProperties: {
                    "^.*$": {
                        properties: patch.properties,
                    },
                },
            });
        }
        if (patch.definitions) {
            this.schema = json_merge_patch_1.default.apply(this.schema, {
                definitions: patch.definitions,
            });
        }
    }
    /**
     * Load metadata table from object.
     *
     * @param obj - Object with metadata to load
     * @param filename - Optional filename used when presenting validation error
     */
    loadFromObject(obj, filename = null) {
        const ajv = new ajv_1.default({ jsonPointers: true });
        ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
        ajv.addKeyword("regexp", ajvRegexpKeyword);
        const validator = ajv.compile(this.schema);
        const valid = validator(obj);
        if (!valid) {
            throw new error_1.SchemaValidationError(filename, `Element metadata is not valid`, obj, this.schema, validator.errors);
        }
        for (const key of Object.keys(obj)) {
            if (key === "$schema")
                continue;
            this.addEntry(key, obj[key]);
        }
    }
    /**
     * Load metadata table from filename
     *
     * @param filename - Filename to load
     */
    loadFromFile(filename) {
        try {
            /* remove cached copy so we always load a fresh copy, important for
             * editors which keep a long-running instance of [[HtmlValidate]]
             * around. */
            delete require.cache[require.resolve(filename)];
            /* load using require as it can process both js and json */
            const data = require(filename); // eslint-disable-line import/no-dynamic-require
            this.loadFromObject(data, filename);
        }
        catch (err) {
            if (err instanceof error_1.SchemaValidationError) {
                throw err;
            }
            throw new error_1.UserError(`Failed to load element metadata from "${filename}"`, err);
        }
    }
    /**
     * Get [[MetaElement]] for the given tag or null if the element doesn't exist.
     *
     * @returns A shallow copy of metadata.
     */
    getMetaFor(tagName) {
        tagName = tagName.toLowerCase();
        return this.elements[tagName]
            ? Object.assign({}, this.elements[tagName])
            : null;
    }
    /**
     * Find all tags which has enabled given property.
     */
    getTagsWithProperty(propName) {
        return Object.entries(this.elements)
            .filter(([, entry]) => entry[propName])
            .map(([tagName]) => tagName);
    }
    /**
     * Find tag matching tagName or inheriting from it.
     */
    getTagsDerivedFrom(tagName) {
        return Object.entries(this.elements)
            .filter(([key, entry]) => key === tagName || entry.inherit === tagName)
            .map(([tagName]) => tagName);
    }
    addEntry(tagName, entry) {
        let parent = this.elements[tagName] || {};
        /* handle inheritance */
        if (entry.inherit) {
            const name = entry.inherit;
            parent = this.elements[name];
            if (!parent) {
                throw new error_1.UserError(`Element <${tagName}> cannot inherit from <${name}>: no such element`);
            }
        }
        /* merge all sources together */
        const expanded = deepmerge_1.default(parent, Object.assign(Object.assign({}, entry), { tagName }), { arrayMerge: overwriteMerge });
        expandRegex(expanded);
        this.elements[tagName] = expanded;
    }
    /**
     * Finds the global element definition and merges each known element with the
     * global, e.g. to assign global attributes.
     */
    resolveGlobal() {
        /* skip if there is no global elements */
        if (!this.elements["*"])
            return;
        /* fetch and remove the global element, it should not be resolvable by
         * itself */
        const global = this.elements["*"];
        delete this.elements["*"];
        /* hack: unset default properties which global should not override */
        delete global.tagName;
        delete global.void;
        /* merge elements */
        for (const [tagName, entry] of Object.entries(this.elements)) {
            this.elements[tagName] = this.mergeElement(entry, global);
        }
    }
    mergeElement(a, b) {
        return deepmerge_1.default(a, b);
    }
    resolve(node) {
        if (node.meta) {
            expandProperties(node, node.meta);
        }
    }
}
exports.MetaTable = MetaTable;
function expandProperties(node, entry) {
    for (const key of dynamicKeys) {
        const property = entry[key];
        if (property && typeof property !== "boolean") {
            entry[key] = evaluateProperty(node, property);
        }
    }
}
/**
 * Given a string it returns either the string as-is or if the string is wrapped
 * in /../ it creates and returns a regex instead.
 */
function expandRegexValue(value) {
    if (value instanceof RegExp) {
        return value;
    }
    const match = value.match(/^\/(.*)\/([i]*)$/);
    if (match) {
        const [, expr, flags] = match;
        // eslint-disable-next-line security/detect-non-literal-regexp
        return new RegExp(expr, flags);
    }
    else {
        return value;
    }
}
/**
 * Expand all regular expressions in strings ("/../"). This mutates the object.
 */
function expandRegex(entry) {
    if (!entry.attributes)
        return;
    for (const [name, values] of Object.entries(entry.attributes)) {
        if (values) {
            entry.attributes[name] = values.map(expandRegexValue);
        }
        else {
            delete entry.attributes[name];
        }
    }
}
function evaluateProperty(node, expr) {
    const [func, options] = parseExpression(expr);
    return func(node, options);
}
function parseExpression(expr) {
    if (typeof expr === "string") {
        return parseExpression([expr, {}]);
    }
    else {
        const [funcName, options] = expr;
        const func = functionTable[funcName];
        if (!func) {
            throw new Error(`Failed to find function "${funcName}" when evaluating property expression`);
        }
        return [func, options];
    }
}
function isDescendant(node, tagName) {
    if (typeof tagName !== "string") {
        throw new Error(`Property expression "isDescendant" must take string argument when evaluating metadata for <${node.tagName}>`);
    }
    let cur = node.parent;
    while (!cur.isRootElement()) {
        if (cur.is(tagName)) {
            return true;
        }
        cur = cur.parent;
    }
    return false;
}
function hasAttribute(node, attr) {
    if (typeof attr !== "string") {
        throw new Error(`Property expression "hasAttribute" must take string argument when evaluating metadata for <${node.tagName}>`);
    }
    return node.hasAttribute(attr);
}
function matchAttribute(node, match) {
    if (!Array.isArray(match) || match.length !== 3) {
        throw new Error(`Property expression "matchAttribute" must take [key, op, value] array as argument when evaluating metadata for <${node.tagName}>`);
    }
    const [key, op, value] = match.map((x) => x.toLowerCase());
    const nodeValue = (node.getAttributeValue(key) || "").toLowerCase();
    switch (op) {
        case "!=":
            return nodeValue !== value;
        case "=":
            return nodeValue === value;
        default:
            throw new Error(`Property expression "matchAttribute" has invalid operator "${op}" when evaluating metadata for <${node.tagName}>`);
    }
}
