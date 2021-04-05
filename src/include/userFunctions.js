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

function recalculateUserFunctions(state, changes, force = false) {
  for (const key in userFunctions) {
    const userFunction = userFunctions[key];
    const recreate =
      force || userFunction.subscribed.some(item => changes.includes(item));
    if (recreate) {
      const option = state.options[userFunction.optionKey];
      const result = userFunction.callback(state, option);
      option[userFunction.prop] = result;
    }
  }
}

const userFunctions = {};

function addUserFunction(functionObject, optionKey, prop) {
  const key = optionKey + '_' + prop;
  userFunctions[key] = functionObject;
  userFunctions[key].optionKey = optionKey;
  userFunctions[key].prop = prop;

  console.log(userFunctions);
}

export {
  addUserFunction,
  // callUserFunction,
  // callOptionFunction,
  recalculateUserFunctions,
};
