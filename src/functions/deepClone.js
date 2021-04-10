import { cloneElement } from 'react';

/**
 * Deep clones a variable. Supports react elements.
 */
function deepClone(source, repair = false) {
  if (!source) return source;
  if (typeof source === 'string') return source;
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

export default deepClone;
