"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporter = void 0;
const config_1 = require("./config");
class Reporter {
    constructor() {
        this.result = {};
    }
    /**
     * Merge two or more reports into a single one.
     */
    static merge(reports) {
        const valid = reports.every((report) => report.valid);
        const merged = {};
        reports.forEach((report) => {
            report.results.forEach((result) => {
                const key = result.filePath;
                if (key in merged) {
                    merged[key].messages = [].concat(merged[key].messages, result.messages);
                }
                else {
                    merged[key] = Object.assign({}, result);
                }
            });
        });
        const results = Object.values(merged).map((result) => {
            /* recalculate error- and warning-count */
            result.errorCount = countErrors(result.messages);
            result.warningCount = countWarnings(result.messages);
            return result;
        });
        return {
            valid,
            results,
            errorCount: sumErrors(results),
            warningCount: sumWarnings(results),
        };
    }
    add(rule, message, severity, node, location, context) {
        if (!(location.filename in this.result)) {
            this.result[location.filename] = [];
        }
        this.result[location.filename].push({
            ruleId: rule.name,
            severity,
            message,
            offset: location.offset,
            line: location.line,
            column: location.column,
            size: location.size || 0,
            selector: node ? node.generateSelector() : null,
            context,
        });
    }
    addManual(filename, message) {
        if (!(filename in this.result)) {
            this.result[filename] = [];
        }
        this.result[filename].push(message);
    }
    save(sources) {
        const report = {
            valid: this.isValid(),
            results: Object.keys(this.result).map((filePath) => {
                const messages = [].concat(this.result[filePath]).sort(messageSort);
                const source = (sources || []).find((source) => { var _a; return filePath === ((_a = source.filename) !== null && _a !== void 0 ? _a : ""); });
                return {
                    filePath,
                    messages,
                    errorCount: countErrors(messages),
                    warningCount: countWarnings(messages),
                    source: source ? source.originalData || source.data : null,
                };
            }),
            errorCount: 0,
            warningCount: 0,
        };
        report.errorCount = sumErrors(report.results);
        report.warningCount = sumWarnings(report.results);
        return report;
    }
    isValid() {
        const numErrors = Object.values(this.result).reduce((sum, messages) => {
            return sum + countErrors(messages);
        }, 0);
        return numErrors === 0;
    }
}
exports.Reporter = Reporter;
function countErrors(messages) {
    return messages.filter((m) => m.severity === config_1.Severity.ERROR).length;
}
function countWarnings(messages) {
    return messages.filter((m) => m.severity === config_1.Severity.WARN).length;
}
function sumErrors(results) {
    return results.reduce((sum, result) => {
        return sum + result.errorCount;
    }, 0);
}
function sumWarnings(results) {
    return results.reduce((sum, result) => {
        return sum + result.warningCount;
    }, 0);
}
function messageSort(a, b) {
    if (a.line < b.line) {
        return -1;
    }
    if (a.line > b.line) {
        return 1;
    }
    if (a.column < b.column) {
        return -1;
    }
    if (a.column > b.column) {
        return 1;
    }
    return 0;
}
exports.default = Reporter;
