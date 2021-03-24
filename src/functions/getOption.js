import _ from 'lodash';
import { optionTypes } from 'Include/enum';

function getOption(path, options) {
  if (typeof path === 'object' && !_.isArray(path)) return path;
  let currentPath;
  if (typeof path === 'string') {
    currentPath = path.split('.');
  } else {
    currentPath = _.clone(path);
  }

  if (currentPath.length === 1) {
    return options[currentPath[0]];
  } else {
    const slug = currentPath.shift();
    if (options[slug] === undefined) {
      console.error(`No option ${slug} found at ${currentPath}`);
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
