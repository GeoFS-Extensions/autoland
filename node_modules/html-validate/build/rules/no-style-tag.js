"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class NoStyleTag extends rule_1.Rule {
    documentation() {
        return {
            description: "Prefer to use external stylesheets with the `<link>` tag instead of inlining the styling.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:open", (event) => {
            const node = event.target;
            if (node.tagName === "style") {
                this.report(node, "Use external stylesheet with <link> instead of <style> tag");
            }
        });
    }
}
exports.default = NoStyleTag;
