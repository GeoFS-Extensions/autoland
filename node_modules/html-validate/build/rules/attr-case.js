"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const case_style_1 = require("./helper/case-style");
const defaults = {
    style: "lowercase",
    ignoreForeign: true,
};
class AttrCase extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
        this.style = new case_style_1.CaseStyle(this.options.style, "attr-case");
    }
    documentation() {
        return {
            description: `Attribute name must be ${this.options.style}.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("attr", (event) => {
            if (this.isIgnored(event.target)) {
                return;
            }
            /* ignore case for dynamic attributes, the original attributes will be
             * checked instead (this prevents duplicated errors for the same source
             * attribute) */
            if (event.originalAttribute) {
                return;
            }
            const letters = event.key.replace(/[^a-z]+/gi, "");
            if (!this.style.match(letters)) {
                this.report(event.target, `Attribute "${event.key}" should be ${this.style.name}`);
            }
        });
    }
    isIgnored(node) {
        if (this.options.ignoreForeign) {
            return node.meta && node.meta.foreign;
        }
        else {
            return false;
        }
    }
}
exports.default = AttrCase;
