import { deepClone } from '../functions/deepFunctions';

window.userValues = {};

/**
 * Adds or updates a text to the userValues array.
 */
function addUserValue(content, optionKey, prop) {
  const key = optionKey + '.' + prop;
  userValues[key] = deepClone(content);
}

/**
 * Returns text value based on the optionKey.
 */
function getUserValue(optionKey, prop) {
  let key = optionKey + '.' + prop;
  if (prop === 'displayTitle' && userValues[key] === undefined) {
    key = optionKey + '.title';
  }
  if (userValues[key] === undefined) return '';
  return userValues[key];
}

/**
 * Removes any texts created on the key that was deleted or on any of its
 * suboptions.
 */
function clearUserValues(deletionKey) {
  Object.keys(userValues).filter(optionKey => {
    if (
      optionKey.startsWith(deletionKey + '.') ||
      optionKey.startsWith(deletionKey + '/')
    ) {
      delete userValues[optionKey];
    }
  });
}

export { addUserValue, getUserValue, clearUserValues };
