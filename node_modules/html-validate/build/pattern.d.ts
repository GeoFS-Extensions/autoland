export declare type PatternName = "kebabcase" | "camelcase" | "underscore" | string;
export declare function parsePattern(pattern: PatternName): RegExp;
export declare function describePattern(pattern: PatternName): string;
