import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import getOption from './getOption';
import deepClone from './deepClone';

function getIntegerValue(action, value) {
  if (value === undefined) value = 0;
  if (action.add !== undefined) value += action.add;
  else if (action.subtract !== undefined) value -= action.subtract;
  return value;
}

function getSelectValue(action, value) {
  if (value === undefined) value = [];
  if (action.add !== undefined) {
    if (!value.includes(action.add)) {
      value.push(action.add);
      if (value.length > action.option.max) {
        value.shift();
      }
    }
  } else if (action.subtract !== undefined) {
    if (value.includes(action.subtract)) {
      const index = value.indexOf(action.subtract);
      value.splice(index, 1);
    }
  }
  return value;
}

function getTextValue(action, value) {
  if (value === undefined) value = '';
  return value;
}

function getInstancerValue(action, value) {
  if (value === undefined) value = { nextId: 0 };
  if (action.add !== undefined) {
    value[value.nextId] = action.add;
    value[value.nextId].type = optionTypes.GROUP;
    value[value.nextId].slug = value.nextId;
    value[value.nextId].path = _.clone(action.option.path);
    value[value.nextId].path.push(value.nextId);
    value.nextId++;
  }
  if (action.subtract !== undefined) {
    delete value[action.subtract.slug];
  }
  return value;
}

const getOptionValue = {
  [optionTypes.INTEGER]: getIntegerValue,
  [optionTypes.SELECT]: getSelectValue,
  [optionTypes.TEXT]: getTextValue,
  [optionTypes.INSTANCER]: getInstancerValue,
};

function selectOptionReducer(newState, action) {
  let path;
  let actionCopy = deepClone(action);
  let type;
  if (action.option.isChoice) {
    path = action.option.path.slice(0, -1);
    type = optionTypes.SELECT;
    if (action.add !== undefined) actionCopy.add = action.option.slug;
    if (action.subtract !== undefined) actionCopy.subtract = action.option.slug;
  } else {
    path = action.option.path;
    type = action.option.type;
  }

  let value = getOption(path, newState.options).selected;
  if (actionCopy.value === undefined) {
    value = getOptionValue[type](actionCopy, value);
  } else {
    value = action.value;
  }
  getOption(path, newState.options).selected = value;
}

export default selectOptionReducer;
