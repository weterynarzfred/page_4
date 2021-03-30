const userTexts = {};

function addUserText(path, text) {
  let pathString;
  if (Array.isArray(path)) pathString = path.join('.');
  else pathString = path;
  userTexts[pathString] = text;
}

function getUserText(path) {
  let pathString;
  if (Array.isArray(path)) pathString = path.join('.');
  else pathString = path;
  if (userTexts[pathString] !== undefined) return userTexts[pathString];

  pathString = pathString
    .split('.')
    .filter(e => isNaN(e))
    .join('.');
  if (userTexts[pathString] !== undefined) return userTexts[pathString];

  return 'text undefined';
}

export { addUserText, getUserText };
