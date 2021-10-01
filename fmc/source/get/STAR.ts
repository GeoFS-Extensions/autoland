"use strict";

define(["data"], function (data) {
  /**
   * Get all STAR info for airport and arrival runway
   *
   * @param {String} airport
   * @returns {Array} The array of STAR
   */
  return function (airport: string, runway): Array<any> {
    if (!airport || !runway) return [];
    // FIXME: there still can be a STAR even if there is no arrival runway

    var allSTAR = data.STAR[airport];
    var validSTAR = [];

    if (Array.isArray(allSTAR))
      allSTAR.forEach(function (obj) {
        if (obj.runway === runway) validSTAR.push(obj);
      });

    return validSTAR;
  };
});
