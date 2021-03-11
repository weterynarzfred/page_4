import _ from 'lodash';
import { optionTypes } from '../include/enum';
import { pipe } from './../include/pipe';

function getSelected(option, selected = pipe.selected) {
  let value;
  if (typeof option === 'string') {
    value = _.get(selected, option);
  } else if (_.isArray(option)) {
    value = _.get(selected, option.join('/'));
  } else {
    value = _.get(selected, option.path.join('/'));
  }
  if (value === undefined) {
    if (option.default !== undefined) {
      return option.default;
    }
    switch (option.type) {
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
