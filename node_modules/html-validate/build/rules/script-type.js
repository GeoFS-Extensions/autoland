"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
const javascript = [
    "",
    "application/ecmascript",
    "application/javascript",
    "text/ecmascript",
    "text/javascript",
];
class ScriptType extends rule_1.Rule {
    documentation() {
        return {
            description: "While valid the HTML5 standard encourages authors to omit the type element for JavaScript resources.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("tag:close", (event) => {
            const node = event.previous;
            if (!node || node.tagName !== "script") {
                return;
            }
            const attr = node.getAttribute("type");
            if (!attr || attr.isDynamic) {
                return;
            }
            const value = attr.value.toString();
            if (!this.isJavascript(value)) {
                return;
            }
            this.report(node, '"type" attribute is unnecessary for javascript resources', attr.keyLocation);
        });
    }
    isJavascript(mime) {
        const match = mime.match(/^(.*?)(?:\s*;.*)?$/);
        return javascript.includes(match[1]);
    }
}
exports.default = ScriptType;
