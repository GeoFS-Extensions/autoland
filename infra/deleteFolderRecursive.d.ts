export = deleteFolderRecursive;
/**
 * Deletes a folder and all its contents.
 * This runs with the working dir `infra/`.
 * @param {string} path The path to the directory to delete.
 * @returns {string} The path of the directory that was deleted.
 * @example
 * deleteFolderRecursive("path/that/doesnt/exist"); // Error: Path "path/that/doesnt/exist" doesn't exist!
 * deleteFolderRecursive("path/that/does/exist"); // completes successfully
 */
declare function deleteFolderRecursive(path: string): string;
