import { Location } from "./context";
import { DOMNode } from "./dom";
import { AttributeEvent, ConditionalEvent, DoctypeEvent, DOMReadyEvent, ElementReadyEvent, Event, TagCloseEvent, TagOpenEvent, WhitespaceEvent, ConfigReadyEvent } from "./event";
import { Parser } from "./parser";
import { Reporter } from "./reporter";
import { MetaTable, MetaLookupableProperty } from "./meta";
export interface RuleDocumentation {
    description: string;
    url?: string;
}
export declare type RuleConstructor<T, U> = new (options?: any) => Rule<T, U>;
export interface IncludeExcludeOptions {
    include: string[] | null;
    exclude: string[] | null;
}
export declare abstract class Rule<ContextType = void, OptionsType = void> {
    private reporter;
    private parser;
    private meta;
    private enabled;
    private severity;
    private event;
    /**
     * Rule name. Defaults to filename without extension but can be overwritten by
     * subclasses.
     */
    name: string;
    /**
     * Rule options.
     */
    readonly options: OptionsType;
    constructor(options: OptionsType);
    getSeverity(): number;
    setServerity(severity: number): void;
    setEnabled(enabled: boolean): void;
    /**
     * Returns `true` if rule is deprecated.
     *
     * Overridden by subclasses.
     */
    get deprecated(): boolean;
    /**
     * Test if rule is enabled.
     *
     * To be considered enabled the enabled flag must be true and the severity at
     * least warning.
     */
    isEnabled(): boolean;
    /**
     * Check if keyword is being ignored by the current rule configuration.
     *
     * This method requires the [[RuleOption]] type to include two properties:
     *
     * - include: string[] | null
     * - exclude: string[] | null
     *
     * This methods checks if the given keyword is included by "include" but not
     * excluded by "exclude". If any property is unset it is skipped by the
     * condition. Usually the user would use either one but not both but there is
     * no limitation to use both but the keyword must satisfy both conditions. If
     * either condition fails `true` is returned.
     *
     * For instance, given `{ include: ["foo"] }` the keyword `"foo"` would match
     * but not `"bar"`.
     *
     * Similarly, given `{ exclude: ["foo"] }` the keyword `"bar"` would match but
     * not `"foo"`.
     *
     * @param keyword - Keyword to match against `include` and `exclude` options.
     * @returns `true` if keyword is not present in `include` or is present in
     * `exclude`.
     */
    isKeywordIgnored<T extends IncludeExcludeOptions>(this: {
        options: T;
    }, keyword: string): boolean;
    /**
     * Find all tags which has enabled given property.
     */
    getTagsWithProperty(propName: MetaLookupableProperty): string[];
    /**
     * Find tag matching tagName or inheriting from it.
     */
    getTagsDerivedFrom(tagName: string): string[];
    /**
     * Report a new error.
     *
     * Rule must be enabled both globally and on the specific node for this to
     * have any effect.
     */
    report(node: DOMNode, message: string, location?: Location, context?: ContextType): void;
    private findLocation;
    /**
     * Listen for events.
     *
     * Adding listeners can be done even if the rule is disabled but for the
     * events to be delivered the rule must be enabled.
     *
     * @param event - Event name
     */
    on(event: "config:ready", callback: (event: ConfigReadyEvent) => void): void;
    on(event: "tag:open", callback: (event: TagOpenEvent) => void): void;
    on(event: "tag:close", callback: (event: TagCloseEvent) => void): void;
    on(event: "element:ready", callback: (event: ElementReadyEvent) => void): void;
    on(event: "dom:load", callback: (event: Event) => void): void;
    on(event: "dom:ready", callback: (event: DOMReadyEvent) => void): void;
    on(event: "doctype", callback: (event: DoctypeEvent) => void): void;
    on(event: "attr", callback: (event: AttributeEvent) => void): void;
    on(event: "whitespace", callback: (event: WhitespaceEvent) => void): void;
    on(event: "conditional", callback: (event: ConditionalEvent) => void): void;
    on(event: "*", callback: (event: Event) => void): void;
    /**
     * Called by [[Engine]] when initializing the rule.
     *
     * Do not override this, use the `setup` callback instead.
     *
     * @hidden
     */
    init(parser: Parser, reporter: Reporter, severity: number, meta: MetaTable): void;
    /**
     * Rule setup callback.
     *
     * Override this to provide rule setup code.
     */
    abstract setup(): void;
    /**
     * Rule documentation callback.
     *
     * Called when requesting additional documentation for a rule. Some rules
     * provide additional context to provide context-aware suggestions.
     *
     * @param context - Error context given by a reported error.
     * @returns Rule documentation and url with additional details or `null` if no
     * additional documentation is available.
     */
    documentation(context?: ContextType): RuleDocumentation;
}
export declare function ruleDocumentationUrl(filename: string): string;
