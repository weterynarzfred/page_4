import { optionTypes } from 'Include/constants';
import deepClone from './deepClone';

function getOption(path, options) {
  if (typeof path === 'object' && !Array.isArray(path)) return path;
  let currentPath;
  if (typeof path === 'string') {
    currentPath = path.split('.');
  } else {
    currentPath = deepClone(path);
  }

  if (currentPath.length === 1) {
    if (options === undefined || options[currentPath[0]] === undefined) {
      console.error(`Option ${currentPath[0]} not found`);
      return undefined;
    }
    return options[currentPath[0]];
  } else {
    const slug = currentPath.shift();
    if (options[slug] === undefined) {
      console.error(`No option found at ${currentPath} ${slug}`);
    }
    if (options[slug].type === optionTypes.INSTANCER) {
      return getOption(currentPath, options[slug].selected);
    } else if (options[slug].type === optionTypes.SELECT) {
      return getOption(currentPath, options[slug].choices);
    } else {
      return getOption(currentPath, options[slug].options);
    }
  }
}

export default getOption;
