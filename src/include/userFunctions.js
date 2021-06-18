import removeOption from '../functions/removeOption';
import parseOptions from './parseOptions';
import { addUserValue } from './userValues';

window.userFunctions = {};

/**
 * After an user function generates new options this function removes options
 * that no longer exists, adds new ones and updates changed ones.
 */
function mergeChoices(state, option, result, newChanges, prop) {
  const fullPath = [...option.path, option.slug];

  const parsedSuboptions = parseOptions(result, fullPath, {
    isChoice: prop === 'choices',
  });

  if (option[prop] !== undefined) {
    // delete options that no longer exist
    for (const suboptionKey of option[prop]) {
      if (parsedSuboptions[suboptionKey] === undefined) {
        removeOption(suboptionKey, state, newChanges);
      }
    }

    for (const suboptionKey in parsedSuboptions) {
      if (state.options[suboptionKey] === undefined) {
        // create new options
        state.options[suboptionKey] = parsedSuboptions[suboptionKey];
      } else {
        // update existing options
        delete parsedSuboptions[suboptionKey].selected;
        Object.assign(
          state.options[suboptionKey],
          parsedSuboptions[suboptionKey]
        );
      }
    }
  } else {
    Object.assign(state.options, parsedSuboptions);
  }

  option[prop] = Object.keys(result).map(slug =>
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

      if (['text', 'title', 'displayTitle'].includes(userFunction.prop)) {
        addUserValue(result, userFunction.optionKey, userFunction.prop);
      } else if (['choices', 'options'].includes(userFunction.prop)) {
        mergeChoices(state, option, result, newChanges, userFunction.prop);
      } else if (userFunction.prop === 'cost') {
        option.cost = result;
      } else if (userFunction.prop.match(/requirements\.[0-9]+$/)) {
        const index = userFunction.prop.split('.').pop();
        option.requirements[index].value = result;
      } else if (userFunction.prop.match(/requirements\.[0-9]+\.text$/)) {
        addUserValue(result, userFunction.optionKey, userFunction.prop);
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
