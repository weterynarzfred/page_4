import { createStore } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { setPipe } from './pipe';
import { actions, optionTypes } from './enum';

const initialState = {
  selected: {
    beAGirl: 5,
  },
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        let value = _.get(newState.selected, action.option.path);
        switch (action.option.type) {
          case optionTypes.INTEGER:
            if (action.value !== undefined) value = action.value;
            else if (action.add !== undefined) value += action.add;
            else if (action.subtract !== undefined) value -= action.subtract;
            break;
          case optionTypes.SELECT:
            if (value === undefined) value = [];
            if (action.value !== undefined) value = action.value;
            else if (action.add !== undefined) {
              if (!value.includes(action.add)) value.push(action.add);
            } else if (action.subtract !== undefined) {
              if (value.includes(action.subtract)) {
                const index = value.indexOf(action.subtract);
                value.splice(index, 1);
              }
            }
            break;
        }
        _.set(newState.selected, action.option.path, value);
        break;
      default:
    }

    setPipe(_.cloneDeep(newState));
    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
