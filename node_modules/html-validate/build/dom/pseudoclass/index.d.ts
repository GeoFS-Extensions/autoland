import { HtmlElement } from "../htmlelement";
declare type PseudoClassFunction = (node: HtmlElement, args?: string) => boolean;
export declare function factory(name: string): PseudoClassFunction;
export {};
