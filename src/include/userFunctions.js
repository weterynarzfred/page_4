import removeOption from '../functions/removeOption';
import parseOptions from './parseOptions';
import { addUserValue } from './userValues';
import { deepClone } from '../functions/deepFunctions';

window.userFunctions = {};

/**
 * After an user function generates new options this function removes choces that
 * no longer exists, add new ones and updates changed ones.
 */
function mergeChoices(state, option, result, newChanges) {
  const fullPath = [...option.path, option.slug];

  const parsedChoices = parseOptions(result, fullPath, {
    isChoice: true,
  });
  if (option.choices !== undefined) {
    // delete choices that no longer exist
    for (const choiceKey of option.choices) {
      if (parsedChoices[choiceKey] === undefined) {
        removeOption(choiceKey, state, newChanges);
      }
    }

    for (const choiceKey in parsedChoices) {
      if (state.options[choiceKey] === undefined) {
        // create new choices
        state.options[choiceKey] = parsedChoices[choiceKey];
      } else {
        // update existing choices
        Object.assign(
          state.options[choiceKey],
          result[choiceKey.split('/').pop()]
        );
      }
    }
  } else {
    Object.assign(state.options, parsedChoices);
  }

  option.choices = Object.keys(result).map(slug =>
    [...fullPath, slug].join('/')
  );
}

/**
 * After the state draft was updated this function recalculates user functions
 * that were subscribed to any of the changes.
 */
function recalculateUserFunctions(state, changes, force = false) {
  const newChanges = [];
  for (const key in userFunctions) {
    const userFunction = userFunctions[key];
    const recalculate =
      force || userFunction.subscribed.some(item => changes.includes(item));
    if (recalculate) {
      const option = state.options[userFunction.optionKey];
      const result = userFunction.callback(state, option);

      if (['text', 'title'].includes(userFunction.prop)) {
        addUserValue(result, userFunction.optionKey, userFunction.prop);
      } else if (userFunction.prop === 'choices') {
        mergeChoices(state, option, result, newChanges);
      } else if (userFunction.prop === 'cost') {
        option.cost = result;
      } else if (userFunction.prop.match(/requirements\.[0-9+]/)) {
        const index = userFunction.prop.split('.').pop();
        option.requirements[index] = result;
      } else {
        option[userFunction.prop] = result;
      }

      newChanges.push(userFunction.optionKey + '.' + userFunction.prop);
    }
  }

  if (newChanges.length > 0) recalculateUserFunctions(state, newChanges);
  changes.push(...newChanges);
}

/**
 * Adds or updates an object created with userFunction in cyoa.jsx to the
 * userFunctions array.
 */
function addUserFunction(functionObject, optionKey, prop) {
  const key = optionKey + '.' + prop;
  userFunctions[key] = functionObject;
  userFunctions[key].optionKey = optionKey;
  userFunctions[key].prop = prop;
}

/**
 * Removes any user functions created on the key that was deleted or on any of
 * its suboptions.
 */
function clearUserFunctions(deletionKey) {
  Object.keys(userFunctions).filter(optionKey => {
    if (
      optionKey.startsWith(deletionKey + '.') ||
      optionKey.startsWith(deletionKey + '/')
    ) {
      delete userFunctions[optionKey];
    }
  });
}

export { addUserFunction, recalculateUserFunctions, clearUserFunctions };
