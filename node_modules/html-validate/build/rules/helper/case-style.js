"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseStyle = void 0;
const error_1 = require("../../config/error");
/**
 * Represents casing for a name, e.g. lowercase, uppercase, etc.
 */
class CaseStyle {
    /**
     * @param style - Name of a valid case style.
     */
    constructor(style, ruleId) {
        if (!Array.isArray(style)) {
            style = [style];
        }
        if (style.length === 0) {
            throw new error_1.ConfigError(`Missing style for ${ruleId} rule`);
        }
        this.styles = this.parseStyle(style, ruleId);
    }
    /**
     * Test if a text matches this case style.
     */
    match(text) {
        return this.styles.some((style) => text.match(style.pattern));
    }
    get name() {
        const names = this.styles.map((style) => style.name);
        switch (this.styles.length) {
            case 1:
                return names[0];
            case 2:
                return names.join(" or ");
            default: {
                const last = names.slice(-1);
                const rest = names.slice(0, -1);
                return `${rest.join(", ")} or ${last}`;
            }
        }
    }
    parseStyle(style, ruleId) {
        return style.map((cur) => {
            switch (cur.toLowerCase()) {
                case "lowercase":
                    return { pattern: /^[a-z]*$/, name: "lowercase" };
                case "uppercase":
                    return { pattern: /^[A-Z]*$/, name: "uppercase" };
                case "pascalcase":
                    return { pattern: /^[A-Z][A-Za-z]*$/, name: "PascalCase" };
                case "camelcase":
                    return { pattern: /^[a-z][A-Za-z]*$/, name: "camelCase" };
                default:
                    throw new error_1.ConfigError(`Invalid style "${style}" for ${ruleId} rule`);
            }
        });
    }
}
exports.CaseStyle = CaseStyle;
