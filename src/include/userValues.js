import { deepClone } from '../functions/deepFunctions';

window.UserValues = {};

/**
 * Adds or updates a text to the UserValues array.
 */
function addUserValue(content, optionKey, prop) {
  const key = optionKey + '.' + prop;
  UserValues[key] = content;
}

/**
 * Returns text value based on the optionKey.
 */
function getUserValue(optionKey, prop) {
  const key = optionKey + '.' + prop;
  if (UserValues[key] === undefined) return '';
  return UserValues[key];
}

/**
 * Removes any texts created on the key that was deleted or on any of its
 * suboptions.
 */
function clearUserValues(deletionKey) {
  Object.keys(UserValues).filter(optionKey => {
    if (
      optionKey.startsWith(deletionKey + '.') ||
      optionKey.startsWith(deletionKey + '/')
    ) {
      delete UserValues[optionKey];
    }
  });
}

export { addUserValue, getUserValue, clearUserValues };
