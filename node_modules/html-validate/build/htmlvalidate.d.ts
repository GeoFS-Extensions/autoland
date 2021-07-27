import { Config, ConfigData, ConfigLoader } from "./config";
import { Source } from "./context";
import { SourceHooks } from "./context/source";
import { EventDump, TokenDump } from "./engine";
import { Parser } from "./parser";
import { Report } from "./reporter";
import { RuleDocumentation } from "./rule";
/**
 * Primary API for using HTML-validate.
 *
 * Provides high-level abstractions for common operations.
 */
declare class HtmlValidate {
    private globalConfig;
    protected configLoader: ConfigLoader;
    /**
     * Create a new validator.
     *
     * @param config - If set it provides the global default configuration. By
     * default `Config.defaultConfig()` is used.
     */
    constructor(config?: ConfigData);
    /**
     * Parse and validate HTML from string.
     *
     * @param str - Text to parse.
     * @param filename - If set configuration is loaded for given filename.
     * @param hooks - Optional hooks (see [[Source]]) for definition.
     * @returns Report output.
     */
    validateString(str: string, filename?: string, options?: SourceHooks | ConfigData, hooks?: SourceHooks): Report;
    /**
     * Parse and validate HTML from [[Source]].
     *
     * @param input - Source to parse.
     * @returns Report output.
     */
    validateSource(input: Source, configOverride?: ConfigData): Report;
    /**
     * Parse and validate HTML from file.
     *
     * @param filename - Filename to read and parse.
     * @returns Report output.
     */
    validateFile(filename: string): Report;
    /**
     * Parse and validate HTML from multiple files. Result is merged together to a
     * single report.
     *
     * @param filenames - Filenames to read and parse.
     * @returns Report output.
     */
    validateMultipleFiles(filenames: string[]): Report;
    /**
     * Returns true if the given filename can be validated.
     *
     * A file is considered to be validatable if the extension is `.html` or if a
     * transformer matches the filename.
     *
     * This is mostly useful for tooling to determine whenever to validate the
     * file or not. CLI tools will run on all the given files anyway.
     */
    canValidate(filename: string): boolean;
    /**
     * Tokenize filename and output all tokens.
     *
     * Using CLI this is enabled with `--dump-tokens`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to tokenize.
     */
    dumpTokens(filename: string): TokenDump[];
    /**
     * Parse filename and output all events.
     *
     * Using CLI this is enabled with `--dump-events`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump events from.
     */
    dumpEvents(filename: string): EventDump[];
    /**
     * Parse filename and output DOM tree.
     *
     * Using CLI this is enabled with `--dump-tree`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump DOM tree from.
     */
    dumpTree(filename: string): string[];
    /**
     * Transform filename and output source data.
     *
     * Using CLI this is enabled with `--dump-source`. Mostly useful for
     * debugging.
     *
     * @param filename - Filename to dump source from.
     */
    dumpSource(filename: string): string[];
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
    getRuleDocumentation(ruleId: string, config?: Config | null, context?: any | null): RuleDocumentation;
    /**
     * Create a parser configured for given filename.
     *
     * @param source - Source to use.
     */
    getParserFor(source: Source): Parser;
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
    getConfigFor(filename: string, configOverride?: ConfigData): Config;
    /**
     * Flush configuration cache. Clears full cache unless a filename is given.
     *
     * @param filename - If set, only flush cache for given filename.
     */
    flushConfigCache(filename?: string): void;
}
export default HtmlValidate;
