import deepClone from '../functions/deepClone';
import { isSelected } from '../functions/getSelectedValue';
import { callables, dataTypes, optionTypes } from './constants';
import parseOptions from './parseOptions';
import { addUserText } from './userTexts';

// const userFunctions = [];

// function addUserFunction(func, target) {
//   userFunctions.push(func);
//   return {
//     isUserFunction: true,
//     functionId: userFunctions.length - 1,
//     target,
//   };
// }

// function callOptionFunction(option, state) {
//   const parentPath = option.path.slice(0, -1);
//   const value = parseOptions(
//     {
//       [option.slug]: userFunctions[option.functionId](state, option),
//     },
//     parentPath
//   )[option.slug];
//   Object.assign(option, value);
// }

// function callUserFunction(
//   target,
//   state,
//   userFunction = option,
//   option = target
// ) {
//   const value = userFunctions[userFunction.functionId](state, option);

//   if (userFunction.target !== undefined) {
//     target[userFunction.target] = value;
//   } else {
//     target.value = value;
//   }
// }

// function recalculateUserFunctions(options, state) {
//   for (const slug in options) {
//     if (options[slug].isUserFunction) {
//       callOptionFunction(options[slug], state);
//     }

//     if (options[slug].options !== undefined) {
//       recalculateUserFunctions(options[slug].options, state);
//     }

//     if (options[slug].type === optionTypes.INSTANCER) {
//       recalculateUserFunctions(options[slug].selected, state);
//     }

//     if (options[slug].type === optionTypes.SELECT) {
//       recalculateUserFunctions(options[slug].choices, state);
//     }

//     if (options[slug].valueTransform !== undefined) {
//       callUserFunction(options[slug], state, options[slug].valueTransform);
//     }
//     if (options[slug].displayTransform !== undefined) {
//       callUserFunction(options[slug], state, options[slug].displayTransform);
//     }

//     for (const callable in callables) {
//       if (options[slug][`_${callable}`] !== undefined) {
//         callUserFunction(options[slug], state, options[slug][`_${callable}`]);
//       }
//     }

//     if (options[slug].requirements !== undefined) {
//       let index = 0;
//       for (const test of options[slug].requirements) {
//         callUserFunction(test, state, test.callback, options[slug]);
//         if (test._text !== undefined) {
//           callUserFunction(test, state, test._text, options[slug]);
//           addUserText(
//             [...options[slug].path, `requirement-${index}`],
//             test.text
//           );
//           test.text = dataTypes.USER_TEXT;
//         }
//         index++;
//       }
//     }
//   }
// }

window.userFunctions = {};

function mergeChoices(state, option, result, newChanges) {
  const fullPath = [...option.path, option.slug];

  const parsedChoices = parseOptions(result, fullPath, { isChoice: true });
  if (option.choices !== undefined) {
    // delete choices that no longer exist
    for (const choiceKey of option.choices) {
      if (parsedChoices[choiceKey] === undefined) {
        if (isSelected(state.options[choiceKey], state.options)) {
          newChanges.push(choiceKey + '.selected');
          newChanges.push(option.optionKey + '.selected');
        }
        delete state.options[choiceKey];
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
        addUserText(result, userFunction.optionKey, userFunction.prop);
      } else if (userFunction.prop === 'choices') {
        mergeChoices(state, option, result, newChanges);
      } else {
        option[userFunction.prop] = result;
      }
      newChanges.push(userFunction.optionKey + '.' + userFunction.prop);
    }
  }

  if (newChanges.length > 0) recalculateUserFunctions(state, newChanges);
}

function addUserFunction(functionObject, optionKey, prop) {
  const key = optionKey + '_' + prop;
  userFunctions[key] = functionObject;
  userFunctions[key].optionKey = optionKey;
  userFunctions[key].prop = prop;
}

function clearUserFunctions(deletionKey) {
  Object.keys(userFunctions).filter(optionKey => {
    if (optionKey.startsWith(deletionKey)) {
      delete userFunctions[optionKey];
    }
  });
}

export {
  addUserFunction,
  // callUserFunction,
  // callOptionFunction,
  recalculateUserFunctions,
  clearUserFunctions,
};
