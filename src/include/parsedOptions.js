import deepClone from '../functions/deepClone';
import { dataTypes, optionTypes } from './enum';
import { addUserFunction } from './userFunctions';
import { addUserText } from './userTexts';

function parseOptions(options, path = []) {
  for (const slug in options) {
    // move functions for generating options to user functions array
    if (typeof options[slug] === 'function') {
      options[slug] = addUserFunction(options[slug]);
    }
    const option = options[slug];

    // default option type
    if (option.type === undefined) option.type = optionTypes.INTEGER;

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
    if ([optionTypes.INTEGER, optionTypes.SELECT].includes(option.type)) {
      if (option.min === undefined) option.min = 0;
      if (option.max === undefined) option.max = 1;
      if (option.max < option.min) option.max = option.min;
    }
    if (optionTypes.INSTANCER === option.type) {
      if (option.min === undefined) option.min = 0;
      if (option.max === undefined) option.max = Infinity;
      if (option.max < option.min) option.max = option.min;
    }
    if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;

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

    // move functions for generating properties to the user functions array
    const callables = {
      title: '',
      text: '',
      cost: {},
    };

    for (const callable in callables) {
      if (typeof option[callable] === 'function') {
        option['_' + callable] = addUserFunction(option[callable], callable);
        option[callable] = callables[callable];
      }
    }

    // store react elements in user texts object
    if (option.text !== undefined) {
      addUserText(option.path, option.text);
      option.text = dataTypes.USER_TEXT;
    }
    if (option.requirements !== undefined) {
      let index = 0;
      for (const test of option.requirements) {
        if (test.text !== undefined) {
          addUserText([...option.path, `requirement-${index}`], test.text);
          test.text = dataTypes.USER_TEXT;
        }
        index++;
      }
    }
  }

  return options;
}

export { parseOptions };
