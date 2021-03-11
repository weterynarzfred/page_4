import _ from 'lodash';
import { optionTypes } from '../include/enum';
import { pipe } from './../include/pipe';

function getSelected(option, selected = pipe.selected) {
  const value = _.get(selected, option.path.join('/'));
  if (value === undefined) {
    switch (option.type) {
      case optionTypes.INTEGER:
        return 0;
      case optionTypes.SELECT:
        return [];
      case optionTypes.INSTANCER:
        return { nextId: 0 };
    }
  }
  return value;
}

export default getSelected;
