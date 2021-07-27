"use strict";

var _jsonToAst = _interopRequireDefault(require("json-to-ast"));

var _testHelpers = require("../../test-helpers");

var _required = _interopRequireDefault(require("../required"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Required', () => {
  it('prints correctly for missing required prop', async () => {
    const [schema, data] = await (0, _testHelpers.getSchemaAndData)('required', __dirname);
    const jsonRaw = JSON.stringify(data, null, 2);
    const jsonAst = (0, _jsonToAst.default)(jsonRaw, {
      loc: true
    });
    const error = new _required.default({
      keyword: 'required',
      dataPath: '/nested',
      schemaPath: '#/required',
      params: {
        missingProperty: 'id'
      },
      message: `should have required property 'id'`
    }, {
      data,
      schema,
      jsonRaw,
      jsonAst
    });
    expect(error.print()).toMatchSnapshot();
  });
});