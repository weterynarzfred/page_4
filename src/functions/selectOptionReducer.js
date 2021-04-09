import { optionTypes } from 'Include/constants';
import getOption from './getOption';
import deepClone from './deepClone';
import parseOptions from '../include/parseOptions';
import { clearUserFunctions } from '../include/userFunctions';
import { clearUserTexts } from '../include/userTexts';
import { getSelectedValue } from './getSelectedValue';
import removeOption from './removeOption';

function checkChoiceParent(newState, option, changes) {
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

function getIntegerValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.add !== undefined) option.selected += action.add;
  else if (action.subtract !== undefined) option.selected -= action.subtract;
  option.timeChanged = new Date().getTime();
  let changes = [option.optionKey + '.selected'];
  if (option.isChoice) {
    checkChoiceParent(newState, option, changes);
  }
  changes = [...new Set(changes)];
  return changes;
}

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
    const changes = [instancer.optionKey + '.selected'];

    Object.keys(newState.options).forEach(optionKey => {
      if (
        optionKey === option.optionKey ||
        optionKey.startsWith(option.optionKey + '/')
      ) {
        removeOption(optionKey, newState, changes);
      }
    });

    instancer.selected = instancer.selected.filter(
      item => item !== option.optionKey
    );

    return changes;
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
  const option = newState.options[action.optionKey];
  const newChanges = getOptionValue[option.type](action, newState);
  changes.push(...newChanges);
  // console.log(changes);
}

export default selectOptionReducer;
