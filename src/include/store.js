import { createStore } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { setPipe } from './pipe';
import { actions, optionTypes } from './enum';
import parsedOptions from './parsedOptions';
import { callUserFunction } from './userFunctions';
import getOption from '../functions/getOption';
import getSelected from '../functions/getSelected';

function recalculateUserFunctions(options, state) {
  for (const slug in options) {
    if (options[slug].isUserFunction) {
      callUserFunction(options[slug], state);
    }

    if (options[slug].options !== undefined) {
      recalculateUserFunctions(options[slug].options, state);
    }

    if (options[slug].type === optionTypes.INSTANCER) {
      recalculateUserFunctions(options[slug].selected, state);
    }
  }
}

function cleanupState(options, state) {
  for (const slug in options) {
    if (options[slug].type === optionTypes.SELECT) {
      const selected = _.clone(getSelected(options[slug]));
      for (let index = 0; index < selected.length; index++) {
        if (options[slug].choices[selected[index]] === undefined) {
          options[slug].selected.splice(index, 1);
        }
      }
    }

    if (options[slug].options !== undefined) {
      cleanupState(options[slug].options, state);
    }

    if (options[slug].type === optionTypes.INSTANCER) {
      cleanupState(options[slug].selected, state);
    }
  }
}

const initialState = {
  options: parsedOptions,
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        let value = getOption(action.option.path, newState.options).selected;
        if (action.value === undefined) {
          switch (action.option.type) {
            case optionTypes.INTEGER:
              if (value === undefined) value = 0;
              if (action.add !== undefined) value += action.add;
              else if (action.subtract !== undefined) value -= action.subtract;
              break;
            case optionTypes.SELECT:
              if (value === undefined) value = [];
              if (action.add !== undefined) {
                if (!value.includes(action.add)) value.push(action.add);
              } else if (action.subtract !== undefined) {
                if (value.includes(action.subtract)) {
                  const index = value.indexOf(action.subtract);
                  value.splice(index, 1);
                }
              }
              break;
            case optionTypes.TEXT:
              if (value === undefined) value = '';
              break;
            case optionTypes.INSTANCER:
              if (value === undefined) value = { nextId: 0 };
              if (action.add !== undefined) {
                value[value.nextId] = action.add;
                value[value.nextId].type = optionTypes.GROUP;
                value[value.nextId].slug = value.nextId;
                value[value.nextId].path = _.clone(action.option.path);
                value[value.nextId].path.push(value.nextId);
                value.nextId++;
              }
              if (action.subtract !== undefined) {
                delete value[action.subtract.slug];
              }
              break;
          }
        } else {
          value = action.value;
        }
        getOption(action.option.path, newState.options).selected = value;
        break;
      default:
    }

    recalculateUserFunctions(newState.options, newState);
    cleanupState(newState.options, newState);

    setPipe(_.cloneDeep(newState));
    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
