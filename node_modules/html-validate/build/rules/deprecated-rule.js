"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const rule_1 = require("../rule");
class DeprecatedRule extends rule_1.Rule {
    documentation(context) {
        return {
            description: `${context ? `The rule "${context}"` : "This rule"} is deprecated and should not be used any longer, consult documentation for further information.`,
            url: rule_1.ruleDocumentationUrl(__filename),
        };
    }
    setup() {
        this.on("config:ready", (event) => {
            for (const rule of this.getDeprecatedRules(event)) {
                if (rule.getSeverity() > config_1.Severity.DISABLED) {
                    this.report(null, `Usage of deprecated rule "${rule.name}"`, null, rule.name);
                }
            }
        });
    }
    getDeprecatedRules(event) {
        const rules = Object.values(event.rules);
        return rules.filter((rule) => rule.deprecated);
    }
}
exports.default = DeprecatedRule;
