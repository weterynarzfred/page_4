window.userTexts = {};

/**
 * Adds or updates a text to the userTexts array.
 */
function addUserText(content, optionKey, prop) {
  const key = optionKey + '.' + prop;
  userTexts[key] = content;
}

/**
 * Returns text value based on the optionKey.
 */
function getUserText(optionKey, prop) {
  const key = optionKey + '.' + prop;
  if (userTexts[key] === undefined) return '';
  return userTexts[key];
}

/**
 * Removes any texts created on the key that was deleted or on any of its
 * suboptions.
 */
function clearUserTexts(deletionKey) {
  Object.keys(userTexts).filter(optionKey => {
    if (
      optionKey.startsWith(deletionKey + '.') ||
      optionKey.startsWith(deletionKey + '/')
    ) {
      delete userTexts[optionKey];
    }
  });
}

export { addUserText, getUserText, clearUserTexts };
