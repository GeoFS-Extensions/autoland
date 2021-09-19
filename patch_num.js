/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0*/

const fs = require("fs-extra");

let manifest = fs.readJSONSync("source/manifest.json");

console.log("Read manifest as:");
console.log(manifest);

let version = manifest.version.split(".");

version[3]++;

manifest.version = version.join(".");

console.log("Incremented version number to " + manifest.version);

fs.writeJSONSync("source/manifest.json", manifest);

console.log("Saved manifest as:");
console.log(manifest);
