"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const rule_1 = require("../rule");
class Deprecated extends rule_1.Rule {
    documentation(context) {
        const doc = {
            description: "This element is deprecated and should not be used in new code.",
            url: rule_1.ruleDocumentationUrl(__filename),
        };
        if (context) {
            const text = [];
            if (context.source) {
                const source = prettySource(context.source);
                const message = `The \`<$tagname>\` element is deprecated ${source} and should not be used in new code.`;
                text.push(message);
            }
            else {
                const message = `The \`<$tagname>\` element is deprecated and should not be used in new code.`;
                text.push(message);
            }
            if (context.documentation) {
                text.push(context.documentation);
            }
            doc.description = text
                .map((cur) => cur.replace(/\$tagname/g, context.tagName))
                .join("\n\n");
        }
        return doc;
    }
    setup() {
        this.on("tag:open", (event) => {
            const node = event.target;
            /* cannot validate if meta isn't known */
            if (node.meta === null) {
                return;
            }
            const deprecated = node.meta.deprecated;
            if (deprecated) {
                const location = context_1.sliceLocation(event.location, 1);
                if (typeof deprecated === "string") {
                    this.reportString(deprecated, node, location);
                }
                else if (typeof deprecated === "boolean") {
                    this.reportBoolean(node, location);
                }
                else {
                    this.reportObject(deprecated, node, location);
                }
            }
        });
    }
    reportString(deprecated, node, location) {
        const context = { tagName: node.tagName };
        const message = `<${node.tagName}> is deprecated: ${deprecated}`;
        this.report(node, message, location, context);
    }
    reportBoolean(node, location) {
        const context = { tagName: node.tagName };
        const message = `<${node.tagName}> is deprecated`;
        this.report(node, message, location, context);
    }
    reportObject(deprecated, node, location) {
        const context = Object.assign(Object.assign({}, deprecated), { tagName: node.tagName });
        const message = `<${node.tagName}> is deprecated${deprecated.message ? `: ${deprecated.message}` : ""}`;
        this.report(node, message, location, context);
    }
}
exports.default = Deprecated;
function prettySource(source) {
    const match = source.match(/html(\d)(\d)?/);
    if (match) {
        const [, major, minor] = match;
        return `in HTML ${major}${minor ? `.${minor}` : ""}`;
    }
    switch (source) {
        case "whatwg":
            return "in HTML Living Standard";
        case "non-standard":
            return "and non-standard";
        default:
            return `by ${source}`;
    }
}
