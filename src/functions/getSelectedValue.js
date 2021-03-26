import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import getOption from './getOption';

function getSelectedValue(option, options) {
  const currentOption = getOption(option, options);

  let value;
  if (currentOption.isChoice) {
    return getSelectedValue(currentOption.path.slice(0, -1), options).includes(
      currentOption.slug
    )
      ? 1
      : 0;
  } else if (currentOption.type === optionTypes.INSTANCER) {
    value = {};
    for (const slug in currentOption.selected) {
      if (!isNaN(slug)) value[slug] = currentOption.selected[slug];
    }
  } else {
    value = currentOption.selected;
  }
  if (value === undefined) {
    switch (currentOption.type) {
      case optionTypes.INTEGER:
        return 0;
      case optionTypes.SELECT:
        return [];
      case optionTypes.TEXT:
        return '';
      case optionTypes.INSTANCER:
        return {};
    }
  }
  return value;
}

function getSelectedCount(option, options) {
  let currentOption = getOption(option, options);

  if (!isSelected(option, options)) return 0;

  const value = getSelectedValue(currentOption, options);
  switch (currentOption.type) {
    case optionTypes.GROUP:
      return 1;
    case optionTypes.INTEGER:
      return value;
    case optionTypes.SELECT:
      return value.length;
    case optionTypes.TEXT:
      return value.length;
    case optionTypes.INSTANCER:
      return Object.keys(value).length;
  }
  return value;
}

function isSelected(option, options, checkedParents = 0) {
  let currentOption = getOption(option, options);

  if (currentOption.path.length > checkedParents + 1) {
    const parentPath = currentOption.path.slice(0, checkedParents + 1);
    if (!isSelected(parentPath, options, checkedParents + 1)) return false;
  }
  const value = getSelectedValue(currentOption, options);

  switch (currentOption.type) {
    case optionTypes.GROUP:
      return true;
    case optionTypes.INTEGER:
      return value > 0;
    case optionTypes.SELECT:
      return value.length > 0;
    case optionTypes.TEXT:
      return value.length > 0;
    case optionTypes.INSTANCER:
      return Object.keys(value).length > 0;
  }
  return value;
}

export { getSelectedValue, getSelectedCount, isSelected };
