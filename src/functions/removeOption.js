import { clearUserFunctions } from '../include/userFunctions';
import { clearUserTexts } from '../include/userTexts';
import deepClone from './deepClone';
import { isSelected } from './getSelectedValue';

function removeOption(optionKey, state, changes) {
  if (isSelected(state.options[optionKey], state.options)) {
    changes.push(optionKey + '.selected');
    if (state.options[optionKey].isChoice) {
      changes.push(state.options[optionKey].path.join('/') + '.selected');
    }
  }

  delete state.options[optionKey];
  clearUserFunctions(optionKey);
  clearUserTexts(optionKey);
}

export default removeOption;
