"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const xmlns = /^(.+):.+$/;
const defaults = {
    ignoreForeign: true,
    ignoreXML: true,
};
class NoSelfClosing extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
    }
    documentation(tagName) {
        tagName = tagName || "element";
        return {
            description: `Self-closing elements are disallowed. Use regular end tag <${tagName}></${tagName}> instead of self-closing <${tagName}/>.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:close", (event) => {
            const active = event.previous; // The current active element (that is, the current element on the stack)
            if (!isRelevant(active, this.options)) {
                return;
            }
            this.validateElement(active);
        });
    }
    validateElement(node) {
        if (node.closed !== dom_1.NodeClosed.VoidSelfClosed) {
            return;
        }
        this.report(node, `<${node.tagName}> must not be self-closed`, null, node.tagName);
    }
}
exports.default = NoSelfClosing;
function isRelevant(node, options) {
    /* tags in XML namespaces are relevant only if ignoreXml is false, in which
     * case assume all xml elements must not be self-closed */
    if (node.tagName && node.tagName.match(xmlns)) {
        return !options.ignoreXML;
    }
    /* nodes with missing metadata is assumed relevant */
    if (!node.meta) {
        return true;
    }
    if (node.meta.void) {
        return false;
    }
    /* foreign elements are relevant only if ignoreForeign is false, in which case
     * assume all foreign must not be self-closed */
    if (node.meta.foreign) {
        return !options.ignoreForeign;
    }
    return true;
}
