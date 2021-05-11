import { optionTypes } from '../include/constants';
import { getUserValue } from '../include/userValues';
import isDisabled from './isDisabled';

/**
 * Prepare an array of objects representing selected choices of a ratio option.
 */
function prepareRatioValue(option, options) {
  let ratioSum = 0;
  const value = option.choices
    .map(choiceKey => {
      const choice = options[choiceKey];
      if (choice === undefined) return { value: 0 };
      const choiceValue = getSelectedValue(choice, options);
      ratioSum += choiceValue;
      return {
        name: choice.slug,
        optionKey: choiceKey,
        title: getUserValue(choiceKey, 'title'),
        value: choiceValue,
      };
    })
    .filter(item => item.value > 0);
  for (const item of value) {
    item.percentage = item.value / ratioSum;
  }

  return value;
}

/**
 * Returns the value of an option. Does not check it the values ancestors are
 * selected.
 */
function getSelectedValue(option, options) {
  if (option === undefined) return undefined;

  let value;
  switch (option.type) {
    case optionTypes.INTEGER:
    case optionTypes.TEXT:
    case optionTypes.INSTANCER:
      value = option.selected;
      break;
    case optionTypes.SLIDER:
      value = Math.round(option.selected * 1e10) / 1e10;
      if (isNaN(value)) value = 0;
      break;
    case optionTypes.SELECT:
      if (!Array.isArray(option.choices)) return [];
      value = option.choices
        .filter(optionKey => getSelectedValue(options[optionKey]) >= 1)
        .sort(
          (a, b) =>
            (options[a].timeChanged || 0) - (options[b].timeChanged || 0)
        );
      break;
    case optionTypes.RATIO:
      if (!Array.isArray(option.choices)) return [];
      value = prepareRatioValue(option, options);
      break;
  }

  return value;
}

/**
 * Checks if the option as well as all of its ancestors are selected.
 */
function isSelected(option, options) {
  if (isDisabled(option)) return false;

  if (option.path.length > 0) {
    const parentPath = option.path.join('/');
    const isParentSelected = isSelected(options[parentPath], options);
    if (!isParentSelected) return false;
  }

  const value = getSelectedValue(option, options);
  switch (option.type) {
    case optionTypes.GROUP:
      return true;
    case optionTypes.INTEGER:
    case optionTypes.SLIDER:
      return value > 0;
    case optionTypes.SELECT:
    case optionTypes.RATIO:
    case optionTypes.TEXT:
    case optionTypes.INSTANCER:
      return value.length > 0;
  }
  return value;
}

export { getSelectedValue, isSelected };
