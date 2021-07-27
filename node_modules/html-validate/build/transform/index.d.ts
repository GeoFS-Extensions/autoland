import { Source } from "../context";
import { TransformContext } from "./context";
export { TransformContext } from "./context";
export { TemplateExtractor } from "./template";
export { offsetToLineColumn } from "./helpers";
export declare type Transformer = (this: TransformContext, source: Source) => Iterable<Source>;
export declare enum TRANSFORMER_API {
    VERSION = 1
}
