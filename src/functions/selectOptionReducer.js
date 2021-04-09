import { optionTypes } from 'Include/constants';
import getOption from './getOption';
import deepClone from './deepClone';
import parseOptions from '../include/parseOptions';
import { clearUserFunctions } from '../include/userFunctions';
import { clearUserTexts } from '../include/userTexts';
import { getSelectedValue } from './getSelectedValue';

function getIntegerValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.add !== undefined) option.selected += action.add;
  else if (action.subtract !== undefined) option.selected -= action.subtract;
  option.timeChanged = new Date().getTime();
  let changes = [option.optionKey + '.selected'];
  if (option.isChoice) {
    const select = newState.options[option.path.join('/')];
    changes.push(select.optionKey + '.selected');
    const selectedOptions = getSelectedValue(select, newState.options);
    if (selectedOptions.length > select.max) {
      const moreChanges = getIntegerValue(
        {
          optionKey: selectedOptions[0],
          subtract: true,
        },
        newState
      );
      changes.push(...moreChanges);
      changes = [...new Set(changes)];
    }
  }
  return changes;
}

// function getSelectValue(action, value) {
//   if (value === undefined) value = [];
//   if (action.add !== undefined) {
//     if (!value.includes(action.add)) {
//       value.push(action.add);
//       if (value.length > action.option.max) {
//         value.shift();
//       }
//     }
//   } else if (action.subtract !== undefined) {
//     if (value.includes(action.subtract)) {
//       const index = value.indexOf(action.subtract);
//       value.splice(index, 1);
//     }
//   }
//   return value;
// }

function getTextValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.value !== undefined) option.selected = action.value;
  return [option.optionKey + '.selected'];
}

// function getSliderValue(action, value) {
//   if (value === undefined) value = 0;
//   return value;
// }

function getInstancerValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.add) {
    const instance = deepClone(option.instanceGroup);
    const instancerPath = [...option.path, option.slug];
    instance.type = optionTypes.GROUP;
    const parsedIntance = parseOptions(
      {
        [option.nextId]: instance,
      },
      instancerPath,
      { isInstance: true }
    );
    Object.assign(newState.options, parsedIntance);
    option.selected.push([...instancerPath, option.nextId].join('/'));

    return [
      option.optionKey + '.selected',
      option.optionKey + '/' + option.nextId++,
    ];
  }
}

function getGroupValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (option.isInstance && action.subtract) {
    const instancer = newState.options[option.path.join('/')];
    instancer.selected = instancer.selected.filter(
      item => item !== option.optionKey
    );

    const deletedKeys = [];
    Object.keys(newState.options).filter(optionKey => {
      if (optionKey.startsWith(option.optionKey)) {
        deletedKeys.push(optionKey);
        delete newState.options[optionKey];
      }
    });

    clearUserFunctions(option.optionKey);
    clearUserTexts(option.optionKey);

    return [instancer.optionKey + '.selected'];
  }
}

const getOptionValue = {
  [optionTypes.INTEGER]: getIntegerValue,
  // [optionTypes.SELECT]: getSelectValue,
  [optionTypes.TEXT]: getTextValue,
  // [optionTypes.SLIDER]: getSliderValue,
  [optionTypes.INSTANCER]: getInstancerValue,
  [optionTypes.GROUP]: getGroupValue,
};

function selectOptionReducer(newState, action, changes) {
  // let path;
  // let actionCopy = deepClone(action);
  // let type;
  // if (action.option.isChoice) {
  //   path = action.option.path.slice(0, -1);
  //   type = optionTypes.SELECT;
  //   actionCopy.option = getOption(path, newState.options);
  //   if (action.add !== undefined) actionCopy.add = action.option.slug;
  //   if (action.subtract !== undefined) actionCopy.subtract = action.option.slug;
  // } else {
  //   path = action.option.path;
  //   type = action.option.type;
  // }

  // let value = getOption(path, newState.options).selected;
  // if (actionCopy.value === undefined) {
  //   value = getOptionValue[type](actionCopy, value);
  // } else {
  //   value = action.value;
  // }
  // getOption(path, newState.options).selected = value;

  const option = newState.options[action.optionKey];
  const newChanges = getOptionValue[option.type](action, newState);
  changes.push(...newChanges);
  // console.log(changes);
}

export default selectOptionReducer;
