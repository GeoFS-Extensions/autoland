"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../../rule");
class H71 extends rule_1.Rule {
    documentation() {
        return {
            description: "H71: Providing a description for groups of form controls using fieldset and legend elements",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("dom:ready", (event) => {
            const { document } = event;
            const fieldsets = document.querySelectorAll(this.selector);
            for (const fieldset of fieldsets) {
                this.validate(fieldset);
            }
        });
    }
    validate(fieldset) {
        const legend = fieldset.querySelectorAll("> legend");
        if (legend.length === 0) {
            this.reportNode(fieldset);
        }
    }
    reportNode(node) {
        super.report(node, `${node.annotatedName} must have a <legend> as the first child`);
    }
    get selector() {
        return this.getTagsDerivedFrom("fieldset").join(",");
    }
}
exports.default = H71;
