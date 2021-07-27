import { Location, Source } from "./context";
import { Rule } from "./rule";
import { DOMNode } from "./dom";
/**
 * Reported error message.
 */
export interface Message {
    /** Rule that triggered this message */
    ruleId: string;
    /** Severity of the message */
    severity: number;
    /** Message text */
    message: string;
    /** Offset (number of characters) into the source */
    offset: number;
    /** Line number */
    line: number;
    /** Column number */
    column: number;
    /** From start offset, how many characters is this message relevant for */
    size: number;
    /** DOM selector */
    selector: string | null;
    /**
     * Optional error context used to provide context-aware documentation.
     *
     * This context can be passed to [[HtmlValidate#getRuleDocumentation]].
     */
    context?: any;
}
export interface Result {
    messages: Message[];
    filePath: string;
    errorCount: number;
    warningCount: number;
    source?: string;
}
/**
 * Report object returned by [[HtmlValidate]].
 */
export interface Report {
    /** `true` if validation was successful */
    valid: boolean;
    /** Detailed results per validated source */
    results: Result[];
    /** Total number of errors across all sources */
    errorCount: number;
    /** Total warnings of errors across all sources */
    warningCount: number;
}
export declare class Reporter {
    protected result: {
        [filename: string]: Message[];
    };
    constructor();
    /**
     * Merge two or more reports into a single one.
     */
    static merge(reports: Report[]): Report;
    add<ContextType, OptionsType>(rule: Rule<ContextType, OptionsType>, message: string, severity: number, node: DOMNode, location: Location, context?: ContextType): void;
    addManual(filename: string, message: Message): void;
    save(sources?: Source[]): Report;
    protected isValid(): boolean;
}
export default Reporter;
