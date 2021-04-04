import { createStore } from 'redux';
import produce from 'immer';
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { settings, options } from 'cyoa';
import cleanupState from 'Functions/cleanupState';
import selectOptionReducer from 'Functions/selectOptionReducer';
import calculateCosts from 'Functions/calculateCosts';
import { actions } from './constants';
import { parseOptions } from './parsedOptions';
import { recalculateUserFunctions } from './userFunctions';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options'],
};

const initialState = {
  options: parseOptions(options),
  currencies: settings.currencies,
  path: settings.initialScreen,
};

function rootReducer(state = initialState, action = '') {
  if (action.type === REHYDRATE) {
    return state;
  }

  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        selectOptionReducer(newState, action);
        break;
      case actions.CHANGE_PATH:
        newState.path = action.path;
        break;
      case actions.RESTART:
        newState = initialState;
        break;
      default:
    }

    if ([PERSIST, actions.SELECT_OPTION].includes(action.type)) {
      console.time('recalc');
      recalculateUserFunctions(newState.options, newState);
      cleanupState(newState.options, newState);
      calculateCosts(
        newState.options,
        newState.currencies,
        true,
        newState.options
      );
      console.timeEnd('recalc');
    }

    return newState;
  });
}

// skip redux-persist in development
let persistedReducer;
if (process.env.NODE_ENV === 'development') {
  persistedReducer = rootReducer;
} else {
  persistedReducer = persistReducer(persistConfig, rootReducer);
}

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
