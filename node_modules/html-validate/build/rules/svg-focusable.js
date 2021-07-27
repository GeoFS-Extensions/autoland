"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("../rule");
class SvgFocusable extends rule_1.Rule {
    documentation() {
        return {
            description: `Inline SVG elements in IE are focusable by default which may cause issues with tab-ordering. The \`focusable\` attribute should explicitly be set to avoid unintended behaviour.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("element:ready", (event) => {
            if (event.target.is("svg")) {
                this.validate(event.target);
            }
        });
    }
    validate(svg) {
        if (svg.hasAttribute("focusable")) {
            return;
        }
        this.report(svg, `<${svg.tagName}> is missing required "focusable" attribute`);
    }
}
exports.default = SvgFocusable;
