import { createStore } from 'redux';
import produce from 'immer';
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { settings, rawOptions } from 'cyoa';
import cleanupState from 'Functions/cleanupState';
import selectOptionReducer from 'Functions/selectOptionReducer';
import calculateCosts from 'Functions/calculateCosts';
import { actions } from './constants';
import parseOptions from './parseOptions';
import { recalculateUserFunctions } from './userFunctions';
import deepClone from '../functions/deepClone';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options'],
};

const initialState = {
  options: parseOptions(rawOptions),
  // currencies: settings.currencies,
  path: settings.initialScreen,
};

function rootReducer(state = initialState, action = '') {
  if (action.type === REHYDRATE) {
    return state;
  }

  return produce(state, newState => {
    const changes = [];

    switch (action.type) {
      case actions.SELECT_OPTION:
        selectOptionReducer(newState, action, changes);
        break;
      case actions.CHANGE_PATH:
        newState.path = action.path;
        break;
      //   case actions.RESTART:
      //     newState = deepClone(initialState);
      //     break;
      //   default:
    }

    if (
      [PERSIST, actions.SELECT_OPTION, actions.RESTART].includes(action.type)
    ) {
      console.time('recalculate');
      recalculateUserFunctions(newState, changes, action.type === PERSIST);
      console.timeEnd('recalculate');
      //   console.time('cleanup');
      //   cleanupState(newState.options, newState);
      //   console.timeEnd('cleanup');
      //   console.time('costs');
      //   calculateCosts(newState.options, newState.currencies, true);
      //   console.timeEnd('costs');
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
