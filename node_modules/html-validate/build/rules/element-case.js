"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const rule_1 = require("../rule");
const case_style_1 = require("./helper/case-style");
const defaults = {
    style: "lowercase",
};
class ElementCase extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
        this.style = new case_style_1.CaseStyle(this.options.style, "element-case");
    }
    documentation() {
        return {
            description: `Element tagname must be ${this.options.style}.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:open", (event) => {
            const { target, location } = event;
            this.validateCase(target, location);
        });
        this.on("tag:close", (event) => {
            const { target, previous } = event;
            this.validateMatchingCase(previous, target);
        });
    }
    validateCase(target, targetLocation) {
        const letters = target.tagName.replace(/[^a-z]+/gi, "");
        if (!this.style.match(letters)) {
            const location = context_1.sliceLocation(targetLocation, 1);
            this.report(target, `Element "${target.tagName}" should be ${this.style.name}`, location);
        }
    }
    validateMatchingCase(start, end) {
        /* handle when elements have have missing start or end tag */
        if (!start || !end || !start.tagName || !end.tagName) {
            return;
        }
        /* only check case if the names are a lowercase match to each other or it
         * will yield false positives when elements are closed in wrong order or
         * otherwise mismatched */
        if (start.tagName.toLowerCase() !== end.tagName.toLowerCase()) {
            return;
        }
        if (start.tagName !== end.tagName) {
            this.report(start, "Start and end tag must not differ in casing", end.location);
        }
    }
}
exports.default = ElementCase;
