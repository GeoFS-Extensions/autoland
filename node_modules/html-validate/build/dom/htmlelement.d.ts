import { Location } from "../context";
import { Token } from "../lexer";
import { MetaElement, MetaTable } from "../meta";
import { Attribute } from "./attribute";
import { DOMNode } from "./domnode";
import { DOMTokenList } from "./domtokenlist";
import { DynamicValue } from "./dynamic-value";
export declare enum NodeClosed {
    Open = 0,
    EndTag = 1,
    VoidOmitted = 2,
    VoidSelfClosed = 3,
    ImplicitClosed = 4
}
export declare class HtmlElement extends DOMNode {
    readonly tagName: string;
    readonly parent: HtmlElement;
    readonly voidElement: boolean;
    readonly depth: number;
    closed: NodeClosed;
    protected readonly attr: {
        [key: string]: Attribute[];
    };
    private metaElement;
    private annotation;
    constructor(tagName: string, parent?: HtmlElement, closed?: NodeClosed, meta?: MetaElement, location?: Location);
    static rootNode(location: Location): HtmlElement;
    static fromTokens(startToken: Token, endToken: Token, parent: HtmlElement, metaTable: MetaTable): HtmlElement;
    /**
     * Returns annotated name if set or defaults to `<tagName>`.
     *
     * E.g. `my-annotation` or `<div>`.
     */
    get annotatedName(): string;
    /**
     * Similar to childNodes but only elements.
     */
    get childElements(): HtmlElement[];
    /**
     * Find the first ancestor matching a selector.
     *
     * Implementation of DOM specification of Element.closest(selectors).
     */
    closest(selectors: string): HtmlElement;
    /**
     * Generate a DOM selector for this element. The returned selector will be
     * unique inside the current document.
     */
    generateSelector(): string | null;
    /**
     * Tests if this element has given tagname.
     *
     * If passing "*" this test will pass if any tagname is set.
     */
    is(tagName: string): boolean;
    /**
     * Load new element metadata onto this element.
     *
     * Do note that semantics such as `void` cannot be changed (as the element has
     * already been created). In addition the element will still "be" the same
     * element, i.e. even if loading meta for a `<p>` tag upon a `<div>` tag it
     * will still be a `<div>` as far as the rest of the validator is concerned.
     *
     * In fact only certain properties will be copied onto the element:
     *
     * - content categories (flow, phrasing, etc)
     * - required attributes
     * - attribute allowed values
     * - permitted/required elements
     *
     * Properties *not* loaded:
     *
     * - inherit
     * - deprecated
     * - foreign
     * - void
     * - implicitClosed
     * - scriptSupporting
     * - deprecatedAttributes
     *
     * Changes to element metadata will only be visible after `element:ready` (and
     * the subsequent `dom:ready` event).
     */
    loadMeta(meta: MetaElement): void;
    /**
     * Match this element against given selectors. Returns true if any selector
     * matches.
     *
     * Implementation of DOM specification of Element.matches(selectors).
     */
    matches(selector: string): boolean;
    get meta(): MetaElement;
    /**
     * Set annotation for this element.
     */
    setAnnotation(text: string): void;
    /**
     * Set attribute. Stores all attributes set even with the same name.
     *
     * @param key - Attribute name
     * @param value - Attribute value. Use `null` if no value is present.
     * @param keyLocation - Location of the attribute name.
     * @param valueLocation - Location of the attribute value (excluding quotation)
     * @param originalAttribute - If attribute is an alias for another attribute
     * (dynamic attributes) set this to the original attribute name.
     */
    setAttribute(key: string, value: string | DynamicValue | null, keyLocation: Location | null, valueLocation: Location | null, originalAttribute?: string): void;
    /**
     * Get a list of all attributes on this node.
     */
    get attributes(): Attribute[];
    hasAttribute(key: string): boolean;
    /**
     * Get attribute.
     *
     * By default only the first attribute is returned but if the code needs to
     * handle duplicate attributes the `all` parameter can be set to get all
     * attributes with given key.
     *
     * This usually only happens when code contains duplicate attributes (which
     * `no-dup-attr` will complain about) or when a static attribute is combined
     * with a dynamic, consider:
     *
     * <p class="foo" dynamic-class="bar">
     *
     * @param {string} key - Attribute name
     * @param {boolean} [all=false] - Return single or all attributes.
     */
    getAttribute(key: string): Attribute;
    getAttribute(key: string, all: true): Attribute[];
    /**
     * Get attribute value.
     *
     * Returns the attribute value if present.
     *
     * - Missing attributes return `null`.
     * - Boolean attributes return `null`.
     * - `DynamicValue` returns attribute expression.
     *
     * @param {string} key - Attribute name
     * @return Attribute value or null.
     */
    getAttributeValue(key: string): string | null;
    /**
     * Add text as a child node to this element.
     *
     * @param text - Text to add.
     * @param location - Source code location of this text.
     */
    appendText(text: string | DynamicValue, location?: Location): void;
    /**
     * Return a list of all known classes on the element. Dynamic values are
     * ignored.
     */
    get classList(): DOMTokenList;
    /**
     * Get element ID if present.
     */
    get id(): string | null;
    get siblings(): HtmlElement[];
    get previousSibling(): HtmlElement;
    get nextSibling(): HtmlElement;
    getElementsByTagName(tagName: string): HtmlElement[];
    querySelector(selector: string): HtmlElement;
    querySelectorAll(selector: string): HtmlElement[];
    private querySelectorImpl;
    /**
     * Visit all nodes from this node and down. Depth first.
     */
    visitDepthFirst(callback: (node: HtmlElement) => void): void;
    /**
     * Evaluates callbackk on all descendants, returning true if any are true.
     */
    someChildren(callback: (node: HtmlElement) => boolean): boolean;
    /**
     * Evaluates callbackk on all descendants, returning true if all are true.
     */
    everyChildren(callback: (node: HtmlElement) => boolean): boolean;
    /**
     * Visit all nodes from this node and down. Breadth first.
     *
     * The first node for which the callback evaluates to true is returned.
     */
    find(callback: (node: HtmlElement) => boolean): HtmlElement;
}
