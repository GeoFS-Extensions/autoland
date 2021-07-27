import { Location } from "../context";
export interface ConditionalComment {
    expression: string;
    location: Location;
}
export declare function parseConditionalComment(comment: string, commentLocation: Location): IterableIterator<ConditionalComment>;
