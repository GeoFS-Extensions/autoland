"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class NoUnknownElements extends rule_1.Rule {
    documentation(context) {
        const element = context ? ` <${context}>` : "";
        return {
            description: `An unknown element${element} was used. If this is a Custom Element you need to supply element metadata for it.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:open", (event) => {
            const node = event.target;
            if (!node.meta) {
                this.report(node, `Unknown element <${node.tagName}>`, null, node.tagName);
            }
        });
    }
}
exports.default = NoUnknownElements;
