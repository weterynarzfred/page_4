import _ from 'lodash';
import { optionTypes } from 'Include/enum';
import getOption from 'Functions/getOption';

function getSelected(option, options) {
  let currentOption;
  if (typeof option === 'string') {
    currentOption = getOption(option.split('.'), options);
  } else if (_.isArray(option)) {
    currentOption = getOption(option, options);
  } else {
    currentOption = option;
  }

  let value = currentOption.selected;
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

export default getSelected;
