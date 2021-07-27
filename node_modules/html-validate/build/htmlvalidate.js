"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const engine_1 = require("./engine");
const parser_1 = require("./parser");
const reporter_1 = require("./reporter");
function isSourceHooks(value) {
    return Boolean(value && (value.processAttribute || value.processElement));
}
/**
 * Primary API for using HTML-validate.
 *
 * Provides high-level abstractions for common operations.
 */
class HtmlValidate {
    /**
     * Create a new validator.
     *
     * @param config - If set it provides the global default configuration. By
     * default `Config.defaultConfig()` is used.
     */
    constructor(config) {
        const defaults = config_1.Config.empty();
        this.globalConfig = defaults.merge(config ? config_1.Config.fromObject(config) : config_1.Config.defaultConfig());
        this.configLoader = new config_1.ConfigLoader(config_1.Config);
    }
    /**
     * Parse and validate HTML from string.
     *
     * @param str - Text to parse.
     * @param filename - If set configuration is loaded for given filename.
     * @param hooks - Optional hooks (see [[Source]]) for definition.
     * @returns Report output.
     */
    validateString(str, filename, options, hooks) {
        if (isSourceHooks(options)) {
            return this.validateString(str, filename, null, options);
        }
        const source = {
            data: str,
            filename: filename || "inline",
            line: 1,
            column: 1,
            offset: 0,
            hooks,
        };
        return this.validateSource(source, options);
    }
    /**
     * Parse and validate HTML from [[Source]].
     *
     * @param input - Source to parse.
     * @returns Report output.
     */
    validateSource(input, configOverride) {
        const config = this.getConfigFor(input.filename, configOverride);
        const source = config.transformSource(input);
        const engine = new engine_1.Engine(config, parser_1.Parser);
        return engine.lint(source);
    }
    /**
     * Parse and validate HTML from file.
     *
     * @param filename - Filename to read and parse.
     * @returns Report output.
     */
    validateFile(filename) {
        const config = this.getConfigFor(filename);
        const source = config.transformFilename(filename);
        const engine = new engine_1.Engine(config, parser_1.Parser);
        return engine.lint(source);
    }
    /**
     * Parse and validate HTML from multiple files. Result is merged together to a
     * single report.
     *
     * @param filenames - Filenames to read and parse.
     * @returns Report output.
     */
    validateMultipleFiles(filenames) {
        return reporter_1.Reporter.merge(filenames.map((filename) => this.validateFile(filename)));
    }
    /**
     * Returns true if the given filename can be validated.
     *
     * A file is considered to be validatable if the extension is `.html` or if a
     * transformer matches the filename.
     *
     * This is mostly useful for tooling to determine whenever to validate the
     * file or not. CLI tools will run on all the given files anyway.
     */
    canValidate(filename) {
        /* .html is always supported */
        const extension = path_1.default.extname(filename).toLowerCase();
        if (extension === ".html") {
            return true;
        }
        /* test if there is a matching transformer */
        const config = this.getConfigFor(filename);
        return config.canTransform(filename);
    }
    /**
     * Tokenize filename and output all tokens.
     *
     * Using CLI this is enabled with `--dump-tokens`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to tokenize.
     */
    dumpTokens(filename) {
        const config = this.getConfigFor(filename);
        const source = config.transformFilename(filename);
        const engine = new engine_1.Engine(config, parser_1.Parser);
        return engine.dumpTokens(source);
    }
    /**
     * Parse filename and output all events.
     *
     * Using CLI this is enabled with `--dump-events`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump events from.
     */
    dumpEvents(filename) {
        const config = this.getConfigFor(filename);
        const source = config.transformFilename(filename);
        const engine = new engine_1.Engine(config, parser_1.Parser);
        return engine.dumpEvents(source);
    }
    /**
     * Parse filename and output DOM tree.
     *
     * Using CLI this is enabled with `--dump-tree`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump DOM tree from.
     */
    dumpTree(filename) {
        const config = this.getConfigFor(filename);
        const source = config.transformFilename(filename);
        const engine = new engine_1.Engine(config, parser_1.Parser);
        return engine.dumpTree(source);
    }
    /**
     * Transform filename and output source data.
     *
     * Using CLI this is enabled with `--dump-source`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump source from.
     */
    dumpSource(filename) {
        const config = this.getConfigFor(filename);
        const sources = config.transformFilename(filename);
        return sources.reduce((result, source) => {
            result.push(`Source ${source.filename}@${source.line}:${source.column} (offset: ${source.offset})`);
            if (source.transformedBy) {
                result.push("Transformed by:");
                result = result.concat(source.transformedBy.reverse().map((name) => ` - ${name}`));
            }
            if (source.hooks && Object.keys(source.hooks).length > 0) {
                result.push("Hooks");
                for (const [key, present] of Object.entries(source.hooks)) {
                    if (present) {
                        result.push(` - ${key}`);
                    }
                }
            }
            result.push("---");
            result = result.concat(source.data.split("\n"));
            result.push("---");
            return result;
        }, []);
    }
    /**
     * Get contextual documentation for the given rule.
     *
     * Typical usage:
     *
     * ```js
     * const report = htmlvalidate.validateFile("my-file.html");
     * for (const result of report.results){
     *   const config = htmlvalidate.getConfigFor(result.filePath);
     *   for (const message of result.messages){
     *     const documentation = htmlvalidate.getRuleDocumentation(message.ruleId, config, message.context);
     *     // do something with documentation
     *   }
     * }
     * ```
     *
     * @param ruleId - Rule to get documentation for.
     * @param config - If set it provides more accurate description by using the
     * correct configuration for the file.
     * @param context - If set to `Message.context` some rules can provide
     * contextual details and suggestions.
     */
    getRuleDocumentation(ruleId, config = null, context = null) {
        const engine = new engine_1.Engine(config || this.getConfigFor("inline"), parser_1.Parser);
        return engine.getRuleDocumentation(ruleId, context);
    }
    /**
     * Create a parser configured for given filename.
     *
     * @param source - Source to use.
     */
    getParserFor(source) {
        const config = this.getConfigFor(source.filename);
        return new parser_1.Parser(config);
    }
    /**
     * Get configuration for given filename.
     *
     * Configuration is read from three sources and in the following order:
     *
     * 1. Global configuration passed to constructor.
     * 2. `.htmlvalidate.json` files found when traversing the directory structure.
     * 3. Override passed to this function.
     *
     * The `root` property set to `true` affects the configuration as following:
     *
     * 1. If set in override the override is returned as-is.
     * 2. If set in the global config the override is merged into global and
     * returned. No `.htmlvalidate.json` files are searched.
     * 3. Setting `root` in `.htmlvalidate.json` only stops directory traversal.
     *
     * @param filename - Filename to get configuration for.
     * @param configOverride - Configuration to apply last.
     */
    getConfigFor(filename, configOverride) {
        /* special case when the overridden configuration is marked as root, should
         * not try to load any more configuration files */
        const override = config_1.Config.fromObject(configOverride || {});
        if (override.isRootFound()) {
            override.init();
            return override;
        }
        /* special case when the global configuration is marked as root, should not
         * try to load and more configuration files */
        if (this.globalConfig.isRootFound()) {
            const merged = this.globalConfig.merge(override);
            merged.init();
            return merged;
        }
        const config = this.configLoader.fromTarget(filename);
        const merged = this.globalConfig.merge(config).merge(override);
        merged.init();
        return merged;
    }
    /**
     * Flush configuration cache. Clears full cache unless a filename is given.
     *
     * @param filename - If set, only flush cache for given filename.
     */
    flushConfigCache(filename) {
        this.configLoader.flush(filename);
    }
}
exports.default = HtmlValidate;
