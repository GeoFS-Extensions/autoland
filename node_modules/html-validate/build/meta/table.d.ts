import { HtmlElement } from "../dom";
import { SchemaValidationPatch } from "../plugin";
import { ElementTable, MetaDataTable, MetaElement, MetaLookupableProperty } from "./element";
export declare class MetaTable {
    readonly elements: ElementTable;
    private schema;
    constructor();
    init(): void;
    /**
     * Extend validation schema.
     */
    extendValidationSchema(patch: SchemaValidationPatch): void;
    /**
     * Load metadata table from object.
     *
     * @param obj - Object with metadata to load
     * @param filename - Optional filename used when presenting validation error
     */
    loadFromObject(obj: MetaDataTable, filename?: string | null): void;
    /**
     * Load metadata table from filename
     *
     * @param filename - Filename to load
     */
    loadFromFile(filename: string): void;
    /**
     * Get [[MetaElement]] for the given tag or null if the element doesn't exist.
     *
     * @returns A shallow copy of metadata.
     */
    getMetaFor(tagName: string): MetaElement | null;
    /**
     * Find all tags which has enabled given property.
     */
    getTagsWithProperty(propName: MetaLookupableProperty): string[];
    /**
     * Find tag matching tagName or inheriting from it.
     */
    getTagsDerivedFrom(tagName: string): string[];
    private addEntry;
    /**
     * Finds the global element definition and merges each known element with the
     * global, e.g. to assign global attributes.
     */
    private resolveGlobal;
    private mergeElement;
    resolve(node: HtmlElement): void;
}
