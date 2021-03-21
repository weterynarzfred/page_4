import { cloneElement } from 'react';

function deepClone(source) {
  if (
    !source ||
    (source.$$typeof !== undefined &&
      source.$$typeof.toString() === 'Symbol(react.element)')
  )
    return cloneElement(source);
  let result = Array.isArray(source) ? [] : {};
  for (const key in source) {
    result[key] =
      typeof source[key] === 'object' ? deepClone(source[key]) : source[key];
  }
  return result;
}

export default deepClone;
