import { optionTypes } from 'Include/constants';
import calculateCosts, { applyCost } from './calculateCosts';
import { deepEquals } from './deepFunctions';
import { getSelectedValue } from './getSelectedValue';

const subOptionContainers = {
  options: [optionTypes.INTEGER, optionTypes.SLIDER, optionTypes.GROUP],
  choices: [optionTypes.SELECT],
  selected: [optionTypes.INSTANCER],
};

/**
 * Subtract the cost of the option from the currency value based on its type
 */
function applyOptionCosts(option, state) {
  switch (option.type) {
    case optionTypes.INTEGER:
    case optionTypes.SLIDER:
      if (option.cost === undefined || option.isRatioChoice) break;
      const selected = getSelectedValue(option, state.options);
      applyCost(option.cost, option.lastCurrencyValues, selected);
      break;
    case optionTypes.RATIO:
      let ratioValue = getSelectedValue(option, state.options);
      for (const item of ratioValue) {
        const ratioChoice = state.options[item.optionKey];
        if (ratioChoice.cost === undefined) continue;
        applyCost(ratioChoice.cost, option.lastCurrencyValues, item.percentage);
      }
      break;
  }
}

/**
 * Calculates the cost of a single option and its suboptions.
 */
function calculateOptionCosts(option, state, changes, optionChanges) {
  applyOptionCosts(option, state);

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

    // calculate root currencies
    if (
      deepEquals(
        Object.keys(option.lastCurrencyValues),
        Object.keys(state.currencies)
      )
    ) {
      const subChanges = calculateCosts({
        state,
        currencies: option.lastCurrencyValues,
        options: subOptions,
        optionChanges,
      });
      changes.push(...subChanges);
    }
  }

  // calculate suboption currencies
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
