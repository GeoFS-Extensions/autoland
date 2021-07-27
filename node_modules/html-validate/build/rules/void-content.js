"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
class VoidContent extends rule_1.Rule {
    documentation(tagName) {
        const doc = {
            description: "HTML void elements cannot have any content and must not have content or end tag.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (tagName) {
            doc.description = `<${tagName}> is a void element and must not have content or end tag.`;
        }
        return doc;
    }
    setup() {
        this.on("tag:close", (event) => {
            const node = event.target; // The current element being closed.
            if (!node) {
                return;
            }
            if (!node.voidElement) {
                return;
            }
            if (node.closed === dom_1.NodeClosed.EndTag) {
                this.report(null, `End tag for <${node.tagName}> must be omitted`, node.location, node.tagName);
            }
        });
    }
}
exports.default = VoidContent;
