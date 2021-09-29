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

  fs.writeFileSync("./source/data/airports.json", JSON.stringify(airports));
}

function navaidsList() {
  let a = fs.readFileSync("./data/navaids.csv", { encoding: "utf8" });
  a = a.split("\n");
  a.shift();

  const navaids = {};

  for (let navaid of a) {
    if (navaid[0] == undefined) continue;
    navaid = navaid.split(",");

    let name = navaid[2].substring(1).substring(0, navaid[2].length - 2);
    navaids[name] = [Number(navaid[6]), Number(navaid[7])];
  }

  fs.writeFileSync("./source/data/navaids.json", JSON.stringify(navaids));
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

navaidsList();
console.log("navaids list built!");

airportsList();
console.log("airports list built!");

deleteFolderRecursive("build");
console.log("build folder deleted!");

fs.copySync("source", "build");
fs.unlinkSync("build/tsconfig.json");
console.log("source copied to build!");
