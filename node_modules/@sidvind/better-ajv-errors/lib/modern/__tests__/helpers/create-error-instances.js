"use strict";

var _helpers = require("../../helpers");

describe('createErrorInstances', () => {
  it('should not show duplicate values under allowed values', () => {
    const errors = (0, _helpers.createErrorInstances)({
      children: {},
      errors: [{
        keyword: 'enum',
        params: {
          allowedValues: ['one', 'two', 'one']
        }
      }, {
        keyword: 'enum',
        params: {
          allowedValues: ['two', 'three', 'four']
        }
      }]
    }, {});
    expect(errors).toMatchInlineSnapshot(`
      Array [
        EnumValidationError {
          "data": undefined,
          "jsonAst": undefined,
          "jsonRaw": undefined,
          "options": Object {
            "keyword": "enum",
            "params": Object {
              "allowedValues": Array [
                "one",
                "two",
                "three",
                "four",
              ],
            },
          },
          "schema": undefined,
        },
      ]
    `);
  });
});