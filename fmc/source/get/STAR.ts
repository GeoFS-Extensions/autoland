import { data } from "../data";
/**
 * Get all STAR info for airport and arrival runway
 *
 * @param {String} airport
 * @returns {Array} The array of STAR
 */

export const STAR = (airport: string, runway): any[] => {
  if (!airport || !runway) return [];
  // FIXME: there still can be a STAR even if there is no arrival runway

  const allSTAR = data.STAR[airport];
  const validSTAR = [];

  if (Array.isArray(allSTAR))
    allSTAR.forEach(function (obj) {
      if (obj.runway === runway) validSTAR.push(obj);
    });

  return validSTAR;
};
