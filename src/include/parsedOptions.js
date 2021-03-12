import _ from 'lodash';
import { options } from './../cyoa';
import { addUserFunction } from './userFunctions';

function parseOptions(options, path = []) {
  for (const slug in options) {
    if (typeof options[slug] === 'function') {
      options[slug] = addUserFunction(options[slug]);
    }
    const currentPath = _.clone(path);
    currentPath.push(slug);
    options[slug].slug = slug;
    options[slug].path = currentPath;

    if (options[slug].options !== undefined) {
      parseOptions(options[slug].options, currentPath);
    }

    if (options[slug].instanceOptions !== undefined) {
      parseOptions(options[slug].instanceOptions, currentPath);
    }
  }

  return options;
}

const parsedOptions = parseOptions(options);

export default parsedOptions;
export { parseOptions };
