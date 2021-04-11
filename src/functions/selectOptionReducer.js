import { optionTypes } from 'Include/constants';
import { deepClone } from './deepFunctions';
import parseOptions from '../include/parseOptions';
import { getSelectedValue } from './getSelectedValue';
import removeOption from './removeOption';
import { getUserValue } from '../include/userValues';

/**
 * Applies changes to the parent of the selected option that is a choice.
 */
function checkChoiceParent(newState, option, changes) {
  const select = newState.options[option.path.join('/')];
  changes.push(select.optionKey + '.selected');
  const selectedOptions = getSelectedValue(select, newState.options);
  if (selectedOptions.length > select.max) {
    const moreChanges = setIntegerValue(
      {
        optionKey: selectedOptions[0],
        subtract: true,
      },
      newState
    );
    changes.push(...moreChanges);
    changes = [...new Set(changes)];
  }
}

/**
 * Sets the value of integer options.
 */
function setIntegerValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.add !== undefined) option.selected += action.add;
  else if (action.subtract !== undefined) option.selected -= action.subtract;
  else if (action.value !== undefined) option.selected = action.value;
  option.timeChanged = new Date().getTime();
  let changes = [option.optionKey + '.selected'];
  if (option.isChoice) {
    checkChoiceParent(newState, option, changes);
  }
  changes = [...new Set(changes)];
  return changes;
}

/**
 * Sets the value of text options/
 */
function setTextValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.value !== undefined) option.selected = action.value;
  return [option.optionKey + '.selected'];
}

/**
 * Sets the value of slider options/
 */
function setSliderValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.value !== undefined) option.selected = action.value;
  return [option.optionKey + '.selected'];
}

/**
 * Creates new instances
 */
function setInstancerValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (action.add) {
    const instance = deepClone(getUserValue(option.optionKey, 'instanceGroup'));
    const instancerPath = [...option.path, option.slug];
    instance.type = optionTypes.GROUP;
    const parsedIntance = parseOptions(
      {
        [option.nextId]: instance,
      },
      instancerPath,
      { isInstance: true }
    );
    Object.assign(newState.options, parsedIntance);
    option.selected.push([...instancerPath, option.nextId].join('/'));

    let index = 1;
    for (const optionKey of option.selected) {
      newState.options[optionKey].numbering = [...option.numbering, index++];
    }

    return [
      option.optionKey + '.selected',
      option.optionKey + '/' + option.nextId++,
    ];
  }
}

/**
 * Removes instances.
 */
function setGroupValue(action, newState) {
  const option = newState.options[action.optionKey];
  if (option.isInstance && action.subtract) {
    const instancer = newState.options[option.path.join('/')];
    const changes = [instancer.optionKey + '.selected'];

    removeOption(option.optionKey, newState, changes);

    instancer.selected = instancer.selected.filter(
      item => item !== option.optionKey
    );

    let index = 1;
    for (const optionKey of instancer.selected) {
      newState.options[optionKey].numbering = [...instancer.numbering, index++];
    }

    return changes;
  }
}

const getOptionValue = {
  [optionTypes.INTEGER]: setIntegerValue,
  [optionTypes.TEXT]: setTextValue,
  [optionTypes.SLIDER]: setSliderValue,
  [optionTypes.INSTANCER]: setInstancerValue,
  [optionTypes.GROUP]: setGroupValue,
};

/**
 * Applies changes from the action to the selected option in the state draft.
 */
function selectOptionReducer(newState, action, changes) {
  const option = newState.options[action.optionKey];
  const newChanges = getOptionValue[option.type](action, newState);
  changes.push(...newChanges);
  // console.log(changes);
}

export default selectOptionReducer;
