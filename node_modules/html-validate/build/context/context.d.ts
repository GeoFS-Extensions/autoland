import { Location } from "./location";
import { Source } from "./source";
export declare enum ContentModel {
    TEXT = 1,
    SCRIPT = 2
}
export declare class Context {
    contentModel: ContentModel;
    state: number;
    string: string;
    private filename;
    private offset;
    private line;
    private column;
    constructor(source: Source);
    getTruncatedLine(n?: number): string;
    consume(n: number | string[], state: number): void;
    getLocation(size?: number): Location;
}
export default Context;
