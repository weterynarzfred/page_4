import _ from 'lodash';
import getOption from './getOption';
import { optionTypes } from '../include/enum';

function getIntegerValue(action, value) {
  if (value === undefined) value = 0;
  if (action.add !== undefined) value += action.add;
  else if (action.subtract !== undefined) value -= action.subtract;
  return value;
}

function getSelectValue(action, value) {
  if (value === undefined) value = [];
  if (action.add !== undefined) {
    if (!value.includes(action.add)) value.push(action.add);
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
  let value = getOption(action.option.path, newState.options).selected;
  if (action.value === undefined) {
    value = getOptionValue[action.option.type](action, value);
  } else {
    value = action.value;
  }
  getOption(action.option.path, newState.options).selected = value;
}

export default selectOptionReducer;
