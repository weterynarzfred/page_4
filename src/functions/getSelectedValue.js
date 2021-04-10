import { optionTypes } from 'Include/constants';

/**
 * Returns the value of an option. Does not check it the values ancestors are
 * selected.
 */
function getSelectedValue(option, options) {
  if (option === undefined) return undefined;

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

/**
 * Checks if the option as well as all of its ancestors are selected.
 */
function isSelected(option, options) {
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

export { getSelectedValue, isSelected };
