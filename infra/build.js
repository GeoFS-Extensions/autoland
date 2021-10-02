const { sync } = require("glob");
const fs = require("fs-extra");

// build the .prettierignore file
const filesToCompile = sync("**/.prettierignore", {
  ignore: [".prettierignore", "**/node_modules"],
});
let toWrite = "";

filesToCompile.forEach((value) => {
  const contents = fs.readFileSync(value, { encoding: "utf-8" });

  toWrite += contents + "\n";
});

fs.writeFileSync(".prettierignore", toWrite.slice(0, -1));
