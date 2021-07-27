import { Config } from "../config";
import { Location, Source } from "../context";
import { DOMTree, HtmlElement } from "../dom";
import { AttributeEvent, ConditionalEvent, ConfigReadyEvent, DirectiveEvent, DoctypeEvent, DOMReadyEvent, ElementReadyEvent, Event, EventCallback, EventHandler, TagCloseEvent, TagOpenEvent, WhitespaceEvent } from "../event";
import { Token, TokenStream, TokenType } from "../lexer";
/**
 * Parse HTML document into a DOM tree.
 */
export declare class Parser {
    private readonly event;
    private readonly metaTable;
    private dom;
    /**
     * Create a new parser instance.
     *
     * @param config - Configuration
     */
    constructor(config: Config);
    /**
     * Parse HTML markup.
     *
     * @param source - HTML markup.
     * @returns DOM tree representing the HTML markup.
     */
    parseHtml(source: string | Source): DOMTree;
    /**
     * Detect optional end tag.
     *
     * Some tags have optional end tags (e.g. <ul><li>foo<li>bar</ul> is
     * valid). The parser handles this by checking if the element on top of the
     * stack when is allowed to omit.
     */
    private closeOptional;
    protected consumeTag(source: Source, startToken: Token, tokenStream: TokenStream): void;
    protected closeElement(source: Source, node: HtmlElement, active: HtmlElement, location: Location): void;
    private processElement;
    /**
     * Discard tokens until the end tag for the foreign element is found.
     */
    protected discardForeignBody(source: Source, foreignTagName: string, tokenStream: TokenStream, errorLocation: Location): void;
    protected consumeAttribute(source: Source, node: HtmlElement, token: Token, next?: Token): void;
    /**
     * Take attribute value token and return a new location referring to only the
     * value.
     *
     * foo="bar"    foo='bar'    foo=bar    foo      foo=""
     *      ^^^          ^^^         ^^^    (null)   (null)
     */
    private getAttributeValueLocation;
    protected consumeDirective(token: Token): void;
    /**
     * Consumes comment token.
     *
     * Tries to find IE conditional comments and emits conditional token if found.
     */
    protected consumeComment(token: Token): void;
    /**
     * Consumes doctype tokens. Emits doctype event.
     */
    protected consumeDoctype(startToken: Token, tokenStream: TokenStream): void;
    /**
     * Return a list of tokens found until the expected token was found.
     *
     * @param errorLocation - What location to use if an error occurs
     */
    protected consumeUntil(tokenStream: TokenStream, search: TokenType, errorLocation: Location): IterableIterator<Token>;
    private next;
    /**
     * Listen on events.
     *
     * @param event - Event name.
     * @param listener - Event callback.
     * @returns A function to unregister the listener.
     */
    on(event: string, listener: EventCallback): () => void;
    /**
     * Listen on single event. The listener is automatically unregistered once the
     * event has been received.
     *
     * @param event - Event name.
     * @param listener - Event callback.
     * @returns A function to unregister the listener.
     */
    once(event: string, listener: EventCallback): () => void;
    /**
     * Defer execution. Will call function sometime later.
     *
     * @param cb - Callback to execute later.
     */
    defer(cb: () => void): void;
    /**
     * Trigger event.
     *
     * @param {string} event - Event name
     * @param {Event} data - Event data
     */
    trigger(event: "config:ready", data: ConfigReadyEvent): void;
    trigger(event: "tag:open", data: TagOpenEvent): void;
    trigger(event: "tag:close", data: TagCloseEvent): void;
    trigger(event: "element:ready", data: ElementReadyEvent): void;
    trigger(event: "dom:load", data: Event): void;
    trigger(event: "dom:ready", data: DOMReadyEvent): void;
    trigger(event: "doctype", data: DoctypeEvent): void;
    trigger(event: "attr", data: AttributeEvent): void;
    trigger(event: "whitespace", data: WhitespaceEvent): void;
    trigger(event: "conditional", data: ConditionalEvent): void;
    trigger(event: "directive", data: DirectiveEvent): void;
    /**
     * @hidden
     */
    getEventHandler(): EventHandler;
    /**
     * Appends a text node to the current element on the stack.
     */
    private appendText;
    /**
     * Trigger close events for any still open elements.
     */
    private closeTree;
}
