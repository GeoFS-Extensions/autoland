"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
class ScriptElement extends rule_1.Rule {
    documentation() {
        return {
            description: "The end tag for `<script>` is a hard requirement and must never be omitted even when using the `src` attribute.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:close", (event) => {
            const node = event.target; // The current element being closed.
            if (!node || node.tagName !== "script") {
                return;
            }
            if (node.closed !== dom_1.NodeClosed.EndTag) {
                this.report(node, `End tag for <${node.tagName}> must not be omitted`);
            }
        });
    }
}
exports.default = ScriptElement;
