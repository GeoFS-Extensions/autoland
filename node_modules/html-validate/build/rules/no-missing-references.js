"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const ARIA = ["aria-controls", "aria-describedby", "aria-labelledby"];
class NoMissingReferences extends rule_1.Rule {
    documentation(context) {
        if (context) {
            return {
                description: `The element ID "${context.value}" referenced by the ${context.key} attribute must point to an existing element.`,
                url: rule_1.ruleDocumentationUrl(__filename),
            };
        }
        else {
            return {
                description: `The element ID referenced by the attribute must point to an existing element.`,
                url: rule_1.ruleDocumentationUrl(__filename),
            };
        }
    }
    setup() {
        this.on("dom:ready", (event) => {
            const document = event.document;
            /* verify <label for=".."> */
            for (const node of document.querySelectorAll("label[for]")) {
                const attr = node.getAttribute("for");
                this.validateReference(document, node, attr);
            }
            /* verify <input list=".."> */
            for (const node of document.querySelectorAll("input[list]")) {
                const attr = node.getAttribute("list");
                this.validateReference(document, node, attr);
            }
            /* verify WAI-ARIA properties */
            for (const property of ARIA) {
                for (const node of document.querySelectorAll(`[${property}]`)) {
                    const attr = node.getAttribute(property);
                    this.validateReference(document, node, attr);
                }
            }
        });
    }
    validateReference(document, node, attr) {
        const id = attr.value;
        if (id instanceof dom_1.DynamicValue || id === null || id === "") {
            return;
        }
        const nodes = document.querySelectorAll(`[id="${id}"]`);
        if (nodes.length === 0) {
            const context = { key: attr.key, value: id };
            this.report(node, `Element references missing id "${id}"`, attr.valueLocation, context);
        }
    }
}
exports.default = NoMissingReferences;
