"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class NoDupID extends rule_1.Rule {
    documentation() {
        return {
            description: "The ID of an element must be unique.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("dom:ready", (event) => {
            const existing = {};
            const elements = event.document.querySelectorAll("[id]");
            for (const el of elements) {
                /* handle when the id attribute is set but omitted value: <p id></p> */
                if (!el.id) {
                    continue;
                }
                if (el.id in existing) {
                    const attr = el.getAttribute("id");
                    this.report(el, `Duplicate ID "${el.id}"`, attr.valueLocation);
                }
                existing[el.id] = true;
            }
        });
    }
}
exports.default = NoDupID;
