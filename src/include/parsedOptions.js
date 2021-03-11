import _ from 'lodash';
import { options } from './../cyoa';

function parseOptions(options, path = []) {
  for (const slug in options) {
    if (typeof options[slug] === 'function') {
      options[slug] = {
        function: options[slug],
      };
    }
    const currentPath = _.clone(path);
    currentPath.push(slug);
    options[slug].slug = slug;
    options[slug].path = currentPath;

    if (options[slug].options !== undefined) {
      parseOptions(options[slug].options, currentPath);
    }
  }

  return options;
}

const parsedOptions = parseOptions(options);

export default parsedOptions;
export { parseOptions };
