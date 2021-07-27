"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class NoStyleTag extends rule_1.Rule {
    documentation() {
        return {
            description: [
                'HTML5 documents should use the "html" doctype (short `form`, not legacy string):',
                "",
                "```html",
                "<!DOCTYPE html>",
                "```",
            ].join("\n"),
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("doctype", (event) => {
            const doctype = event.value.toLowerCase();
            if (doctype !== "html") {
                this.report(null, 'doctype should be "html"', event.valueLocation);
            }
        });
    }
}
exports.default = NoStyleTag;
