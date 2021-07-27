import HtmlValidate from "../htmlvalidate";
import { Report } from "../reporter";
import { ExpandOptions } from "./expand-files";
import { InitResult } from "./init";
export interface CLIOptions {
    configFile?: string;
    rules?: string | string[];
}
export declare class CLI {
    private options;
    private config;
    /**
     * Create new CLI helper.
     *
     * Can be used to create tooling with similar properties to bundled CLI
     * script.
     */
    constructor(options?: CLIOptions);
    expandFiles(patterns: string[], options?: ExpandOptions): string[];
    getFormatter(formatters: string): (report: Report) => string;
    /**
     * Initialize project with a new configuration.
     *
     * A new `.htmlvalidate.json` file will be placed in the path provided by
     * `cwd`.
     */
    init(cwd: string): Promise<InitResult>;
    /**
     * Get HtmlValidate instance with configuration based on options passed to the
     * constructor.
     */
    getValidator(): HtmlValidate;
    private getConfig;
}
