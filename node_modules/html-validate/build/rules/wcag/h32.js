"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../../rule");
class H32 extends rule_1.Rule {
    documentation() {
        return {
            description: "WCAG 2.1 requires each `<form>` element to have at least one submit button.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        /* query all tags with form property, normally this is only the <form> tag
         * but with custom element metadata other tags might be considered form
         * (usually a component wrapping a <form> element) */
        const formTags = this.getTagsWithProperty("form");
        const formSelector = formTags.join(",");
        this.on("dom:ready", (event) => {
            const forms = event.document.querySelectorAll(formSelector);
            forms.forEach((node) => {
                /* find submit buttons */
                for (const button of node.querySelectorAll("button,input")) {
                    const type = button.getAttribute("type");
                    if (type && type.valueMatches("submit")) {
                        return;
                    }
                }
                this.report(node, `<${node.tagName}> element must have a submit button`);
            });
        });
    }
}
exports.default = H32;
