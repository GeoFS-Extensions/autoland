"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class InputMissingLabel extends rule_1.Rule {
    documentation() {
        return {
            description: "Labels are associated with the input element and is required for a17y.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("dom:ready", (event) => {
            const root = event.document;
            for (const elem of root.querySelectorAll("input, textarea, select")) {
                /* <input type="hidden"> should not have label */
                if (elem.is("input")) {
                    const type = elem.getAttributeValue("type");
                    if (type && type.toLowerCase() === "hidden") {
                        continue;
                    }
                }
                /* try to find label by id */
                if (findLabelById(root, elem.id)) {
                    continue;
                }
                /* try to find parent label (input nested in label) */
                if (findLabelByParent(elem)) {
                    continue;
                }
                this.report(elem, `<${elem.tagName}> element does not have a <label>`);
            }
        });
    }
}
exports.default = InputMissingLabel;
function findLabelById(root, id) {
    if (!id)
        return null;
    return root.querySelector(`label[for="${id}"]`);
}
function findLabelByParent(el) {
    let cur = el.parent;
    while (cur) {
        if (cur.is("label")) {
            return cur;
        }
        cur = cur.parent;
    }
    return null;
}
