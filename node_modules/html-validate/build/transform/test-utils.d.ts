import { Source } from "../context";
import { Transformer } from ".";
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param filename - Filename to read data from. Must be readable.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
export declare function transformFile(fn: Transformer, filename: string, chain?: (source: Source, filename: string) => Iterable<Source>): Source[];
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param data - String to transform.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
export declare function transformString(fn: Transformer, data: string, chain?: (source: Source, filename: string) => Iterable<Source>): Source[];
/**
 * Helper function to call a transformer function in test-cases.
 *
 * @param fn - Transformer function to call.
 * @param data - Source to transform.
 * @param chain - If set this function is called when chaining transformers. Default is pass-thru.
 */
export declare function transformSource(fn: Transformer, source: Source, chain?: (source: Source, filename: string) => Iterable<Source>): Source[];
