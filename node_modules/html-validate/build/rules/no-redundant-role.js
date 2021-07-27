"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const mapping = {
    article: ["article"],
    header: ["banner"],
    button: ["button"],
    td: ["cell"],
    input: ["checkbox", "radio", "input"],
    aside: ["complementary"],
    footer: ["contentinfo"],
    figure: ["figure"],
    form: ["form"],
    h1: ["heading"],
    h2: ["heading"],
    h3: ["heading"],
    h4: ["heading"],
    h5: ["heading"],
    h6: ["heading"],
    a: ["link"],
    ul: ["list"],
    select: ["listbox"],
    li: ["listitem"],
    main: ["main"],
    nav: ["navigation"],
    progress: ["progressbar"],
    section: ["region"],
    table: ["table"],
    textarea: ["textbox"],
};
class NoRedundantRole extends rule_1.Rule {
    documentation(context) {
        const doc = {
            description: `Using this role is redundant as it is already implied by the element.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (context) {
            doc.description = `Using the "${context.role}" role is redundant as it is already implied by the <${context.tagname}> element.`;
        }
        return doc;
    }
    setup() {
        this.on("attr", (event) => {
            const { target } = event;
            /* ignore non-role attributes */
            if (event.key.toLowerCase() !== "role") {
                return;
            }
            /* ignore missing and dynamic values */
            if (!event.value || event.value instanceof dom_1.DynamicValue) {
                return;
            }
            /* ignore elements without known redundant roles */
            const redundant = mapping[target.tagName];
            if (!redundant) {
                return;
            }
            /* ignore elements with non-redundant roles */
            if (!redundant.includes(event.value)) {
                return;
            }
            /* report error */
            const context = {
                tagname: target.tagName,
                role: event.value,
            };
            this.report(event.target, `Redundant role "${event.value}" on <${target.tagName}>`, event.valueLocation, context);
        });
    }
}
exports.default = NoRedundantRole;
