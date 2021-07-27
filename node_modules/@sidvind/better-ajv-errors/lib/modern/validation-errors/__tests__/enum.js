"use strict";

var _jsonToAst = _interopRequireDefault(require("json-to-ast"));

var _testHelpers = require("../../test-helpers");

var _enum = _interopRequireDefault(require("../enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Enum', () => {
  describe('when value is an object', () => {
    let schema, data, jsonRaw, jsonAst;
    beforeAll(async () => {
      [schema, data] = await (0, _testHelpers.getSchemaAndData)('enum', __dirname);
      jsonRaw = JSON.stringify(data, null, 2);
      jsonAst = (0, _jsonToAst.default)(jsonRaw, {
        loc: true
      });
    });
    it('prints correctly for enum prop', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '/id',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['foo', 'bar']
        },
        message: `should be equal to one of the allowed values`
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print()).toMatchSnapshot();
    });
    it('prints correctly for no levenshtein match', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '/id',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['one', 'two']
        },
        message: `should be equal to one of the allowed values`
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print()).toMatchSnapshot();
    });
    it('prints correctly for empty value', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '/id',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['foo', 'bar']
        },
        message: `should be equal to one of the allowed values`
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print(schema, {
        id: ''
      })).toMatchSnapshot();
    });
  });
  describe('when value is a primitive', () => {
    let schema, data, jsonRaw, jsonAst;
    beforeAll(async () => {
      [schema, data] = await (0, _testHelpers.getSchemaAndData)('enum-string', __dirname);
      jsonRaw = JSON.stringify(data, null, 2);
      jsonAst = (0, _jsonToAst.default)(jsonRaw, {
        loc: true
      });
    });
    it('prints correctly for enum prop', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['foo', 'bar']
        },
        message: 'should be equal to one of the allowed values'
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print()).toMatchSnapshot();
    });
    it('prints correctly for no levenshtein match', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['one', 'two']
        },
        message: 'should be equal to one of the allowed values'
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print()).toMatchSnapshot();
    });
    it('prints correctly for empty value', () => {
      const error = new _enum.default({
        keyword: 'enum',
        dataPath: '',
        schemaPath: '#/enum',
        params: {
          allowedValues: ['foo', 'bar']
        },
        message: 'should be equal to one of the allowed values'
      }, {
        data,
        schema,
        jsonRaw,
        jsonAst
      });
      expect(error.print(schema, '')).toMatchSnapshot();
    });
  });
});