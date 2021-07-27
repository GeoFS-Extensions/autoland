"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
class NoDupClass extends rule_1.Rule {
    documentation() {
        return {
            description: "Prevents unnecessary duplication of class names.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("attr", (event) => {
            if (event.key.toLowerCase() !== "class") {
                return;
            }
            const classes = new dom_1.DOMTokenList(event.value, event.valueLocation);
            const unique = new Set();
            classes.forEach((cur, index) => {
                if (unique.has(cur)) {
                    const location = classes.location(index);
                    this.report(event.target, `Class "${cur}" duplicated`, location);
                }
                unique.add(cur);
            });
        });
    }
}
exports.default = NoDupClass;
