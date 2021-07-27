"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const defaults = {
    include: null,
    exclude: null,
};
class NoAutoplay extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
    }
    documentation(context) {
        return {
            description: [
                `The autoplay attribute is not allowed${context ? ` on <${context.tagName}>` : ""}.`,
                "Autoplaying content can be disruptive for users and has accessibilty concerns.",
                "Prefer to let the user control playback.",
            ].join("\n"),
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("attr", (event) => {
            /* only handle autoplay attribute */
            if (event.key.toLowerCase() !== "autoplay") {
                return;
            }
            /* ignore dynamic values */
            if (event.value && event.value instanceof dom_1.DynamicValue) {
                return;
            }
            /* ignore tagnames configured to be ignored */
            const tagName = event.target.tagName;
            if (this.isKeywordIgnored(tagName)) {
                return;
            }
            /* report error */
            const context = { tagName };
            const location = event.location;
            this.report(event.target, `The autoplay attribute is not allowed on <${tagName}>`, location, context);
        });
    }
}
exports.default = NoAutoplay;
