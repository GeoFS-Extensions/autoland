"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const defaults = {
    include: null,
    exclude: null,
};
class NoInlineStyle extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
    }
    documentation() {
        return {
            description: "Inline style is a sign of unstructured CSS. Use class or ID with a separate stylesheet.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("attr", (event) => {
            if (this.isRelevant(event)) {
                this.report(event.target, "Inline style is not allowed");
            }
        });
    }
    isRelevant(event) {
        if (event.key !== "style") {
            return false;
        }
        const { include, exclude } = this.options;
        const key = event.originalAttribute || event.key;
        /* ignore attributes not present in "include" */
        if (include && !include.includes(key)) {
            return false;
        }
        /* ignore attributes present in "exclude" */
        if (exclude && exclude.includes(key)) {
            return false;
        }
        return true;
    }
}
exports.default = NoInlineStyle;
