"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console, no-process-exit, sonarjs/no-duplicate-string */
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const minimist_1 = __importDefault(require("minimist"));
const error_1 = require("../error");
const user_error_1 = require("../error/user-error");
const reporter_1 = require("../reporter");
const json_1 = require("./json");
const cli_1 = require("./cli");
const pkg = require("../../package.json");
var Mode;
(function (Mode) {
    Mode[Mode["LINT"] = 0] = "LINT";
    Mode[Mode["INIT"] = 1] = "INIT";
    Mode[Mode["DUMP_EVENTS"] = 2] = "DUMP_EVENTS";
    Mode[Mode["DUMP_TOKENS"] = 3] = "DUMP_TOKENS";
    Mode[Mode["DUMP_TREE"] = 4] = "DUMP_TREE";
    Mode[Mode["DUMP_SOURCE"] = 5] = "DUMP_SOURCE";
    Mode[Mode["PRINT_CONFIG"] = 6] = "PRINT_CONFIG";
})(Mode || (Mode = {}));
function getMode(argv) {
    if (argv.init) {
        return Mode.INIT;
    }
    if (argv["dump-events"]) {
        return Mode.DUMP_EVENTS;
    }
    if (argv["dump-source"]) {
        return Mode.DUMP_SOURCE;
    }
    if (argv["dump-tokens"]) {
        return Mode.DUMP_TOKENS;
    }
    if (argv["dump-tree"]) {
        return Mode.DUMP_TREE;
    }
    if (argv["print-config"]) {
        return Mode.PRINT_CONFIG;
    }
    return Mode.LINT;
}
function lint(files) {
    const reports = files.map((filename) => {
        try {
            return htmlvalidate.validateFile(filename);
        }
        catch (err) {
            console.error(chalk_1.default.red(`Validator crashed when parsing "${filename}"`));
            throw err;
        }
    });
    return reporter_1.Reporter.merge(reports);
}
function dump(files, mode) {
    let lines = [];
    switch (mode) {
        case Mode.DUMP_EVENTS:
            lines = files.map((filename) => htmlvalidate.dumpEvents(filename).map(json_1.eventFormatter));
            break;
        case Mode.DUMP_TOKENS:
            lines = files.map((filename) => htmlvalidate.dumpTokens(filename).map((entry) => {
                const data = JSON.stringify(entry.data);
                return `TOKEN: ${entry.token}\n  Data: ${data}\n  Location: ${entry.location}`;
            }));
            break;
        case Mode.DUMP_TREE:
            lines = files.map((filename) => htmlvalidate.dumpTree(filename));
            break;
        case Mode.DUMP_SOURCE:
            lines = files.map((filename) => htmlvalidate.dumpSource(filename));
            break;
        default:
            throw new Error(`Unknown mode "${mode}"`);
    }
    const flat = lines.reduce((s, c) => s.concat(c), []);
    return flat.join("\n");
}
function renameStdin(report, filename) {
    const stdin = report.results.find((cur) => cur.filePath === "/dev/stdin");
    if (stdin) {
        stdin.filePath = filename;
    }
}
function handleValidationError(err) {
    if (err.filename) {
        const filename = path_1.default.relative(process.cwd(), err.filename);
        console.log(chalk_1.default.red(`A configuration error was found in "${filename}":`));
    }
    else {
        console.log(chalk_1.default.red(`A configuration error was found:`));
    }
    console.group();
    {
        console.log(err.prettyError());
    }
    console.groupEnd();
}
function handleUserError(err) {
    console.error(chalk_1.default.red("Caught exception:"));
    console.group();
    {
        console.error(err);
    }
    console.groupEnd();
}
function handleUnknownError(err) {
    console.error(chalk_1.default.red("Caught exception:"));
    console.group();
    {
        console.error(err);
    }
    console.groupEnd();
    const bugUrl = `${pkg.bugs.url}?issuable_template=Bug`;
    console.error(chalk_1.default.red(`This is a bug in ${pkg.name}-${pkg.version}.`));
    console.error(chalk_1.default.red([
        `Please file a bug at ${bugUrl}`,
        `and include this message in full and if possible the content of the`,
        `file being parsed (or a reduced testcase).`,
    ].join("\n")));
}
const argv = minimist_1.default(process.argv.slice(2), {
    string: [
        "c",
        "config",
        "ext",
        "f",
        "formatter",
        "max-warnings",
        "rule",
        "stdin-filename",
    ],
    boolean: [
        "init",
        "dump-events",
        "dump-source",
        "dump-tokens",
        "dump-tree",
        "h",
        "help",
        "print-config",
        "stdin",
        "version",
    ],
    alias: {
        c: "config",
        f: "formatter",
        h: "help",
    },
    default: {
        formatter: "stylish",
    },
    unknown: (opt) => {
        if (opt[0] === "-") {
            process.stderr.write(`unknown option ${opt}\n`);
            process.exit(1);
        }
        return true;
    },
});
function showUsage() {
    process.stdout.write(`${pkg.name}-${pkg.version}
Usage: html-validate [OPTIONS] [FILENAME..] [DIR..]

Common options:
      --ext=STRING               specify file extensions (commaseparated).
  -f, --formatter=FORMATTER      specify the formatter to use.
      --max-warnings=INT         number of warnings to trigger nonzero exit code
      --rule=RULE:SEVERITY       set additional rule, use comma separator for
                                 multiple.
      --stdin                    process markup from stdin.
      --stdin-filename=STRING    specify filename to report when using stdin

Miscellaneous:
  -c, --config=STRING            use custom configuration file.
      --init                     initialize project with a new configuration
      --print-config             output configuration for given file.
  -h, --help                     show help.
      --version                  show version.

Debugging options:
      --dump-events              output events during parsing.
      --dump-source              output post-transformed source data.
      --dump-tokens              output tokens from lexing stage.
      --dump-tree                output nodes from the dom tree.

Formatters:

Multiple formatters can be specified with a comma-separated list,
e.g. "json,checkstyle" to enable both.

To capture output to a file use "formatter=/path/to/file",
e.g. "checkstyle=build/html-validate.xml"
`);
}
function showVersion() {
    process.stdout.write(`${pkg.name}-${pkg.version}\n`);
}
if (argv.stdin) {
    argv._.push("-");
}
if (argv.version) {
    showVersion();
    process.exit();
}
if (argv.help || (argv._.length === 0 && !argv.init)) {
    showUsage();
    process.exit();
}
const cli = new cli_1.CLI({
    configFile: argv.config,
    rules: argv.rule,
});
const mode = getMode(argv);
const formatter = cli.getFormatter(argv.formatter);
const maxWarnings = parseInt(argv["max-warnings"] || "-1", 10);
const htmlvalidate = cli.getValidator();
/* sanity check: ensure maxWarnings has a valid value */
if (isNaN(maxWarnings)) {
    console.log(`Invalid value "${argv["max-warnings"]}" given to --max-warnings`);
    process.exit(1);
}
/* parse extensions (used when expanding directories) */
const extensions = (argv.ext || "html").split(",").map((cur) => {
    return cur[0] === "." ? cur.slice(1) : cur;
});
const files = cli.expandFiles(argv._, { extensions });
if (files.length === 0 && mode !== Mode.INIT) {
    console.error("No files matching patterns", argv._);
    process.exit(1);
}
try {
    if (mode === Mode.LINT) {
        const result = lint(files);
        /* rename stdin if an explicit filename was passed */
        if (argv["stdin-filename"]) {
            renameStdin(result, argv["stdin-filename"]);
        }
        process.stdout.write(formatter(result));
        if (maxWarnings >= 0 && result.warningCount > maxWarnings) {
            console.log(`\nhtml-validate found too many warnings (maxiumum: ${maxWarnings}).`);
            result.valid = false;
        }
        process.exit(result.valid ? 0 : 1);
    }
    else if (mode === Mode.INIT) {
        cli
            .init(process.cwd())
            .then((result) => {
            console.log(`Configuration written to "${result.filename}"`);
        })
            .catch((err) => {
            if (err) {
                console.error(err);
            }
            process.exit(1);
        });
    }
    else if (mode === Mode.PRINT_CONFIG) {
        const config = htmlvalidate.getConfigFor(files[0]);
        const json = JSON.stringify(config.get(), null, 2);
        console.log(json);
    }
    else {
        const output = dump(files, mode);
        console.log(output);
        process.exit(0);
    }
}
catch (err) {
    if (err instanceof error_1.SchemaValidationError) {
        handleValidationError(err);
    }
    else if (err instanceof user_error_1.UserError) {
        handleUserError(err);
    }
    else {
        handleUnknownError(err);
    }
    process.exit(1);
}
