import { dataTypes, optionTypes } from './enum';
import { parseOptions } from './parsedOptions';
import { addUserText } from './userTexts';

const userFunctions = [];

function addUserFunction(func, target) {
  userFunctions.push(func);
  return {
    isUserFunction: true,
    functionId: userFunctions.length - 1,
    target,
  };
}

function callOptionFunction(option, state) {
  const parentPath = option.path.slice(0, -1);
  const value = parseOptions(
    {
      [option.slug]: userFunctions[option.functionId](state, option),
    },
    parentPath
  )[option.slug];
  Object.assign(option, value);
}

function callUserFunction(
  target,
  state,
  userFunction = option,
  option = target
) {
  const value = userFunctions[userFunction.functionId](state, option);

  if (userFunction.target !== undefined) {
    target[userFunction.target] = value;
  } else {
    target.value = value;
  }
}

function recalculateUserFunctions(options, state) {
  for (const slug in options) {
    if (options[slug].isUserFunction) {
      callOptionFunction(options[slug], state);
    }

    if (options[slug].options !== undefined) {
      recalculateUserFunctions(options[slug].options, state);
    }

    if (options[slug].type === optionTypes.INSTANCER) {
      recalculateUserFunctions(options[slug].selected, state);
    }

    if (options[slug].type === optionTypes.SELECT) {
      recalculateUserFunctions(options[slug].choices, state);
    }

    if (options[slug].valueTransform !== undefined) {
      callUserFunction(options[slug], state, options[slug].valueTransform);
    }

    const callables = ['_title', '_text', '_cost'];

    for (const callable of callables) {
      if (options[slug][callable] !== undefined) {
        callUserFunction(options[slug], state, options[slug][callable]);
      }
    }

    if (options[slug].requirements !== undefined) {
      let index = 0;
      for (const test of options[slug].requirements) {
        callUserFunction(test, state, test.callback, options[slug]);
        if (test._text !== undefined) {
          callUserFunction(test, state, test._text, options[slug]);
          addUserText(
            [...options[slug].path, `requirement-${index}`],
            test.text
          );
          test.text = dataTypes.USER_TEXT;
        }
        index++;
      }
    }
  }
}

export {
  addUserFunction,
  callUserFunction,
  callOptionFunction,
  recalculateUserFunctions,
};
