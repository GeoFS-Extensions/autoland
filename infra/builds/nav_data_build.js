const { join } = require("path");
const chalk = require("chalk");
const homeDir = require("../main_dir");
const { writeJSONSync } = require("fs-extra");
const download = require("download");

/**
 * @param {string} url
 * @param {string} path
 * @returns {Promise<string>}
 */
async function downloadFile(url, path) {
  return new Promise((resolve, reject) => {
    download(url, path)
      .then((buf) => {
        resolve(buf.toString());
      })
      .catch((e) => reject(e));
  });
}

async function airportsList() {
  console.log(chalk.hex("#f573a3")("Starting airport data download..."));
  let rawData = await downloadFile("https://ourairports.com/data/airports.csv");
  console.log(
    chalk.hex("#b1c6fc")("Airport data downloaded, starting processing...")
  );
  let rawDataArray = rawData.split("\n");
  rawDataArray.shift();

  /** @type {{ [key: string]: number[] }} */
  let toSave = {};

  rawDataArray.forEach((value) => {
    if (value[0] == undefined) return;
    const airport = value.split(",");

    const name = airport[1].substring(1).substring(0, airport[1].length - 2);
    toSave[name] = [Number(airport[4]), Number(airport[5])];
  });
  console.log(
    chalk.hex("#d5ff80")(
      `Data processed, ${Object.keys(toSave).length} airports...`
    )
  );
  console.log(chalk.hex("#d5ff80")("Saving data..."));

  writeJSONSync(
    join(homeDir, "extension", "source", "data", "airports.json"),
    toSave
  );
  console.log(chalk.hex("#a1f086")("Airport data built!"));
}

async function navaidsList() {
  console.log(chalk.hex("#f573a3")("Starting navaid data download..."));
  let rawData = await downloadFile("https://ourairports.com/data/navaids.csv");
  console.log(
    chalk.hex("#b1c6fc")("Navaid data downloaded, starting processing...")
  );
  let rawDataArray = rawData.split("\n");
  rawDataArray.shift();

  /** @type {{ [key: string]: number[] }} */
  let toSave = {};

  rawDataArray.forEach((value) => {
    if (value[0] == undefined) return;
    const navaid = value.split(",");

    const name = navaid[2].substring(1).substring(0, navaid[2].length - 2);
    toSave[name] = [Number(navaid[6]), Number(navaid[7])];
  });
  console.log(
    chalk.hex("#d5ff80")(
      `Data processed, ${Object.keys(toSave).length} navaids...`
    )
  );
  console.log(chalk.hex("#d5ff80")("Saving data..."));

  writeJSONSync(
    join(homeDir, "extension", "source", "data", "navaids.json"),
    toSave
  );
  console.log(chalk.hex("#a1f086")("Navaid data built!"));
}

async function build() {
  console.log(chalk.yellow("Attempting nav data build..."));

  await airportsList();
  await navaidsList();
}

build();
