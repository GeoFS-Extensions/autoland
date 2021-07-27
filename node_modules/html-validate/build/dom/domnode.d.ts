import { Location } from "../context";
import { NodeType } from "./nodetype";
export declare type DOMInternalID = number;
export declare function reset(): void;
export declare class DOMNode {
    readonly nodeName: string;
    readonly nodeType: NodeType;
    readonly childNodes: DOMNode[];
    readonly location: Location;
    readonly unique: DOMInternalID;
    /**
     * Set of disabled rules for this node.
     *
     * Rules disabled by using directives are added here.
     */
    private disabledRules;
    /**
     * Create a new DOMNode.
     *
     * @param nodeType - What node type to create.
     * @param nodeName - What node name to use. For `HtmlElement` this corresponds
     * to the tagName but other node types have specific predefined values.
     * @param location - Source code location of this node.
     */
    constructor(nodeType: NodeType, nodeName: string, location?: Location);
    /**
     * Get the text (recursive) from all child nodes.
     */
    get textContent(): string;
    append(node: DOMNode): void;
    isRootElement(): boolean;
    /**
     * Returns a DOMNode representing the first direct child node or `null` if the
     * node has no children.
     */
    get firstChild(): DOMNode;
    /**
     * Returns a DOMNode representing the last direct child node or `null` if the
     * node has no children.
     */
    get lastChild(): DOMNode;
    /**
     * Disable a rule for this node.
     */
    disableRule(ruleId: string): void;
    /**
     * Disables multiple rules.
     */
    disableRules(rules: string[]): void;
    /**
     * Enable a previously disabled rule for this node.
     */
    enableRule(ruleId: string): void;
    /**
     * Enables multiple rules.
     */
    enableRules(rules: string[]): void;
    /**
     * Test if a rule is enabled for this node.
     */
    ruleEnabled(ruleId: string): boolean;
    generateSelector(): string | null;
}
