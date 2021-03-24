import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import getOption from './getOption';
import getSelectedValue from './getSelectedValue';

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

export default isSelected;
