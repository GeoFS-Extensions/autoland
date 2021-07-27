import { Location } from "../context";
export declare enum TokenType {
    WHITESPACE = 1,
    NEWLINE = 2,
    DOCTYPE_OPEN = 3,
    DOCTYPE_VALUE = 4,
    DOCTYPE_CLOSE = 5,
    TAG_OPEN = 6,
    TAG_CLOSE = 7,
    ATTR_NAME = 8,
    ATTR_VALUE = 9,
    TEXT = 10,
    TEMPLATING = 11,
    SCRIPT = 12,
    COMMENT = 13,
    CONDITIONAL = 14,
    DIRECTIVE = 15,
    EOF = 16
}
export interface Token {
    type: TokenType;
    location: Location;
    data?: any;
}
