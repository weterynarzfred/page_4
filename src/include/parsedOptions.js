import _ from 'lodash';
import { options } from 'Src/cyoa';
import { optionTypes } from 'Include/enum';
import { addUserFunction } from 'Include/userFunctions';
import { addUserText } from 'Include/userTexts';

function parseOptions(options, path = []) {
  for (const slug in options) {
    // move functions for generating options to user functions array
    if (typeof options[slug] === 'function') {
      options[slug] = addUserFunction(options[slug]);
    }
    const option = options[slug];

    // assign slugs and paths
    const currentPath = _.clone(path);
    if (slug !== 'instanceGroup') {
      currentPath.push(slug);
    }
    option.slug = slug;
    option.path = currentPath;

    // move react elements in text to user texts array
    if (isNaN(option.text)) {
      option.text = addUserText(option.text);
    }
    if (option.choices !== undefined) {
      for (const choiceSlug in option.choices) {
        const choice = option.choices[choiceSlug];
        if (isNaN(choice.text)) {
          choice.text = addUserText(choice.text);
        }
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

    // assign default values to min and max
    if ([optionTypes.INTEGER, optionTypes.SELECT].includes(option.type)) {
      if (option.min === undefined) option.min = 0;
      if (option.max === undefined) option.max = 1;
      if (option.max < option.min) option.max = option.min;
    }

    // move requirements to user functions array
    if (option.requirements !== undefined) {
      for (const test of option.requirements) {
        test.callback = addUserFunction(test.callback);
      }
    }

    // move functions for generating titles to user functions array
    if (typeof option.title === 'function') {
      option._title = addUserFunction(option.title, 'title');
      option.title = '?';
    }
  }

  return options;
}

const parsedOptions = parseOptions(options);

export default parsedOptions;
export { parseOptions };
