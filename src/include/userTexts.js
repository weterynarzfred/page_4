const userTexts = [];

function addUserText(text) {
  userTexts.push(text);
  return userTexts.length - 1;
}

function getUserText(id) {
  if (isNaN(id)) return '';
  return userTexts[id];
}

export { addUserText, getUserText };
