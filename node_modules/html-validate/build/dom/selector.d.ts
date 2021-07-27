import { HtmlElement } from "./htmlelement";
/**
 * DOM Selector.
 */
export declare class Selector {
    private readonly pattern;
    constructor(selector: string);
    /**
     * Match this selector against a HtmlElement.
     *
     * @param root Element to match against.
     * @returns Iterator with matched elements.
     */
    match(root: HtmlElement): IterableIterator<HtmlElement>;
    private matchInternal;
    private static parse;
    private static findCandidates;
    private static findAdjacentSibling;
    private static findGeneralSibling;
}
