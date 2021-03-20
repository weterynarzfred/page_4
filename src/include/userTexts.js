const userTexts = [];

function addUserText(text) {
  userTexts.push(text);
  return userTexts.length - 1;
}

export { userTexts, addUserText };
