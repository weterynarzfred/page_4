import { dataTypes } from '../include/constants';
import { getUserText } from '../include/userTexts';

function getProp(optionKey, prop) {
  let value = null;
  if (prop === 'text' || prop === 'title') {
    value = getUserText(optionKey, prop);
  }

  return value;
}

export default getProp;
