export = moveToDir;
/**
 * Changes working directories relative to repo base.
 * @param {string} path Path to navigate to relative to repo base.
 * @example
 * moveToDir(); // Error: Path "undefined" is not valid.
 * moveToDir("path/that/doesnt/exist"); // Error: Path "path/that/doesnt/exist" is not valid.
 * moveToDir("path/that/does/exist"); // returns: "C:\Users\test\repo\path\that\does\exist"
 */
declare function moveToDir(path: string): string;
