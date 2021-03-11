import { createStore } from 'redux';
import produce from 'immer';
import _ from 'lodash';
import { setPipe } from './pipe';
import { actions, optionTypes } from './enum';

const initialState = {
  selected: {},
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    switch (action.type) {
      case actions.SELECT_OPTION:
        let value = _.get(newState.selected, action.option.path.join('/'));
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
                for (const pathstring in state.selected) {
                  if (
                    pathstring.match(
                      new RegExp(`^${action.subtract.path.join('/')}`)
                    )
                  ) {
                    delete newState.selected[pathstring];
                  }
                }
                delete value[action.subtract.slug];
              }
              break;
          }
        } else {
          value = action.value;
        }
        _.set(newState.selected, action.option.path.join('/'), value);
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
