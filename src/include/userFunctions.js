import { optionTypes } from './enum';

const userFunctions = [];

function addUserFunction(func) {
  userFunctions.push(func);
  return {
    isUserFunction: true,
    functionId: userFunctions.length - 1,
  };
}

function callUserFunction(option, state) {
  Object.assign(option, userFunctions[option.functionId](state));
}

function recalculateUserFunctions(options, state) {
  for (const slug in options) {
    if (options[slug].isUserFunction) {
      callUserFunction(options[slug], state);
    }

    if (options[slug].options !== undefined) {
      recalculateUserFunctions(options[slug].options, state);
    }

    if (options[slug].type === optionTypes.INSTANCER) {
      recalculateUserFunctions(options[slug].selected, state);
    }
  }
}

export { addUserFunction, callUserFunction, recalculateUserFunctions };
