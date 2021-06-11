import { optionTypes } from '../include/constants';
import calculateCosts, { applyCost } from './calculateCosts';
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
function calculateOptionCosts(option, state, changes, optionChanges, currencies) {
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

    const currencyRoots = {};
    if (option.currencies !== undefined) {
      Object.assign(option.lastCurrencyValues, option.currencies);
      for (const key in option.currencies) {
        currencyRoots[key] = option.optionKey;
      }
    }

    const subChanges = calculateCosts({
      state,
      currencies: option.lastCurrencyValues,
      options: subOptions,
      optionChanges,
      calcChanges: option.currencies === undefined ? [] : Object.keys(option.currencies),
      currencyRoots,
    });
    changes.push(...subChanges);

    if (option.currencies !== undefined) {
      for (const key in option.currencies) {
        option.currencies[key] = option.lastCurrencyValues[key];
      }
    }
  }
}

export default calculateOptionCosts;
