import { Config } from "./config";
/**
 * @hidden
 */
interface ConfigClass {
    empty(): Config;
    fromFile(filename: string): Config;
}
/**
 * Configuration loader.
 *
 * Handles configuration lookup and cache results. When performing lookups
 * parent directories is searched as well and the result is merged together.
 */
export declare class ConfigLoader {
    protected cache: Map<string, Config>;
    protected configClass: ConfigClass;
    /**
     * @param configClass - Override class to construct.
     */
    constructor(configClass: ConfigClass);
    /**
     * Flush configuration cache.
     *
     * @param filename If given only the cache for that file is flushed.
     */
    flush(filename?: string): void;
    /**
     * Get configuration for file.
     *
     * Searches parent directories for configuration and merges the result.
     *
     * @param filename Filename to get configuration for.
     */
    fromTarget(filename: string): Config;
}
export {};
