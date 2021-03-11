import _ from 'lodash';
import { options } from './../cyoa';

function parseOptions(options, path = []) {
  for (const slug in options) {
    const option = options[slug];
    const currentPath = _.clone(path);
    currentPath.push(slug);
    option.slug = slug;
    option.path = currentPath;

    if (option.options !== undefined) {
      parseOptions(option.options, currentPath);
    }
  }

  return options;
}

const parsedOptions = parseOptions(options);

export default parsedOptions;
export { parseOptions };
