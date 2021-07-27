"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const defaults = {
    style: "omit",
};
class AttributeEmptyStyle extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
        this.hasInvalidStyle = parseStyle(this.options.style);
    }
    documentation() {
        return {
            description: "Require a specific style for attributes with empty values.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("dom:ready", (event) => {
            const doc = event.document;
            doc.visitDepthFirst((node) => {
                const meta = node.meta;
                /* ignore rule if element has no meta or meta does not specify attribute
                 * allowed values */
                if (!meta || !meta.attributes)
                    return;
                /* check all boolean attributes */
                for (const attr of node.attributes) {
                    /* only handle attributes which allows empty values */
                    if (!allowsEmpty(attr, meta.attributes)) {
                        continue;
                    }
                    /* skip attribute if the attribute is set to non-empty value
                     * (attribute-allowed-values deals with non-empty values)*/
                    if (!isEmptyValue(attr)) {
                        continue;
                    }
                    /* skip attribute if the style is valid */
                    if (!this.hasInvalidStyle(attr)) {
                        continue;
                    }
                    /* report error */
                    this.report(node, reportMessage(attr, this.options.style), attr.keyLocation);
                }
            });
        });
    }
}
exports.default = AttributeEmptyStyle;
function allowsEmpty(attr, rules) {
    return rules[attr.key] && rules[attr.key].includes("");
}
function isEmptyValue(attr) {
    /* dynamic values are ignored, assumed to contain a value */
    if (attr.isDynamic) {
        return false;
    }
    return attr.value === null || attr.value === "";
}
function parseStyle(style) {
    switch (style.toLowerCase()) {
        case "omit":
            return (attr) => attr.value !== null;
        case "empty":
            return (attr) => attr.value !== "";
        default:
            throw new Error(`Invalid style "${style}" for "attribute-empty-style" rule`);
    }
}
function reportMessage(attr, style) {
    const key = attr.key;
    switch (style.toLowerCase()) {
        case "omit":
            return `Attribute "${key}" should omit value`;
        case "empty":
            return `Attribute "${key}" value should be empty string`;
    }
    /* istanbul ignore next: the above switch should cover all cases */
    return "";
}
