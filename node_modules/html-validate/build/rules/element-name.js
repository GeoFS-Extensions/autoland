"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const rule_1 = require("../rule");
const defaults = {
    pattern: "^[a-z][a-z0-9\\-._]*-[a-z0-9\\-._]*$",
    whitelist: [],
    blacklist: [],
};
class ElementName extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
        // eslint-disable-next-line security/detect-non-literal-regexp
        this.pattern = new RegExp(this.options.pattern);
    }
    documentation(context) {
        return {
            description: this.documentationMessages(context).join("\n"),
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    documentationMessages(context) {
        if (!context) {
            return ["This is not a valid element name."];
        }
        if (context.blacklist.includes(context.tagName)) {
            return [
                `<${context.tagName}> is blacklisted by the project configuration.`,
                "",
                "The following names are blacklisted:",
                ...context.blacklist.map((cur) => `- ${cur}`),
            ];
        }
        if (context.pattern !== defaults.pattern) {
            return [
                `<${context.tagName}> is not a valid element name. This project is configured to only allow names matching the following regular expression:`,
                "",
                `- \`${context.pattern}\``,
            ];
        }
        return [
            `<${context.tagName}> is not a valid element name. If this is a custom element HTML requires the name to follow these rules:`,
            "",
            "- The name must begin with `a-z`",
            "- The name must include a hyphen `-`",
            "- It may include alphanumerical characters `a-z0-9` or hyphens `-`, dots `.` or underscores `_`.",
        ];
    }
    setup() {
        const xmlns = /^(.+):.+$/;
        this.on("tag:open", (event) => {
            const target = event.target;
            const tagName = target.tagName;
            const location = context_1.sliceLocation(event.location, 1);
            const context = {
                tagName,
                pattern: this.options.pattern,
                blacklist: this.options.blacklist,
            };
            /* check if element is blacklisted */
            if (this.options.blacklist.includes(tagName)) {
                this.report(target, `<${tagName}> element is blacklisted`, location, context);
            }
            /* assume that an element with meta has valid name as it is a builtin
             * element */
            if (target.meta) {
                return;
            }
            /* ignore elements in xml namespaces, they should be validated against a
             * DTD instead */
            if (tagName.match(xmlns)) {
                return;
            }
            /* check if element is whitelisted */
            if (this.options.whitelist.indexOf(tagName) >= 0) {
                return;
            }
            if (!tagName.match(this.pattern)) {
                this.report(target, `<${tagName}> is not a valid element name`, location, context);
            }
        });
    }
}
exports.default = ElementName;
