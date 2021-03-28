import deepClone from '../functions/deepClone';
import { optionTypes } from './enum';
import { addUserFunction } from './userFunctions';

function parseOptions(options, path = []) {
  for (const slug in options) {
    // move functions for generating options to user functions array
    if (typeof options[slug] === 'function') {
      options[slug] = addUserFunction(options[slug]);
    }
    const option = options[slug];

    // assign slugs and paths
    const currentPath = deepClone(path);
    if (slug !== 'instanceGroup') {
      currentPath.push(slug);
    }
    option.slug = slug;
    option.path = currentPath;

    // mark choices with properties
    if (option.choices !== undefined) {
      for (const choiceSlug in option.choices) {
        const choice = option.choices[choiceSlug];
        choice.type = optionTypes.INTEGER;
        choice.isChoice = true;
      }
    }

    // parse suboptions of the option
    if (option.options !== undefined) {
      parseOptions(option.options, currentPath);
    }

    // parse the instance options of the instancer
    if (option.instanceGroup !== undefined) {
      parseOptions({ instanceGroup: option.instanceGroup }, currentPath);
    }

    // parse the choices of the select
    if (option.choices !== undefined) {
      parseOptions(option.choices, currentPath);
    }

    // assign default values to min and max
    if (
      [optionTypes.INTEGER, optionTypes.SELECT, optionTypes.INSTANCER].includes(
        option.type
      )
    ) {
      if (option.min === undefined) option.min = 0;
      if (option.max === undefined) option.max = 1;
      if (option.max < option.min) option.max = option.min;
    }

    // move requirements to user functions array
    if (option.requirements !== undefined) {
      for (const test of option.requirements) {
        test.callback = addUserFunction(test.callback);
        if (typeof test.text === 'function') {
          test._text = addUserFunction(test.text, 'text');
          test.text = '';
        }
      }
    }

    // move functions for generating titles to user functions array
    if (typeof option.title === 'function') {
      option._title = addUserFunction(option.title, 'title');
      option.title = '';
    }

    //
    if (typeof option.text === 'function') {
      option._text = addUserFunction(option.text, 'text');
      option.text = '';
    }
  }

  return options;
}

export { parseOptions };
