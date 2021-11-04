// Provides functions that are useful but either not included with GEFS or not implemented
// properly.
const SMOOTH_BUFFER = new Map();

/**
 * Performs Brown's simple exponential smoothing for a given series associated by a key.
 *
 * Note that the smoothing factor parameter should only be provided for the initial value in the
 * series -- if it is provided after the initial value for the series, it will be ignored.
 *
 * @private
 * @param {String} keyName - the key for which to associate this value
 * @param {Number} newValue - the new value in the series
 * @param {Number} [smoothingFactor=0.2] - the smoothing factor, where 1 is the same as the
 * original data.
 */
function exponentialSmoothing(
  keyName: string,
  newValue: number,
  smoothingFactor: number
): number {
  const buffer = SMOOTH_BUFFER.get(keyName);

  if (!buffer) {
    // [ S_tm1, smoothingFactor ]
    SMOOTH_BUFFER.set(keyName, [newValue, smoothingFactor || 2]);
    return newValue;
  }

  // S_t = a * X_t + (1 - a) * S_tm1
  smoothingFactor = buffer[1];
  const S_t = newValue * smoothingFactor + (1 - smoothingFactor) * buffer[0];
  buffer[0] = S_t;
  return S_t;
}

/**
 * Wrap values between -180 and 180.
 * @param {Number} a
 */
function fixAngle(a: number): number {
  const result = a % 360;
  if (result > 180) return result - 360;
  if (result <= -180) return result + 360;
  return result;
}

/**
 * Wrap values between 0 and 360.
 * @param {Number} a
 */
function fixAngle360(a: number): number {
  const result = a % 360;
  // Ensure that value is always positive.
  return result > 0 ? result : result + 360;
}

const DEGREES_TO_RADIANS = 0.017453292519943295;

/**
 * Convert degrees to radians.
 * @param {Number} x
 */
function deg2rad(x: number): number {
  return x * DEGREES_TO_RADIANS;
}

/**
 * Convert radians to degrees.
 * @param {Number} x
 */
function rad2deg(x: number): number {
  // Because of floating-point rounding, it's more accurate to divide by this than multiply by
  // the nearest representation of its inverse.
  return x / DEGREES_TO_RADIANS;
}

const METRES_PER_SECOND_TO_KNOTS = 1.9438444924406046;

/**
 * Convert knots to metres per second.
 * @param {Number} x
 */
function knots2ms(x: number): number {
  // Because of floating-point rounding, it's more accurate to divide by this than multiply by
  // the nearest representation of its inverse.
  return x / METRES_PER_SECOND_TO_KNOTS;
}

/**
 * Convert metres per second to knots.
 * @param {Number} x
 */
function ms2knots(x: number): number {
  return x * METRES_PER_SECOND_TO_KNOTS;
}

const FEET_TO_METRES = 0.3048;

/**
 * Convert feet to metres.
 * @param {Number} x
 */
function ft2mtrs(x: number): number {
  return x * FEET_TO_METRES;
}

/**
 * Convert metres to feet.
 * @param {Number} x
 */
function mtrs2ft(x: number): number {
  // Because of floating-point rounding, it's more accurate to divide by this than multiply by
  // the nearest representation of its inverse.
  return x / FEET_TO_METRES;
}

/** @private */
function isPlusZero(arg: number): boolean {
  return arg === 0 && 1 / arg === Infinity;
}

/** @private */
function isMinusZero(arg: number): boolean {
  return arg === 0 && 1 / arg === -Infinity;
}

/**
 * Allows limiting the range of arguments to a minimum and a maximum. If it is below the minimum
 * or above the maximum, `clamp` will return the minimum or the maximum respectively.
 *
 * @param {Number} x
 * @param {Number} min
 * @param {Number} max
 */
// REVIEW: decide about what happens if max < min (swap the two)?
function clamp(x: number, min: number, max: number): number {
  x = +x;
  min = +min;
  max = +max;

  // If we don't check that all the arguments are not NaN, this could lead to unpredictable
  // behaviour.  For example, if min is checked before max and max is NaN, it would return min
  // instead of NaN.
  if (min !== min || max !== max) return NaN;

  // Clamp the values to the minimum and maximum given.
  if (x < min) return min;
  if (x > max) return max;

  // Check for edge cases related to signed zeros.
  if (x === 0) {
    // Make sure a number cannot be -0 if the minimum value is +0.
    if (isPlusZero(min)) return 0;
    // Make sure a number cannot be +0 if the maximum value is -0.
    if (isMinusZero(max)) return -0;
  }

  // x is NaN or between min and max. In either case, we do not need to modify the value.
  return x;
}

const util = {
  exponentialSmoothing,
  fixAngle,
  fixAngle360,
  deg2rad,
  rad2deg,
  knots2ms,
  ms2knots,
  ft2mtrs,
  mtrs2ft,
  clamp,
};

export default util;
