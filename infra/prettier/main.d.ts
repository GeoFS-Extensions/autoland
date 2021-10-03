export = buildPrettierIgnoreFile;
/**
 * Builds the global .prettierignore file from smaller, local .prettierignore files.
 * Exists because prettier doesn't recognize .prettierignore files that aren't at its start working dir.
 */
declare function buildPrettierIgnoreFile(): void;
