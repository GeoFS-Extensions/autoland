"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _leven = _interopRequireDefault(require("leven"));

var _jsonpointer = _interopRequireDefault(require("jsonpointer"));

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EnumValidationError extends _base.default {
  print() {
    const {
      message,
      params: {
        allowedValues
      }
    } = this.options;
    const bestMatch = this.findBestMatch();
    const output = [_chalk.default`{red {bold ENUM} ${message}}`, _chalk.default`{red (${allowedValues.join(', ')})}\n`];
    return output.concat(this.getCodeFrame(bestMatch !== null ? _chalk.default`👈🏽  Did you mean {magentaBright ${bestMatch}} here?` : _chalk.default`👈🏽  Unexpected value, should be equal to one of the allowed values`));
  }

  getError() {
    const {
      message,
      dataPath,
      params
    } = this.options;
    const bestMatch = this.findBestMatch();

    const output = _objectSpread({}, this.getLocation(), {
      error: `${this.getDecoratedPath(dataPath)} ${message}: ${params.allowedValues.join(', ')}`,
      path: dataPath
    });

    if (bestMatch !== null) {
      output.suggestion = `Did you mean ${bestMatch}?`;
    }

    return output;
  }

  findBestMatch() {
    const {
      dataPath,
      params: {
        allowedValues
      }
    } = this.options;
    const currentValue = dataPath === '' ? this.data : _jsonpointer.default.get(this.data, dataPath);

    if (!currentValue) {
      return null;
    }

    const bestMatch = allowedValues.map(value => ({
      value,
      weight: (0, _leven.default)(value, currentValue.toString())
    })).sort((x, y) => x.weight > y.weight ? 1 : x.weight < y.weight ? -1 : 0)[0];
    return allowedValues.length === 1 || bestMatch.weight < bestMatch.value.length ? bestMatch.value : null;
  }

}

exports.default = EnumValidationError;