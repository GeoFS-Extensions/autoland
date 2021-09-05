/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0*/

const fs = require("fs-extra");

// build airports.json
function airportsList() {
  let a = fs.readFileSync("./data/airports.csv", { encoding: "utf8" });
  a = a.split("\n");
  a.shift();

  const airports = {};

  for (let airport of a) {
    if (airport[0] == undefined) continue;
    airport = airport.split(",");

    let name = airport[1].substring(1).substring(0, airport[1].length - 2);
    airports[name] = [Number(airport[4]), Number(airport[5])];
  }

  fs.writeFileSync(
    "./source/data/airports.json",
    JSON.stringify(airports, null, 2)
  );
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
}

airportsList();
console.log("airport list built!");

deleteFolderRecursive("build");
console.log("build folder deleted!");

fs.copySync("source", "build");
fs.unlinkSync("build/tsconfig.json");
console.log("source copied to build!");
