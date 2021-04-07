window.userTexts = {};

// function addUserText(path, text) {
//   let pathString;
//   if (Array.isArray(path)) pathString = path.join('/');
//   else pathString = path;
//   userTexts[pathString] = text;
// }

// function getUserText(path) {
//   let pathString;
//   if (Array.isArray(path)) pathString = path.join('/');
//   else pathString = path;
//   if (userTexts[pathString] !== undefined) return userTexts[pathString];

//   pathString = pathString
//     .split('.')
//     .filter(e => isNaN(e))
//     .join('/');
//   if (userTexts[pathString] !== undefined) return userTexts[pathString];

//   return 'text undefined';
// }

function addUserText(content, optionKey, prop) {
  const key = optionKey + '_' + prop;
  userTexts[key] = content;
}

function getUserText(optionKey, prop) {
  const key = optionKey + '_' + prop;
  if (userTexts[key] === undefined) return '';
  return userTexts[key];
}

function clearUserTexts(deletionKey) {
  Object.keys(userTexts).filter(optionKey => {
    if (optionKey.startsWith(deletionKey)) {
      delete userTexts[optionKey];
    }
  });
}

export { addUserText, getUserText, clearUserTexts };
