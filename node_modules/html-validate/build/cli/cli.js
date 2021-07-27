"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const fs_1 = require("fs");
const default_1 = __importDefault(require("../config/default"));
const error_1 = require("../error");
const htmlvalidate_1 = __importDefault(require("../htmlvalidate"));
const expand_files_1 = require("./expand-files");
const formatter_1 = require("./formatter");
const init_1 = require("./init");
class CLI {
    /**
     * Create new CLI helper.
     *
     * Can be used to create tooling with similar properties to bundled CLI
     * script.
     */
    constructor(options) {
        this.options = options || {};
        this.config = this.getConfig();
    }
    expandFiles(patterns, options = {}) {
        return expand_files_1.expandFiles(patterns, options);
    }
    getFormatter(formatters) {
        return formatter_1.getFormatter(formatters);
    }
    /**
     * Initialize project with a new configuration.
     *
     * A new `.htmlvalidate.json` file will be placed in the path provided by
     * `cwd`.
     */
    init(cwd) {
        return init_1.init(cwd);
    }
    /**
     * Get HtmlValidate instance with configuration based on options passed to the
     * constructor.
     */
    getValidator() {
        return new htmlvalidate_1.default(this.config);
    }
    getConfig() {
        const { options } = this;
        const config = options.configFile
            ? JSON.parse(fs_1.readFileSync(options.configFile, "utf-8"))
            : default_1.default;
        let rules = options.rules;
        if (rules) {
            if (Array.isArray(rules)) {
                rules = rules.join(",");
            }
            const raw = rules
                .split(",")
                .map((x) => x.replace(/ *(.*):/, '"$1":'))
                .join(",");
            try {
                const rules = JSON.parse(`{${raw}}`);
                config.extends = [];
                config.rules = rules;
            }
            catch (e) {
                // istanbul ignore next
                throw new error_1.UserError(`Error while parsing --rule option "{${raw}}": ${e.message}.\n`);
            }
        }
        return config;
    }
}
exports.CLI = CLI;
