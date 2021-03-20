import { createStore } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { actions } from './enum';
import parsedOptions from './parsedOptions';
import { recalculateUserFunctions } from './userFunctions';
import { settings } from '../cyoa';
import cleanupState from '../functions/cleanupState';
import selectOptionReducer from '../functions/selectOptionReducer';
import calculateCosts from '../functions/calculateCosts';

const initialState = {
  options: parsedOptions,
  currencies: settings.currencies,
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        selectOptionReducer(newState, action);
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
