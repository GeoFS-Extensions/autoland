"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../meta");
const rule_1 = require("../rule");
class ElementRequiredContent extends rule_1.Rule {
    documentation(context) {
        if (context) {
            return {
                description: `The <${context.node} element requires a <${context.missing}> to be present as content.`,
                url: rule_1.ruleDocumentationUrl(__filename),
            };
        }
        else {
            return {
                description: "Some elements has requirements on content that must be present.",
                url: rule_1.ruleDocumentationUrl(__filename),
            };
        }
    }
    setup() {
        this.on("dom:ready", (event) => {
            const doc = event.document;
            doc.visitDepthFirst((node) => {
                /* if element doesn't have metadata (unknown element) skip checking
                 * required content */
                if (!node.meta) {
                    return;
                }
                const rules = node.meta.requiredContent;
                for (const missing of meta_1.Validator.validateRequiredContent(node, rules)) {
                    const context = {
                        node: node.tagName,
                        missing,
                    };
                    this.report(node, `${node.annotatedName} element must have <${missing}> as content`, null, context);
                }
            });
        });
    }
}
exports.default = ElementRequiredContent;
