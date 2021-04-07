import deepClone from '../functions/deepClone';
import { callables, dataTypes, optionTypes } from './constants';
import { addUserFunction } from './userFunctions';
import { addUserText } from './userTexts';

// function parseOptions(options, path = []) {
//   for (const slug in options) {
//     // move functions for generating options to user functions array
//     if (typeof options[slug] === 'function') {
//       options[slug] = addUserFunction(options[slug]);
//     }
//     const option = options[slug];

//     // default option type
//     if (option.type === undefined) option.type = optionTypes.INTEGER;

//     // assign slugs and paths
//     const currentPath = deepClone(path);
//     if (slug !== 'instanceGroup') {
//       currentPath.push(slug);
//     }
//     option.slug = slug;
//     option.path = currentPath;

//     // mark choices with properties
//     if (option.choices !== undefined) {
//       for (const choiceSlug in option.choices) {
//         const choice = option.choices[choiceSlug];
//         choice.type = optionTypes.INTEGER;
//         choice.isChoice = true;
//       }
//     }

//     // parse suboptions of the option
//     if (option.options !== undefined) {
//       parseOptions(option.options, currentPath);
//     }

//     // parse the instance options of the instancer
//     if (option.instanceGroup !== undefined) {
//       parseOptions({ instanceGroup: option.instanceGroup }, currentPath);
//     }

//     // parse the choices of the select
//     if (option.choices !== undefined) {
//       parseOptions(option.choices, currentPath);
//     }

//     // assign default values to min and max
//     if (
//       [optionTypes.INTEGER, optionTypes.SELECT, optionTypes.SLIDER].includes(
//         option.type
//       )
//     ) {
//       if (option.min === undefined) option.min = 0;
//       if (option.max === undefined) option.max = 1;
//       if (option.max < option.min) option.max = option.min;
//     }
//     if (optionTypes.INSTANCER === option.type) {
//       if (option.min === undefined) option.min = 0;
//       if (option.max === undefined) option.max = Infinity;
//       if (option.max < option.min) option.max = option.min;
//     }
//     if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;

//     // assign initial selected values
//     if (option.selected === undefined) {
//       if ([optionTypes.INTEGER, optionTypes.SLIDER].includes(option.type)) {
//         option.selected = 0;
//       }
//       if (option.type === optionTypes.TEXT) {
//         option.selected = '';
//       }
//       if (option.type === optionTypes.SELECT) {
//         option.selected = [];
//       }
//       if (option.type === optionTypes.INSTANCER) {
//         option.selected = { nextId: 0 };
//       }
//     }

//     // move requirements to the user functions array
//     if (option.requirements !== undefined) {
//       for (const test of option.requirements) {
//         test.callback = addUserFunction(test.callback);
//         if (typeof test.text === 'function') {
//           test._text = addUserFunction(test.text, 'text');
//           test.text = '';
//         }
//       }
//     }

//     // move valueTranforms to the user functions array
//     if (option.valueTransform !== undefined) {
//       option.valueTransform = addUserFunction(
//         option.valueTransform,
//         'transformedValue'
//       );
//     }
//     if (option.displayTransform !== undefined) {
//       option.displayTransform = addUserFunction(
//         option.displayTransform,
//         'transformedDisplay'
//       );
//     }

//     // move functions for generating properties to the user functions array
//     for (const callable in callables) {
//       if (typeof option[callable] === 'function') {
//         option['_' + callable] = addUserFunction(option[callable], callable);
//         option[callable] = callables[callable];
//       }
//     }

//     // store react elements in user texts object
//     if (option.text !== undefined) {
//       addUserText(option.path, option.text);
//       option.text = dataTypes.USER_TEXT;
//     }
//     if (option.title !== undefined) {
//       addUserText([...option.path, '_title'], option.title);
//       option.title = dataTypes.USER_TEXT;
//     }
//     if (option.requirements !== undefined) {
//       let index = 0;
//       for (const test of option.requirements) {
//         if (test.text !== undefined) {
//           addUserText([...option.path, `requirement-${index}`], test.text);
//           test.text = dataTypes.USER_TEXT;
//         }
//         index++;
//       }
//     }
//   }

//   return options;
// }

const defaultProps = {
  type: optionTypes.INTEGER,
  title: '',
  text: '',
  min: 0,
  max: 1,
  instanceGroup: {},
  selected: undefined,
};

function assignProps(option, rawOption, assign) {
  for (const prop in defaultProps) {
    option[prop] = rawOption[prop];
    if (option[prop] !== undefined && option[prop].isUserFunction) {
      option[prop].subscribed = option[prop].subscribed.map(key => {
        key = key.replace('CURRENT_KEY', option.optionKey);
        while (key.match(/\.\./) !== null)
          key = key.replaceAll(/\/?[^\/]+\/\.\./g, '');
        return key;
      });
      addUserFunction(option[prop], option.optionKey, prop);
      option[prop] = defaultProps[prop];
    }
  }

  Object.assign(option, assign);
}

function addUserTexts(option) {
  if (option.title !== undefined) {
    addUserText(option.title, option.optionKey, 'title');
    delete option.title;
  }

  if (option.text !== undefined) {
    addUserText(option.text, option.optionKey, 'text');
    delete option.text;
  }
}

function assignDefaults(option) {
  if (option.type === undefined) option.type = optionTypes.INTEGER;

  if (option.type === optionTypes.INTEGER) {
    if (option.min === undefined) option.min = 0;
    if (option.max === undefined) option.max = 1;
    else if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;
    if (option.selected === undefined) option.selected = 0;
  }

  if (option.type === optionTypes.INSTANCER) {
    if (option.nextId === undefined) option.nextId = 0;
    if (option.selected === undefined) option.selected = [];
  }
}

function parseOptions(rawOptions, parentPath = [], assign = {}) {
  const options = {};
  for (const slug in rawOptions) {
    const rawOption = rawOptions[slug];
    const option = {};
    option.slug = slug;
    option.path = [...parentPath];
    const fullPath = [...option.path, option.slug];
    option.optionKey = fullPath.join('/');

    assignProps(option, rawOption, assign);

    if (rawOption.options !== undefined) {
      option.subOptions = Object.keys(rawOption.options).map(slug =>
        [...fullPath, slug].join('/')
      );
      Object.assign(options, parseOptions(rawOption.options, fullPath));
    }

    if (rawOption.choices !== undefined) {
      Object.assign(
        options,
        parseOptions(rawOption.choices, fullPath, { isChoice: true })
      );
      option.choices = Object.keys(rawOption.choices).map(slug =>
        [...fullPath, slug].join('/')
      );
    }

    addUserTexts(option);
    assignDefaults(option);
    options[option.optionKey] = option;
  }
  return options;
}

export default parseOptions;
