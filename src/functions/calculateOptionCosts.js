import { optionTypes } from 'Include/constants';
import calculateCosts, { applyCost } from './calculateCosts';
import { deepEquals } from './deepFunctions';
import { getSelectedValue } from './getSelectedValue';

const subOptionContainers = {
  subOptions: [optionTypes.INTEGER, optionTypes.SLIDER, optionTypes.GROUP],
  choices: [optionTypes.SELECT],
  selected: [optionTypes.INSTANCER],
};

/**
 * Calculates the cost of a single option and its suboptions.
 */
function calculateOptionCosts(option, state, changes, optionChanges) {
  switch (option.type) {
    case optionTypes.INTEGER:
    case optionTypes.SLIDER:
      if (option.cost !== undefined) {
        if (!option.isRatioChoice) {
          applyCost(
            option.cost,
            option.lastCurrencyValues,
            getSelectedValue(option, state.options)
          );
        }
      }
      break;
    case optionTypes.RATIO:
      let ratioValue = getSelectedValue(option, state.options);
      for (const item of ratioValue) {
        const ratioChoice = state.options[item.optionKey];
        if (ratioChoice.cost !== undefined) {
          applyCost(
            ratioChoice.cost,
            option.lastCurrencyValues,
            item.percentage
          );
        }
      }
      break;
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

    // skip currencies that are not from the root
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
