export = compileFiles;
/**
 * Compiles .ts files in the specified directory.
 * @param {string} path Path to the folder where the ts files to be compiled should be. Must be relative to the repo base.
 * @returns {Promise<void>}
 * @example
 * // create the build directory based off the source directory
 * compileFiles("extension/build");
 * // delete the ts files in that directory
 */
declare function compileFiles(path: string): Promise<void>;
