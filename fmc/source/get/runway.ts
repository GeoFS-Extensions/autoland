import { data } from '../data';
import { SID } from './SID';

/**
 * Get all runway info for airport
 *
 * @param {String} airport Departure or Arrival airport
 * @param {String} selected Selected SID or STAR name
 * @param {Boolean} isDeparture Is the aircraft in departure
 * @returns {Array} The array of runway list
 */
 export const runway = (airport: string, selected?: string, isDeparture?: boolean): any[] => {
    // If there is no departure or arrival airport
    if (!airport) return [];
  
    const runways = data.runways[airport];
    const runwayArray = [];
  
    // If plane is in departure
    if (isDeparture) {
      // If there is already a selected SID, extracts a list of available runways
      if (selected) {
        SID(airport, undefined, selected)[0].availableRunways.forEach(
          function (rwy) {
            runwayArray.push({
              runway: rwy,
            });
          }
        );
      }
  
      // If there is no selected SID
      else {
        for (const rwy in runways) {
          runwayArray.push({
            runway: rwy,
          });
        }
      }
    }
  
    // If plane is in arrival
    else {
      // TODO
    }
  
    // Returns the list of runway
    return runwayArray;
};
  