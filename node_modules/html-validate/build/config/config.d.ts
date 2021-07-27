import { Source } from "../context";
import { MetaTable } from "../meta";
import { Plugin } from "../plugin";
import { Transformer } from "../transform";
import { ConfigData } from "./config-data";
import { Severity } from "./severity";
interface TransformerEntry {
    pattern: RegExp;
    name: string;
    fn: Transformer;
}
/**
 * Internal interface for a loaded plugin.
 */
interface LoadedPlugin extends Plugin {
    name: string;
    originalName: string;
}
/**
 * Configuration holder.
 *
 * Each file being validated will have a unique instance of this class.
 */
export declare class Config {
    private config;
    private configurations;
    private initialized;
    protected metaTable: MetaTable;
    protected plugins: LoadedPlugin[];
    protected transformers: TransformerEntry[];
    protected rootDir: string;
    /**
     * Create a new blank configuration. See also `Config.defaultConfig()`.
     */
    static empty(): Config;
    /**
     * Create configuration from object.
     */
    static fromObject(options: ConfigData, filename?: string | null): Config;
    /**
     * Read configuration from filename.
     *
     * Note: this reads configuration data from a file. If you intent to load
     * configuration for a file to validate use `ConfigLoader.fromTarget()`.
     *
     * @param filename - The file to read from or one of the presets such as
     * `html-validate:recommended`.
     */
    static fromFile(filename: string): Config;
    /**
     * Validate configuration data.
     *
     * Throws SchemaValidationError if invalid.
     */
    static validate(options: ConfigData, filename?: string): void;
    /**
     * Load a default configuration object.
     */
    static defaultConfig(): Config;
    constructor(options?: ConfigData);
    /**
     * Initialize plugins, transforms etc.
     *
     * Must be called before trying to use config. Can safely be called multiple
     * times.
     */
    init(): void;
    /**
     * Returns true if this configuration is marked as "root".
     */
    isRootFound(): boolean;
    /**
     * Returns a new configuration as a merge of the two. Entries from the passed
     * object takes priority over this object.
     *
     * @param {Config} rhs - Configuration to merge with this one.
     */
    merge(rhs: Config): Config;
    private extendConfig;
    /**
     * Get element metadata.
     */
    getMetaTable(): MetaTable;
    /**
     * @hidden exposed for testing only
     */
    static expandRelative(src: string, currentPath: string): string;
    /**
     * Get a copy of internal configuration data.
     *
     * @hidden primary purpose is unittests
     */
    get(): ConfigData;
    /**
     * Get all configured rules, their severity and options.
     */
    getRules(): Map<string, [Severity, any]>;
    /**
     * Get all configured plugins.
     */
    getPlugins(): Plugin[];
    private loadPlugins;
    private loadConfigurations;
    private extendMeta;
    /**
     * Transform a source.
     *
     * When transforming zero or more new sources will be generated.
     *
     * @param source - Current source to transform.
     * @param filename - If set it is the filename used to match
     * transformer. Default is to use filename from source.
     * @return A list of transformed sources ready for validation.
     */
    transformSource(source: Source, filename?: string): Source[];
    /**
     * Wrapper around [[transformSource]] which reads a file before passing it
     * as-is to transformSource.
     *
     * @param source - Filename to transform (according to configured
     * transformations)
     * @return A list of transformed sources ready for validation.
     */
    transformFilename(filename: string): Source[];
    /**
     * Returns true if a transformer matches given filename.
     */
    canTransform(filename: string): boolean;
    private findTransformer;
    private precompileTransformers;
    /**
     * Get transformation function requested by configuration.
     *
     * Searches:
     *
     * - Named transformers from plugins.
     * - Unnamed transformer from plugin.
     * - Standalone modules (local or node_modules)
     *
     * @param name - Key from configuration
     */
    private getTransformFunction;
    /**
     * @param name - Original name from configuration
     * @param pluginName - Name of plugin
     * @param key - Name of transform (from plugin)
     */
    private getNamedTransformerFromPlugin;
    /**
     * @param name - Original name from configuration
     * @param plugin - Plugin instance
     */
    private getUnnamedTransformerFromPlugin;
    private getTransformerFromModule;
    protected findRootDir(): string;
}
export {};
