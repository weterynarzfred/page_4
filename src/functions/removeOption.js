import { clearUserFunctions } from '../include/userFunctions';
import { clearUserTexts } from '../include/userTexts';
import { isSelected } from './getSelectedValue';

/**
 * Removes an option and its suboptions from the state and cleans all user
 * values associated with those options.
 */
function removeOption(sourceKey, state, changes) {
  for (const optionKey in state.options) {
    if (optionKey !== sourceKey && !optionKey.startsWith(sourceKey + '/'))
      continue;

    if (isSelected(state.options[optionKey], state.options)) {
      changes.push(optionKey + '.selected');

      if (state.options[optionKey].isChoice) {
        changes.push(state.options[optionKey].path.join('/') + '.selected');
      }
    }

    delete state.options[optionKey];
  }

  clearUserFunctions(sourceKey);
  clearUserTexts(sourceKey);
}

export default removeOption;
