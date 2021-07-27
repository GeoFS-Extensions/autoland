export interface Location {
    /**
     * The filemane this location refers to.
     */
    readonly filename: string;
    /**
     * The string offset (number of characters into the string) this location
     * refers to.
     */
    readonly offset: number;
    /**
     * The line number in the file.
     */
    readonly line: number;
    /**
     * The column number in the file. Tabs counts as 1 (not expanded).
     */
    readonly column: number;
    /**
     * The number of characters this location refers to. This includes any
     * whitespace characters such as newlines.
     */
    readonly size: number;
}
/**
 * Calculate a new location by offsetting this location.
 *
 * If the references text with newlines the wrap parameter must be set to
 * properly calculate line and column information. If not given the text is
 * assumed to contain no newlines.
 *
 * @param location Source location
 * @param begin - Start location. Default is 0.
 * @param end - End location. Default is size of location. Negative values are
 * counted from end, e.g. `-2` means `size - 2`.
 * @param wrap - If given, line/column is wrapped for each newline occuring
 * before location end.
 */
export declare function sliceLocation(location: Location, begin: number, end?: number, wrap?: string): Location;
