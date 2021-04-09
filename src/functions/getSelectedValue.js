import { optionTypes } from 'Include/constants';
import deepClone from './deepClone';
import getOption from './getOption';

function getSelectedValue(option, options) {
  if (option === undefined) return undefined;
  // const currentOption = getOption(option, options);

  // let value;
  // if (currentOption.isChoice) {
  //   return getSelectedValue(currentOption.path.slice(0, -1), options).includes(
  //     currentOption.slug
  //   )
  //     ? 1
  //     : 0;
  // } else if (currentOption.type === optionTypes.INSTANCER) {
  //   value = {};
  //   for (const slug in currentOption.selected) {
  //     if (!isNaN(slug)) value[slug] = currentOption.selected[slug];
  //   }
  // } else if (currentOption.transformedValue !== undefined) {
  //   value = currentOption.transformedValue;
  // } else {
  //   value = currentOption.selected;
  // }

  let value;

  switch (option.type) {
    case optionTypes.INTEGER:
      value = option.selected;
      break;
    case optionTypes.SELECT:
      if (!Array.isArray(option.choices)) return 0;
      value = option.choices
        .filter(optionKey => getSelectedValue(options[optionKey]) >= 1)
        .sort(
          (a, b) =>
            (options[a].timeChanged || 0) - (options[b].timeChanged || 0)
        );
      break;
    case optionTypes.TEXT:
      value = option.selected;
      break;
    case optionTypes.SLIDER:
      //
      break;
    case optionTypes.INSTANCER:
      value = option.selected;
      break;
  }

  return value;
}

function getSelectedCount(option, options) {
  //   let currentOption = getOption(option, options);
  //   if (!isSelected(option, options)) return 0;
  //   const value = getSelectedValue(currentOption, options);
  //   switch (currentOption.type) {
  //     case optionTypes.GROUP:
  //       return 1;
  //     case optionTypes.INTEGER:
  //       return value;
  //     case optionTypes.SELECT:
  //       return value.length;
  //     case optionTypes.TEXT:
  //       return value.length;
  //     case optionTypes.SLIDER:
  //       return value;
  //     case optionTypes.INSTANCER:
  //       return Object.keys(value).length;
  //   }
  //   return value;
}

function isSelected(option, options, checkedParents = 0) {
  if (option.path.length > checkedParents) {
    const parentPath = option.path.join('/');
    if (!isSelected(options[parentPath], options, checkedParents + 1))
      return false;
  }

  const value = getSelectedValue(option, options);
  switch (option.type) {
    case optionTypes.GROUP:
      return true;
    case optionTypes.INTEGER:
      return value > 0;
    case optionTypes.SELECT:
      return value.length > 0;
    case optionTypes.TEXT:
      return value.length > 0;
    case optionTypes.SLIDER:
      return value > 0;
    case optionTypes.INSTANCER:
      return value.length > 0;
  }
  return value;
}

export { getSelectedValue, getSelectedCount, isSelected };
