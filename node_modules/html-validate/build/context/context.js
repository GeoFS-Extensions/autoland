"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = exports.ContentModel = void 0;
var ContentModel;
(function (ContentModel) {
    ContentModel[ContentModel["TEXT"] = 1] = "TEXT";
    ContentModel[ContentModel["SCRIPT"] = 2] = "SCRIPT";
})(ContentModel = exports.ContentModel || (exports.ContentModel = {}));
class Context {
    constructor(source) {
        var _a, _b, _c, _d;
        this.state = undefined;
        this.string = source.data;
        this.filename = (_a = source.filename) !== null && _a !== void 0 ? _a : "";
        this.offset = (_b = source.offset) !== null && _b !== void 0 ? _b : 0;
        this.line = (_c = source.line) !== null && _c !== void 0 ? _c : 1;
        this.column = (_d = source.column) !== null && _d !== void 0 ? _d : 1;
        this.contentModel = ContentModel.TEXT;
    }
    getTruncatedLine(n = 13) {
        return JSON.stringify(this.string.length > n ? `${this.string.slice(0, 10)}...` : this.string);
    }
    consume(n, state) {
        /* if "n" is an regex match the first value is the full matched
         * string so consume that many characters. */
        if (typeof n !== "number") {
            n = n[0].length; /* regex match */
        }
        /* poor mans line counter :( */
        let consumed = this.string.slice(0, n);
        let offset;
        while ((offset = consumed.indexOf("\n")) >= 0) {
            this.line++;
            this.column = 1;
            consumed = consumed.substr(offset + 1);
        }
        this.column += consumed.length;
        this.offset += n;
        /* remove N chars */
        this.string = this.string.substr(n);
        /* change state */
        this.state = state;
    }
    getLocation(size) {
        return {
            filename: this.filename,
            offset: this.offset,
            line: this.line,
            column: this.column,
            size,
        };
    }
}
exports.Context = Context;
exports.default = Context;
