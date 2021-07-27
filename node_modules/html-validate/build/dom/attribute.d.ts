import { Location } from "../context";
import { DynamicValue } from "./dynamic-value";
/**
 * DOM Attribute.
 *
 * Represents a HTML attribute. Can contain either a fixed static value or a
 * placeholder for dynamic values (e.g. interpolated).
 */
export declare class Attribute {
    /** Attribute name */
    readonly key: string;
    readonly value: string | DynamicValue;
    readonly keyLocation: Location;
    readonly valueLocation: Location;
    readonly originalAttribute?: string;
    /**
     * @param key - Attribute name.
     * @param value - Attribute value. Set to `null` for boolean attributes.
     * @param keyLocation - Source location of attribute name.
     * @param valueLocation - Source location of attribute value.
     * @param originalAttribute - If this attribute was dynamically added via a
     * transformation (e.g. vuejs `:id` generating the `id` attribute) this
     * parameter should be set to the attribute name of the source attribute (`:id`).
     */
    constructor(key: string, value: null | string | DynamicValue, keyLocation?: Location, valueLocation?: Location, originalAttribute?: string);
    /**
     * Flag set to true if the attribute value is static.
     */
    get isStatic(): boolean;
    /**
     * Flag set to true if the attribute value is dynamic.
     */
    get isDynamic(): boolean;
    /**
     * Test attribute value.
     *
     * @param {RegExp|string} pattern - Pattern to match value against. RegExp or
     * a string (===)
     * @param {boolean} [dynamicMatches=true] - If true `DynamicValue` will always
     * match, if false it never matches.
     * @returns {boolean} `true` if attribute value matches pattern.
     */
    valueMatches(pattern: RegExp, dynamicMatches?: boolean): boolean;
    valueMatches(pattern: string, dynamicMatches?: boolean): boolean;
}
