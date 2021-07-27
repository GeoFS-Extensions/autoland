import { Location, Source } from "../context";
import { Token } from "./token";
export declare type TokenStream = IterableIterator<Token>;
export declare class InvalidTokenError extends Error {
    location: Location;
    constructor(location: Location, message: string);
}
export declare class Lexer {
    tokenize(source: Source): TokenStream;
    private token;
    private unhandled;
    private errorStuck;
    private evalNextState;
    private match;
    /**
     * Called when entering a new state.
     */
    private enter;
    private tokenizeInitial;
    private tokenizeDoctype;
    private tokenizeTag;
    private tokenizeAttr;
    private tokenizeText;
    private tokenizeCDATA;
    private tokenizeScript;
}
