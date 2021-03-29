import React, { cloneElement, createElement } from 'react';

function deepClone(source, repair = false) {
  if (!source) return source;
  if (
    source.$$typeof !== undefined &&
    source.$$typeof.toString() === 'Symbol(react.element)'
  ) {
    return cloneElement(source);
  }
  // if (repair && typeof source === 'object') {
  //   if (
  //     source.key !== undefined &&
  //     source.ref !== undefined &&
  //     source.props !== undefined &&
  //     source._owner !== undefined &&
  //     source._store !== undefined
  //   ) {
  //     let type = source.type || React.Fragment;
  //     if (typeof type === 'object') type = React.Fragment;
  //     let children = deepClone(source.props, true).children;
  //     if (children !== undefined && Array.isArray(children)) {
  //       children = [...children];
  //     }
  //     const dummy = createElement(type, '', children);
  //     return dummy;
  //   }
  // }
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
