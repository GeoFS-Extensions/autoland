import { Location } from "../context";
import { DOMNode } from "./domnode";
import { DynamicValue } from "./dynamic-value";
/**
 * Represents a text in the HTML document.
 *
 * Text nodes are appended as children of `HtmlElement` and cannot have childen
 * of its own.
 */
export declare class TextNode extends DOMNode {
    private readonly text;
    /**
     * @param text - Text to add. When a `DynamicValue` is used the expression is
     * used as "text".
     * @param location - Source code location of this node.
     */
    constructor(text: string | DynamicValue, location?: Location);
    /**
     * Get the text from node.
     */
    get textContent(): string;
    /**
     * Flag set to true if the attribute value is static.
     */
    get isStatic(): boolean;
    /**
     * Flag set to true if the attribute value is dynamic.
     */
    get isDynamic(): boolean;
}
