import { cloneElement } from 'react';

/**
 * Deep clones a variable. Supports react elements.
 */
function deepClone(source, repair = false) {
  if (!source || ['string', 'boolean', 'number'].includes(typeof source))
    return source;
  if (
    source.$$typeof !== undefined &&
    source.$$typeof.toString() === 'Symbol(react.element)'
  ) {
    return cloneElement(source);
  }
  let result = Array.isArray(source) ? [] : {};
  for (const key in source) {
    result[key] =
      typeof source[key] === 'object'
        ? deepClone(source[key], repair)
        : source[key];
  }
  return result;
}

/**
 * Checks for strict deep equality. Assumes both arguments can be serialized.
 */
function deepEquals(a, b) {
  if (a === b) return true;
  if (
    a === null ||
    b === null ||
    typeof a !== typeof b ||
    typeof a !== 'object'
  )
    return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (!deepEquals(a[i], b[i])) return false;
    }
  } else {
    if (Array.isArray(b)) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (let i = 0; i < aKeys.length; ++i) {
      if (!deepEquals(a[aKeys[i]], b[aKeys[i]])) return false;
    }
  }
  return true;
}

export { deepClone, deepEquals };
