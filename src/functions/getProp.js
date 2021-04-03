import { dataTypes } from '../include/constants';
import { getUserText } from '../include/userTexts';

function getProp(prop, option) {
  let value = option[prop];

  if (prop === 'text') {
    if (option.text === dataTypes.USER_TEXT) {
      value = getUserText(option.path);
    }
  }
  if (prop === 'title') {
    if (option.title === dataTypes.USER_TEXT) {
      value = getUserText([...option.path, '_title']);
    }
  }

  return value || null;
}

export default getProp;
