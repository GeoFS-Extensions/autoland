"use strict";

var _ajv = _interopRequireDefault(require("ajv"));

var _ = _interopRequireDefault(require("../../"));

var _testHelpers = require("../../test-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Main', () => {
  it('should support js output format for default errors', async () => {
    const [schema, data] = await (0, _testHelpers.getSchemaAndData)('default', __dirname);
    const ajv = new _ajv.default({
      jsonPointers: true
    });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();
    const res = (0, _.default)(schema, data, validate.errors, {
      format: 'js'
    });
    expect(res).toMatchSnapshot();
  });
  it('should support js output format for required errors', async () => {
    const [schema, data] = await (0, _testHelpers.getSchemaAndData)('required', __dirname);
    const ajv = new _ajv.default({
      jsonPointers: true
    });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();
    const res = (0, _.default)(schema, data, validate.errors, {
      format: 'js'
    });
    expect(res).toMatchSnapshot();
  });
  it('should support js output format for additionalProperties errors', async () => {
    const [schema, data] = await (0, _testHelpers.getSchemaAndData)('additionalProperties', __dirname);
    const ajv = new _ajv.default({
      jsonPointers: true
    });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();
    const res = (0, _.default)(schema, data, validate.errors, {
      format: 'js'
    });
    expect(res).toMatchSnapshot();
  });
  it('should support js output format for enum errors', async () => {
    const [schema, data] = await (0, _testHelpers.getSchemaAndData)('enum', __dirname);
    const ajv = new _ajv.default({
      jsonPointers: true
    });
    const validate = ajv.compile(schema);
    const valid = validate(data);
    expect(valid).toBeFalsy();
    const res = (0, _.default)(schema, data, validate.errors, {
      format: 'js'
    });
    expect(res).toMatchSnapshot();
  });
});