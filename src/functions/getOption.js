import _ from 'lodash';
import { optionTypes } from '../include/enum';
import { pipe } from '../include/pipe';

function getOption(path, options = pipe.options) {
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
