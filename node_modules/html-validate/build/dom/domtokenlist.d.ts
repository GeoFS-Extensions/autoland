import { Location } from "../context";
import { DynamicValue } from "./dynamic-value";
export declare class DOMTokenList extends Array<string> {
    readonly value: string;
    private readonly locations;
    constructor(value: string | DynamicValue, location?: Location);
    item(n: number): string | undefined;
    location(n: number): Location | undefined;
    contains(token: string): boolean;
}
