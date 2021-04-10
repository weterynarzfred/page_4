import { optionTypes } from 'Include/constants';
import calculateCosts, { applyCost } from './calculateCosts';
import { getSelectedValue } from './getSelectedValue';

const subOptionContainers = {
  subOptions: [optionTypes.INTEGER, optionTypes.GROUP],
  choices: [optionTypes.SELECT],
  selected: [optionTypes.INSTANCER],
};

/**
 * Calculates the cost of a single option and its suboptions.
 */
function calculateOptionCosts(option, state, changes, optionChanges) {
  if (option.cost !== undefined) {
    if (option.type === optionTypes.INTEGER) {
      applyCost(
        option.cost,
        option.lastCurrencyValues,
        getSelectedValue(option, state.options)
      );
    }
  }

  for (const subOptionContainer in subOptionContainers) {
    if (
      option[subOptionContainer] === undefined ||
      !subOptionContainers[subOptionContainer].includes(option.type)
    )
      continue;

    const subOptions = {};
    for (const optionKey of option[subOptionContainer]) {
      subOptions[optionKey] = state.options[optionKey];
    }

    const subChanges = calculateCosts({
      state,
      currencies: option.lastCurrencyValues,
      options: subOptions,
      optionChanges,
    });
    changes.push(...subChanges);
  }

  if (option.currencies !== undefined) {
    const subOptions = {};
    for (const optionKey in state.options) {
      if (!optionKey.startsWith(option.optionKey + '/')) continue;
      subOptions[optionKey] = state.options[optionKey];
    }
    const subChanges = calculateCosts({
      state,
      currencies: option.currencies,
      options: subOptions,
      optionChanges,
      reset: true,
      calcChanges: true,
    });
    changes.push(...subChanges);
  }
}

export default calculateOptionCosts;
