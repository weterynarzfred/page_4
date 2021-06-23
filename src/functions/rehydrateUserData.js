import parseOptions from '../include/parseOptions';
import { getUserValue } from '../include/userValues';
import { deepClone } from './deepFunctions';

/**
 * Populates the userFunctions and userValues arrays after the rehydrate action
 */
function rehydrateUserData(state) {
  for (const optionKey in state.options) {
    const option = state.options[optionKey];
    option.optionKey = optionKey;
    option.path = optionKey.split('/');
    option.slug = option.path.pop();

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
}

export default rehydrateUserData;
