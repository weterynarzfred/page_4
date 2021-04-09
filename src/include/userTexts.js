window.userTexts = {};

function addUserText(content, optionKey, prop) {
  const key = optionKey + '.' + prop;
  userTexts[key] = content;
}

function getUserText(optionKey, prop) {
  const key = optionKey + '.' + prop;
  if (userTexts[key] === undefined) return '';
  return userTexts[key];
}

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
