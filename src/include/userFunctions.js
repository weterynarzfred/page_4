const userFunctions = [];

function addUserFunction(func) {
  userFunctions.push(func);
  return {
    isUserFunction: true,
    functionId: userFunctions.length - 1,
  };
}

function callUserFunction(option, state) {
  Object.assign(option, userFunctions[option.functionId](state));
}

export { addUserFunction, callUserFunction };
