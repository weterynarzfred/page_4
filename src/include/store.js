import { createStore } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { settings } from 'Src/cyoa';
import cleanupState from 'Functions/cleanupState';
import selectOptionReducer from 'Functions/selectOptionReducer';
import calculateCosts from 'Functions/calculateCosts';
import { actions } from './enum';
import parsedOptions from './parsedOptions';
import { recalculateUserFunctions } from './userFunctions';

const initialState = {
  options: parsedOptions,
  currencies: settings.currencies,
  path: ['intro'],
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
