"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const defaults = {
    style: "omit",
};
var Style;
(function (Style) {
    Style[Style["AlwaysOmit"] = 1] = "AlwaysOmit";
    Style[Style["AlwaysSelfclose"] = 2] = "AlwaysSelfclose";
})(Style || (Style = {}));
class VoidStyle extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
        this.style = parseStyle(this.options.style);
    }
    documentation(context) {
        const doc = {
            description: "The current configuration requires a specific style for ending void elements.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (context) {
            const [desc, end] = styleDescription(context.style);
            doc.description = `The current configuration requires void elements to ${desc}, use <${context.tagName}${end}> instead.`;
        }
        return doc;
    }
    setup() {
        this.on("tag:close", (event) => {
            const active = event.previous; // The current active element (that is, the current element on the stack)
            if (active && active.meta) {
                this.validateActive(active);
            }
        });
    }
    validateActive(node) {
        /* ignore non-void elements, they must be closed with regular end tag */
        if (!node.voidElement) {
            return;
        }
        if (this.shouldBeOmitted(node)) {
            this.report(node, `Expected omitted end tag <${node.tagName}> instead of self-closing element <${node.tagName}/>`);
        }
        if (this.shouldBeSelfClosed(node)) {
            this.report(node, `Expected self-closing element <${node.tagName}/> instead of omitted end-tag <${node.tagName}>`);
        }
    }
    report(node, message) {
        const context = {
            style: this.style,
            tagName: node.tagName,
        };
        super.report(node, message, null, context);
    }
    shouldBeOmitted(node) {
        return (this.style === Style.AlwaysOmit &&
            node.closed === dom_1.NodeClosed.VoidSelfClosed);
    }
    shouldBeSelfClosed(node) {
        return (this.style === Style.AlwaysSelfclose &&
            node.closed === dom_1.NodeClosed.VoidOmitted);
    }
}
exports.default = VoidStyle;
function parseStyle(name) {
    switch (name) {
        case "omit":
            return Style.AlwaysOmit;
        case "selfclose":
        case "selfclosing":
            return Style.AlwaysSelfclose;
        default:
            throw new Error(`Invalid style "${name}" for "void-style" rule`);
    }
}
function styleDescription(style) {
    switch (style) {
        case Style.AlwaysOmit:
            return ["omit end tag", ""];
        case Style.AlwaysSelfclose:
            return ["be self-closed", "/"];
        // istanbul ignore next: will only happen if new styles are added, otherwise this isn't reached
        default:
            throw new Error(`Unknown style`);
    }
}
