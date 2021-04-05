const userTexts = {};

// function addUserText(path, text) {
//   let pathString;
//   if (Array.isArray(path)) pathString = path.join('.');
//   else pathString = path;
//   userTexts[pathString] = text;
// }

// function getUserText(path) {
//   let pathString;
//   if (Array.isArray(path)) pathString = path.join('.');
//   else pathString = path;
//   if (userTexts[pathString] !== undefined) return userTexts[pathString];

//   pathString = pathString
//     .split('.')
//     .filter(e => isNaN(e))
//     .join('.');
//   if (userTexts[pathString] !== undefined) return userTexts[pathString];

//   return 'text undefined';
// }

function addUserText(content, optionKey, prop) {
  const key = optionKey + '_' + prop;
  let version = 0;
  if (userTexts[key] !== undefined) version = userTexts[key].value + 1;
  userTexts[key] = {
    version,
    content,
  };

  console.log(userTexts);
}

function getUserText(optionKey, prop) {
  const key = optionKey + '_' + prop;
  if (userTexts[key] === undefined) return '';
  return userTexts[key].content;
}

function isUserTextCurrent(optionKey, prop, version) {
  const key = optionKey + '_' + prop;
  if (userTexts[key] === undefined) return false;
  return userTexts[key].version === version;
}

export { addUserText, getUserText, isUserTextCurrent };
