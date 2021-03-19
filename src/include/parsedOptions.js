import _ from 'lodash';
import { options } from './../cyoa';
import { optionTypes } from './enum';
import { addUserFunction } from './userFunctions';

function parseOptions(options, path = []) {
  for (const slug in options) {
    if (typeof options[slug] === 'function') {
      options[slug] = addUserFunction(options[slug]);
    }
    const currentPath = _.clone(path);
    if (slug !== 'instanceGroup') {
      currentPath.push(slug);
    }
    options[slug].slug = slug;
    options[slug].path = currentPath;

    if (options[slug].options !== undefined) {
      parseOptions(options[slug].options, currentPath);
    }

    if (options[slug].instanceGroup !== undefined) {
      parseOptions({ instanceGroup: options[slug].instanceGroup }, currentPath);
    }

    if (options[slug].type === optionTypes.INTEGER) {
      if (options[slug].min === undefined) options[slug].min = 0;
      if (options[slug].max === undefined) options[slug].max = 1;
      if (options[slug].max < options[slug].min)
        options[slug].max = options[slug].min;
    }

    if (options[slug].requirements !== undefined) {
      for (const test of options[slug].requirements) {
        test.callback = addUserFunction(test.callback);
      }
    }

    if (typeof options[slug].title === 'function') {
      options[slug]._title = addUserFunction(options[slug].title, 'title');
      options[slug].title = '?';
    }
  }

  return options;
}

const parsedOptions = parseOptions(options);

export default parsedOptions;
export { parseOptions };
