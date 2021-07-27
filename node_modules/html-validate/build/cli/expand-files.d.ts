export interface ExpandOptions {
    /**
     * Working directory. Defaults to `process.cwd()`.
     */
    cwd?: string;
    /**
     * List of extensions to search for when expanding directories. Extensions
     * should be passed without leading dot, e.g. "html" instead of ".html".
     */
    extensions?: string[];
}
/**
 * Takes a number of file patterns (globs) and returns array of expanded
 * filenames.
 */
export declare function expandFiles(patterns: string[], options: ExpandOptions): string[];
