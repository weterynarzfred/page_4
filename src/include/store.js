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
import { actions } from './constants';
import parseOptions from './parseOptions';
import recalculateState from '../functions/recalculateState';
import rehydrateUserData from '../functions/rehydrateUserData';
import { deepClone } from '../functions/deepFunctions';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options', 'cyoaId'],
};

const initialState = {
  cyoaId: settings.cyoaId,
  options: parseOptions(deepClone(rawOptions)),
  toggles: {},
  currencies: settings.currencies,
  currencySettings: settings.currencySettings,
  path: settings.initialScreen,
};

function rootReducer(state = initialState, action = '') {
  if (action.type === REHYDRATE) {
    return state;
  }

  const producedState = produce(state, stateDraft => {
    let changes = [];

    switch (action.type) {
      case actions.SELECT_OPTION:
        selectOptionReducer(stateDraft, action, changes);
        break;
      case actions.CHANGE_PATH:
        stateDraft.path = action.path;
        break;
      case actions.RESTART:
        stateDraft = deepClone(initialState);
        window.userFunctions = {};
        window.userValues = {};
        stateDraft.options = parseOptions(deepClone(rawOptions));
        break;
      default:
    }

    const stateNeedsRecalculation = [
      PERSIST,
      actions.SELECT_OPTION,
      actions.RESTART,
      actions.RECALCULATE,
    ].includes(action.type);

    if (stateNeedsRecalculation) {
      const forceRecalculation = action.type !== actions.SELECT_OPTION;
      recalculateState(stateDraft, changes, forceRecalculation);
    }

    return stateDraft;
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
  let persistor = persistStore(store, undefined, () => {
    rehydrateUserData(store);
  });
  return { store, persistor };
};
