import { optionTypes } from 'Include/enum';
import deepClone from './deepClone';
import { getSelectedValue } from './getSelectedValue';

function cleanupState(options, state) {
  for (const slug in options) {
    if (options[slug].type === optionTypes.SELECT) {
      const selected = deepClone(getSelectedValue(options[slug]));
      for (let index = 0; index < selected.length; index++) {
        if (options[slug].choices[selected[index]] === undefined) {
          options[slug].selected.splice(index, 1);
        }
      }
    }

    if (options[slug].options !== undefined) {
      cleanupState(options[slug].options, state);
    }

    if (options[slug].type === optionTypes.INSTANCER) {
      cleanupState(options[slug].selected, state);
    }
  }
}

export default cleanupState;
