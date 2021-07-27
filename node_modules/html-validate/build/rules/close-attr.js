"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class CloseAttr extends rule_1.Rule {
    documentation() {
        return {
            description: "HTML disallows end tags to have attributes.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:close", (event) => {
            /* handle unclosed tags */
            if (!event.target) {
                return;
            }
            /* ignore self-closed and void */
            if (event.previous === event.target) {
                return;
            }
            const node = event.target;
            if (Object.keys(node.attributes).length > 0) {
                const first = node.attributes[0];
                this.report(null, "Close tags cannot have attributes", first.keyLocation);
            }
        });
    }
}
exports.default = CloseAttr;
