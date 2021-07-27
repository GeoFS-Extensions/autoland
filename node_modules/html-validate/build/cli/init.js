"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Frameworks = void 0;
const fs_1 = __importDefault(require("fs"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const inquirer_1 = __importDefault(require("inquirer"));
var Frameworks;
(function (Frameworks) {
    Frameworks["angularjs"] = "AngularJS";
    Frameworks["vuejs"] = "Vue.js";
    Frameworks["markdown"] = "Markdown";
})(Frameworks = exports.Frameworks || (exports.Frameworks = {}));
const frameworkConfig = {
    [Frameworks.angularjs]: {
        transform: {
            "^.*\\.js$": "html-validate-angular/js",
            "^.*\\.html$": "html-validate-angular/html",
        },
    },
    [Frameworks.vuejs]: {
        plugins: ["html-validate-vue"],
        extends: ["html-validate-vue:recommended"],
        transform: {
            "^.*\\.vue$": "html-validate-vue",
        },
    },
    [Frameworks.markdown]: {
        transform: {
            "^.*\\.md$": "html-validate-markdown",
        },
    },
};
function addFrameworks(src, frameworks) {
    let config = src;
    for (const framework of frameworks) {
        config = deepmerge_1.default(config, frameworkConfig[framework]);
    }
    return config;
}
function writeConfig(dst, config) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(dst, JSON.stringify(config, null, 2), (err) => {
            if (err)
                reject(err);
            resolve();
        });
    });
}
async function init(cwd) {
    const filename = `${cwd}/.htmlvalidate.json`;
    const exists = fs_1.default.existsSync(filename);
    const initialConfig = {
        elements: ["html5"],
        extends: ["html-validate:recommended"],
    };
    const when = /* istanbul ignore next */ (answers) => {
        return !exists || answers.write;
    };
    const questions = [
        {
            name: "write",
            type: "confirm",
            default: false,
            when: exists,
            message: "A .htmlvalidate.json file already exists, do you want to overwrite it?",
        },
        {
            name: "frameworks",
            type: "checkbox",
            choices: [Frameworks.angularjs, Frameworks.vuejs, Frameworks.markdown],
            message: "Support additional frameworks?",
            when,
        },
    ];
    /* prompt user for questions */
    const answers = await inquirer_1.default.prompt(questions);
    /* dont overwrite configuration unless explicitly requested */
    if (exists && !answers.write) {
        return Promise.reject();
    }
    /* write configuration to file */
    let config = initialConfig;
    config = addFrameworks(config, answers.frameworks);
    await writeConfig(filename, config);
    return {
        filename,
    };
}
exports.init = init;
