import { Location } from "../context";
export declare class ParserError extends Error {
    location: Location;
    constructor(location: Location, message: string);
}
