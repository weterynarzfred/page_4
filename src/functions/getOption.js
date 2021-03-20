import _ from 'lodash';
import { optionTypes } from 'Include/enum';

function getOption(path, options) {
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
    if (options[slug].type === optionTypes.INSTANCER) {
      return getOption(currentPath, options[slug].selected);
    } else {
      return getOption(currentPath, options[slug].options);
    }
  }
}

export default getOption;
