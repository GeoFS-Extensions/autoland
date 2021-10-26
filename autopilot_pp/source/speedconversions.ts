// NOTE: unless otherwise stated, all temperatures are in Kelvin.
// NOTE: unless otherwise stated, all units are in MKS.

// Mohr, P. J., Taylor, B. N. & Newell, D. B. (2012). CODATA recommended values of the
// fundamental physical constants: 2010.
// https://physics.nist.gov/cuu/Constants/codata.pdf
const molar = 8.3144621;

// Unused variables:
/*
const avogardo = 6.02214129e23;
const boltzmann = 1.3806487924497035e-23;
*/

/**
 * Accleration due to gravity at sea level.
 * Meters per second per second.
 * Extrapolated from the law of universal gravitation.
 */
const gravity = (function () {
  // see https://en.wikipedia.org/wiki/Gravity_of_Earth#Estimating_g_from_the_law_of_universal_gravitation for the formula used
  const bigG = 6.67408e-11;
  const earthMass = 5.9722e24;
  const earthRadius = 6371000;

  return bigG * (earthMass / earthRadius ** 2);
})();

// Gatley, D. P., Herrmann, S. & Kretzschmar, H.-J. (2008). A Twenty-First Century Molar Mass
// for Dry Air.
// kilograms per mole
// var airMass = 28.965369-3;

// ICAO Standard Atmosphere (assumption based on 1.225kg/m3 @ SL)
const airMass = 28.96491498930052e-3;

/**
 * assumes diatomic molecules (adiabatic index)
 * relatively accurate, ranges from 1.3991 to 1.403 in real life
 */
const gamma = 1.4;

// 1852 / 3600
const knotsToMs = 463 / 900;
const msToKnots = 900 / 463;

/** Specific gas constant of air -- equal to molar divided by air mass per mole */
const airGasConstant = molar / airMass;

/**
 * @param {number} temperature
 * @returns {number} Speed of sound in metres per second.
 */
function speedOfSound(temperature: number): number {
  return Math.sqrt(gamma * airGasConstant * temperature);
}

// sea level defaults
const densitySL = 1.225;
const pressureSL = 101325;
const temperatureSL = 288.15;
const machSL = speedOfSound(temperatureSL);

/**
 * @param {number} pressure Pressure in pascals.
 * @param {number} temperature Temperature in kelvin.
 */
function airDensity(pressure: number, temperature: number) {
  return pressure / temperature / airGasConstant;
}

function tasToMach(ktas: number, temperature: number): number {
  return (ktas * knotsToMs) / speedOfSound(temperature);
}

function casToMach(
  kcas: number,
  pressure: number,
  temperature?: number
): number {
  if (arguments.length === 2) {
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    temperature = condition[1];
  }

  return tasToMach(casToTas(kcas, pressure, temperature), temperature);
}

function machToCas(
  mach: number,
  pressure: number,
  temperature?: number
): number {
  // check if second argument is altitude (instead of pressure)
  if (arguments.length === 2) {
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    temperature = condition[1];
  }

  return tasToCas(
    mach * msToKnots * speedOfSound(temperature),
    pressure,
    temperature
  );
}

function tasToEas(ktas: number, density: number): number {
  return ktas * Math.sqrt(density / densitySL);
}

function easToTas(keas: number, density: number): number {
  return keas * Math.sqrt(densitySL / density);
}

// TAS = EAS * mach / (machSL * Math.sqrt(pressure / pressureSL));

/** @param {number} altitude - In metres. */
// National Aeronautics and Space Administration. (1976). U.S. Standard Atmosphere.
// TEST: PASS
function standardConditions(altitude: number): number[] {
  const exp = Math.exp;
  const min = Math.min;
  const pow = Math.pow;

  // This uses geopotential height -- not sure whether we should be using geometric or
  // geopotential height.
  const layers = [
    [288.15, 0, -0.0065],
    [216.65, 11000, 0],
    [216.65, 20000, 0.001],
    [228.65, 32000, 0.0028],
    [270.65, 47000, 0],
    [270.65, 51000, -0.0028],
    [214.65, 71000, -0.002],
    [186.946, 84852, 0],
  ];

  let pressure = 101325;
  let temperature = 288.15;

  layers.some(function (currentLayer, i) {
    const baseTemperature = currentLayer[0];
    const layerHeight = currentLayer[1];
    const nextLayerHeight = layers[min(i + 1, layers.length - 1)][1];
    const lapseRate = currentLayer[2];
    const heightDifference = min(altitude, nextLayerHeight) - layerHeight;
    temperature = baseTemperature + heightDifference * lapseRate;

    if (lapseRate === 0)
      pressure *= exp(
        (-gravity * airMass * heightDifference) / molar / baseTemperature
      );
    else
      pressure *= pow(
        baseTemperature / temperature,
        (gravity * airMass) / molar / lapseRate
      );

    if (nextLayerHeight >= altitude) return true;
  });

  return [pressure, temperature];
}

function tasToCas(
  ktas: number,
  pressure: number,
  temperature?: number
): number {
  if (arguments.length === 2) {
    // second argument is actually altitude, not pressure
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    temperature = condition[1];
  }

  // mach one at sea level
  const A0 = machSL * msToKnots;
  // sea level pressure
  const P0 = pressureSL;
  const P = pressure;
  // sea level temperature
  const T0 = temperatureSL;
  const T = temperature;

  const sqrt = Math.sqrt;
  const pow = Math.pow;

  // formula assumes gamma = 1.4
  // how does this take into account compressibility (it apparently does)?

  // impact pressure
  // sqrt(pow(x, 7)) or pow(x, 7 / 2)?
  const Qc = P * (pow((T0 * ktas * ktas) / (5 * T * A0 * A0) + 1, 7 / 2) - 1);
  // subsonic compressible flow formula
  return A0 * sqrt(5 * (pow(Qc / P0 + 1, 2 / 7) - 1));
}

function casToTas(
  kcas: number,
  pressure: number,
  temperature?: number
): number {
  // check if second argument is altitude (instead of pressure)
  if (arguments.length === 2) {
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    temperature = condition[1];
  }

  // mach one at sea level
  const A0 = machSL * msToKnots;
  // sea level pressure
  const P0 = pressureSL;
  const P = pressure;
  // sea level temperature
  const T0 = temperatureSL;
  const T = temperature;

  const sqrt = Math.sqrt;
  const pow = Math.pow;

  // formula assumes gamma = 1.4
  // how does this take into account compressibility (it apparently does)?

  // impact pressure
  const Qc = P0 * (pow((kcas * kcas) / (5 * A0 * A0) + 1, 7 / 2) - 1);
  return A0 * sqrt(((5 * T) / T0) * (pow(Qc / P + 1, 2 / 7) - 1));
}

function easToCas(
  keas: number,
  pressure: number
  //temperature?: number
): number {
  // check if second argument is altitude (instead of pressure)
  if (arguments.length === 2) {
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    // temperature = condition[1];
  }

  // mach one at sea level
  const A0 = machSL * msToKnots;
  // sea level pressure
  const P0 = pressureSL;

  const sqrt = Math.sqrt;
  const pow = Math.pow;

  // formula assumes gamma = 1.4
  // how does this take into account compressibility (it apparently does)?

  // impact pressure
  const Qc = (keas * keas * P0) / 2;
  return A0 * sqrt(5 * (pow(Qc / P0 + 1, 2 / 7) - 1));
}

function casToEas(
  kcas: number,
  pressure: number
  //temperature?: number
): number {
  // check if second argument is altitude (instead of pressure)
  if (arguments.length === 2) {
    const altitude = pressure;
    const condition = standardConditions(altitude);
    pressure = condition[0];
    // temperature = condition[1];
  }

  // mach one at sea level
  const A0 = machSL * msToKnots;
  // sea level pressure
  const P0 = pressureSL;
  const pow = Math.pow;

  // formula assumes gamma = 1.4
  // how does this take into account compressibility (it apparently does)?

  // impact pressure
  const Qc = P0 * (pow((kcas * kcas) / (5 * A0 * A0) + 1, 7 / 2) - 1);
  return Math.sqrt((2 * Qc) / P0);
}

const airspeed = {
  speedOfSound,
  tasToMach,
  airDensity,
  standardConditions,
  casToMach,
  machToCas,
  tasToCas,
  casToTas,
  tasToEas,
  easToTas,
  casToEas,
  easToCas,
};

export default airspeed;
