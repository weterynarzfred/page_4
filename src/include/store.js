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
  currencies: settings.currencies,
  currencySettings: settings.currencySettings,
  path: settings.initialScreen,
};

function rootReducer(state = initialState, action = '') {
  if (action.type === REHYDRATE) {
    return state;
  }

  const producedState = produce(state, newState => {
    let changes = [];

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
      let i = 0;
      while (changes.length > 0 || (i === 0 && action.type === PERSIST)) {
        recalculateUserFunctions(newState, changes, action.type === PERSIST);
        changes = calculateCosts(newState);
        console.log(changes);
        i++;
      }
      console.timeEnd('recalculate');
    }

    return newState;
  });

  return producedState;
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
