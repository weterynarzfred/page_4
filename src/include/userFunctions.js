import { optionTypes } from './enum';
import { parseOptions } from './parsedOptions';

const userFunctions = [];

function addUserFunction(func) {
  userFunctions.push(func);
  return {
    isUserFunction: true,
    functionId: userFunctions.length - 1,
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

function callUserFunction(target, state, userFunction = target) {
  const value = userFunctions[userFunction.functionId](state);
  if (typeof value === 'object') {
    Object.assign(target, value);
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

    if (options[slug].requirements !== undefined) {
      for (const test of options[slug].requirements) {
        callUserFunction(test, state, test.callback);
      }
    }
  }
}

export { addUserFunction, callUserFunction, recalculateUserFunctions };
