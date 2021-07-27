export declare enum Severity {
    DISABLED = 0,
    WARN = 1,
    ERROR = 2
}
export declare function parseSeverity(value: string | number): Severity;
