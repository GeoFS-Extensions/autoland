"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const rule_1 = require("../rule");
const dom_1 = require("../dom");
exports.types = ["button", "submit", "reset", "image"];
const replacement = {
    button: '<button type="button">',
    submit: '<button type="submit">',
    reset: '<button type="reset">',
    image: '<button type="button">',
};
const defaults = {
    include: null,
    exclude: null,
};
class PreferButton extends rule_1.Rule {
    constructor(options) {
        super(Object.assign(Object.assign({}, defaults), options));
    }
    documentation(context) {
        const doc = {
            description: `Prefer to use the generic \`<button>\` element instead of \`<input>\`.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (context) {
            const src = `<input type="${context.type}">`;
            const dst = replacement[context.type] || `<button>`;
            doc.description = `Prefer to use \`${dst}\` instead of \`"${src}\`.`;
        }
        return doc;
    }
    setup() {
        this.on("attr", (event) => {
            const node = event.target;
            /* only handle input elements */
            if (node.tagName !== "input") {
                return;
            }
            /* sanity check: handle missing, boolean and dynamic attributes */
            if (!event.value || event.value instanceof dom_1.DynamicValue) {
                return;
            }
            /* ignore types configured to be ignored */
            if (this.isKeywordIgnored(event.value)) {
                return;
            }
            /* only values matching known type triggers error */
            if (!exports.types.includes(event.value)) {
                return;
            }
            const context = { type: event.value };
            const message = `Prefer to use <button> instead of <input type="${event.value}"> when adding buttons`;
            this.report(node, message, event.valueLocation, context);
        });
    }
}
exports.default = PreferButton;
