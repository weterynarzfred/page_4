import { createStore } from 'redux';
import produce from 'immer';
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { actions } from './constants';
import parseOptions from './parseOptions';
import selectOptionReducer from '../functions/selectOptionReducer';
import recalculateState from '../functions/recalculateState';
import rehydrateUserData from '../functions/rehydrateUserData';
import { deepClone } from '../functions/deepFunctions';
import { settings, rawOptions } from 'cyoa';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cyoaId', 'options', 'toggles'],
};

const initialState = {
  cyoaId: settings.cyoaId,
  options: parseOptions(deepClone(rawOptions)),
  toggles: {
    disclaimerClosed: false,
    NSFWDisplay: 'blur',
  },
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
      case actions.TOGGLE:
        if (action.value === undefined) {
          stateDraft.toggles[action.key] = !stateDraft.toggles[action.key];
        } else {
          stateDraft.toggles[action.key] = action.value;
        }
        break;
      case actions.SET:
        stateDraft.options[action.optionKey][action.key] = action.value;
        break;
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
const persistedReducer = process.env.NODE_ENV === 'development' ? rootReducer :
  persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store, undefined, () => {
    rehydrateUserData(store);
  });
  return { store, persistor };
};
