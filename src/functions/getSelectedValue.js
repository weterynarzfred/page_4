import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import getOption from './getOption';

function getSelectedValue(option, options) {
  const currentOption = getOption(option, options);

  let value;
  if (currentOption.isChoice) {
    return getSelectedValue(currentOption.path.slice(0, -1), options).includes(
      currentOption.slug
    );
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
        return { nextId: 0 };
    }
  }
  return value;
}

export default getSelectedValue;
