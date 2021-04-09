import { optionTypes } from 'Include/constants';
import deepClone from './deepClone';
import { getSelectedValue, isSelected } from './getSelectedValue';

function applyCost(cost, costs, count) {
  for (const costSlug in cost) {
    if (costs[costSlug] !== undefined) {
      costs[costSlug] -= cost[costSlug] * count;
    }
  }
}

function calculateCosts(
  newState,
  currencies = newState.currencies,
  options = newState.options
) {
  const previousValues = deepClone(currencies);
  const changes = [];

  for (const costSlug in currencies) {
    if (newState.currencySettings[costSlug].start === undefined)
      currencies[costSlug] = 0;
    else currencies[costSlug] = newState.currencySettings[costSlug].start;
  }

  for (const optionKey in options) {
    const option = options[optionKey];
    if (
      (option.cost === undefined && option.currencies === undefined) ||
      option.disabled ||
      !isSelected(option, newState.options)
    )
      continue;

    if (option.cost !== undefined) {
      if (option.type === optionTypes.INTEGER) {
        applyCost(
          option.cost,
          currencies,
          getSelectedValue(option, newState.options)
        );
      }
    }

    // if (option.type === optionTypes.SLIDER) {
    //   applyCost(option.cost, costs, getSelectedValue(option, allOptions));
    // }

    // if (option.type === optionTypes.INSTANCER) {
    //   const keys = Object.keys(getSelectedValue(option, allOptions));
    //   applyCost(option.cost, costs, keys.length);
    // }

    if (option.currencies !== undefined) {
      const subOptions = {};
      for (const optionKey in newState.options) {
        if (optionKey.startsWith(option.optionKey + '/')) {
          subOptions[optionKey] = newState.options[optionKey];
        }
      }
      changes.push(...calculateCosts(newState, option.currencies, subOptions));
    }
  }

  for (const costSlug in currencies) {
    if (currencies[costSlug] !== previousValues[costSlug]) {
      changes.push('currency.' + costSlug);
    }
  }

  return changes;
}

export default calculateCosts;
