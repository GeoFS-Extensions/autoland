import { Source } from "../context";
export interface Position {
    line: number;
    column: number;
}
declare module "estree" {
    interface TemplateElement {
        start: number;
        end: number;
    }
}
/**
 * Compute source offset from line and column and the given markup.
 *
 * @param position - Line and column.
 * @param data - Source markup.
 * @returns The byte offset into the markup which line and column corresponds to.
 */
export declare function computeOffset(position: Position, data: string): number;
export declare class TemplateExtractor {
    private ast;
    private filename;
    private data;
    private constructor();
    static fromFilename(filename: string): TemplateExtractor;
    /**
     * Create a new [[TemplateExtractor]] from javascript source code.
     *
     * `Source` offsets will be relative to the string, i.e. offset 0 is the first
     * character of the string. If the string is only a subset of a larger string
     * the offsets must be adjusted manually.
     *
     * @param source - Source code.
     * @param filename - Optional filename to set in the resulting
     * `Source`. Defauls to `"inline"`.
     */
    static fromString(source: string, filename?: string): TemplateExtractor;
    /**
     * Convenience function to create a [[Source]] instance from an existing file.
     *
     * @param filename - Filename with javascript source code. The file must exist
     * and be readable by the user.
     * @returns An array of Source's suitable for passing to [[Engine]] linting
     * functions.
     */
    static createSource(filename: string): Source[];
    /**
     * Extract object properties.
     *
     * Given a key `"template"` this method finds all objects literals with a
     * `"template"` property and creates a [[Source]] instance with proper offsets
     * with the value of the property. For instance:
     *
     * ```
     * const myObj = {
     *   foo: 'bar',
     * };
     * ```
     *
     * The above snippet would yield a `Source` with the content `bar`.
     *
     */
    extractObjectProperty(key: string): Source[];
}
