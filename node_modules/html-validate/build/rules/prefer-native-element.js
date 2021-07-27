"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("../dom");
const rule_1 = require("../rule");
const defaults = {
    mapping: {
        article: "article",
        banner: "header",
        button: "button",
        cell: "td",
        checkbox: "input",
        complementary: "aside",
        contentinfo: "footer",
        figure: "figure",
        form: "form",
        heading: "hN",
        input: "input",
        link: "a",
        list: "ul",
        listbox: "select",
        listitem: "li",
        main: "main",
        navigation: "nav",
        progressbar: "progress",
        radio: "input",
        region: "section",
        table: "table",
        textbox: "textarea",
    },
    include: null,
    exclude: null,
};
class PreferNativeElement extends rule_1.Rule {
    constructor(options) {
        super(Object.assign({}, defaults, options));
    }
    documentation(context) {
        const doc = {
            description: `Instead of using WAI-ARIA roles prefer to use the native HTML elements.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (context) {
            doc.description = `Instead of using the WAI-ARIA role "${context.role}" prefer to use the native <${context.replacement}> element.`;
        }
        return doc;
    }
    setup() {
        const { mapping } = this.options;
        this.on("attr", (event) => {
            /* ignore non-role attributes */
            if (event.key.toLowerCase() !== "role") {
                return;
            }
            /* ignore missing and dynamic values */
            if (!event.value || event.value instanceof dom_1.DynamicValue) {
                return;
            }
            /* ignore roles configured to be ignored */
            const role = event.value.toLowerCase();
            if (this.isIgnored(role)) {
                return;
            }
            /* dont report when the element is already of the right type but has a
             * redundant role, such as <main role="main"> */
            const replacement = mapping[role];
            if (event.target.is(replacement)) {
                return;
            }
            /* report error */
            const context = { role, replacement };
            const location = this.getLocation(event);
            this.report(event.target, `Prefer to use the native <${replacement}> element`, location, context);
        });
    }
    isIgnored(role) {
        const { mapping } = this.options;
        /* ignore roles not mapped to native elements */
        const replacement = mapping[role];
        if (!replacement) {
            return true;
        }
        return this.isKeywordIgnored(role);
    }
    getLocation(event) {
        const begin = event.location;
        const end = event.valueLocation;
        const quote = event.quote ? 1 : 0;
        const size = end.offset + end.size - begin.offset + quote;
        return {
            filename: begin.filename,
            line: begin.line,
            column: begin.column,
            offset: begin.offset,
            size,
        };
    }
}
exports.default = PreferNativeElement;
