import { Location } from "../context";
import { MetaTable } from "../meta";
import { HtmlElement } from "./htmlelement";
export declare class DOMTree {
    readonly root: HtmlElement;
    private active;
    doctype?: string;
    constructor(location: Location);
    pushActive(node: HtmlElement): void;
    popActive(): void;
    getActive(): HtmlElement;
    /**
     * Resolve dynamic meta expressions.
     */
    resolveMeta(table: MetaTable): void;
    getElementsByTagName(tagName: string): HtmlElement[];
    visitDepthFirst(callback: (node: HtmlElement) => void): void;
    find(callback: (node: HtmlElement) => boolean): HtmlElement;
    querySelector(selector: string): HtmlElement;
    querySelectorAll(selector: string): HtmlElement[];
}
