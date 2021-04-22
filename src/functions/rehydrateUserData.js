import { actions } from '../include/constants';
import parseOptions from '../include/parseOptions';
import { getUserValue } from '../include/userValues';
import { deepClone } from './deepFunctions';

/**
 * Populates the userFunctions and userValues arrays after the rehydrate action
 */
function rehydrateUserData(store) {
  const state = store.getState();
  for (const optionKey in state.options) {
    const option = state.options[optionKey];
    if (option.isInstance) {
      const instanceGroup = getUserValue(
        option.path.join('/'),
        'instanceGroup'
      );
      parseOptions(
        { [option.slug]: deepClone(instanceGroup) },
        deepClone(option.path),
        { isInstance: true }
      );
    }
  }

  store.dispatch({
    type: actions.RECALCULATE,
  });
}

export default rehydrateUserData;
