"use strict";

var _fs = require("fs");

var _jsonToAst = _interopRequireDefault(require("json-to-ast"));

var _jestFixtures = require("jest-fixtures");

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loadScenario(n) {
  const fixturePath = await (0, _jestFixtures.getFixturePath)(__dirname, `scenario-${n}.json`);
  return (0, _fs.readFileSync)(fixturePath, 'utf8');
}

describe('JSON', () => {
  it('can work on simple JSON', async () => {
    const rawJson = await loadScenario(1);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/foo')).toMatchSnapshot();
    expect((0, _.getMetaFromPath)(jsonAst, '/foo', true)).toMatchSnapshot();
  });
  it('can work on JSON with a key named value', async () => {
    const rawJson = await loadScenario(2);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/value')).toMatchSnapshot();
    expect((0, _.getMetaFromPath)(jsonAst, '/value', true)).toMatchSnapshot();
  });
  it('can work on JSON with a key named meta', async () => {
    const rawJson = await loadScenario(3);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/meta/isMeta')).toMatchSnapshot();
    expect((0, _.getMetaFromPath)(jsonAst, '/meta/isMeta', true)).toMatchSnapshot();
  });
  it('can work on JSON with Array', async () => {
    const rawJson = await loadScenario(4);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/arr/1/foo')).toMatchSnapshot();
    expect((0, _.getMetaFromPath)(jsonAst, '/arr/1/foo', true)).toMatchSnapshot();
  });
  it('can work on JSON with Array with empty children', async () => {
    const rawJson = await loadScenario(4);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getDecoratedDataPath)(jsonAst, '/arr/4')).toMatchSnapshot();
  });
  it('should not throw error when children is array', async () => {
    const rawJsonWithArrayItem = JSON.stringify({
      foo: 'bar',
      arr: [1, {
        foo: 'bar'
      }, 3, ['anArray']]
    });
    const jsonAst = (0, _jsonToAst.default)(rawJsonWithArrayItem, {
      loc: true
    });
    expect((0, _.getDecoratedDataPath)(jsonAst, '/arr/3')).toMatchSnapshot();
  });
  it('can work with unescaped JSON pointers with ~1', async () => {
    const rawJson = await loadScenario(5);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/foo/~1some~1path/value')).toMatchSnapshot();
  });
  it('can work with unescaped JSON pointers with ~0', async () => {
    const rawJson = await loadScenario(5);
    const jsonAst = (0, _jsonToAst.default)(rawJson, {
      loc: true
    });
    expect((0, _.getMetaFromPath)(jsonAst, '/foo/~0some~0path/value')).toMatchSnapshot();
  });
});