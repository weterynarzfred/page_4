import { createStore } from 'redux';
import produce from 'immer';
import { settings, options } from 'cyoa';
import cleanupState from 'Functions/cleanupState';
import selectOptionReducer from 'Functions/selectOptionReducer';
import calculateCosts from 'Functions/calculateCosts';
import { actions } from './enum';
import { parseOptions } from './parsedOptions';
import { recalculateUserFunctions } from './userFunctions';

const initialState = {
  options: parseOptions(options),
  currencies: settings.currencies,
  path: settings.initialScreen,
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        selectOptionReducer(newState, action);
        break;
      case actions.CHANGE_PATH:
        newState.path = action.path;
        break;
      default:
    }

    recalculateUserFunctions(newState.options, newState);
    cleanupState(newState.options, newState);
    calculateCosts(newState.options, newState.currencies, true);

    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
