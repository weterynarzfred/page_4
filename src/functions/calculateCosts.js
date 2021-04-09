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

function calculateCosts({
  optionChanges,
  state,
  currencies = state.currencies,
  options = state.options,
  reset = false,
  calcChanges = false,
}) {
  const previousValues = deepClone(currencies);
  const changes = [];

  if (reset) {
    for (const costSlug in currencies) {
      if (state.currencySettings[costSlug].start === undefined)
        currencies[costSlug] = 0;
      else currencies[costSlug] = state.currencySettings[costSlug].start;
    }
  }

  const emptyCurrencies = deepClone(currencies);
  for (const costSlug in emptyCurrencies) {
    if (state.currencySettings[costSlug].start === undefined)
      emptyCurrencies[costSlug] = 0;
    else emptyCurrencies[costSlug] = state.currencySettings[costSlug].start;
  }

  for (const optionKey in options) {
    const option = options[optionKey];

    if (
      option.lastCurrencyValues === undefined ||
      optionChanges.some(changedKey => changedKey.startsWith(option.optionKey))
    ) {
      option.lastCurrencyValues = deepClone(emptyCurrencies);

      if (!option.disabled && isSelected(option, state.options)) {
        if (option.cost !== undefined) {
          if (option.type === optionTypes.INTEGER) {
            applyCost(
              option.cost,
              option.lastCurrencyValues,
              getSelectedValue(option, state.options)
            );
          }
        }

        if (option.subOptions !== undefined) {
          const subOptions = {};
          for (const optionKey of option.subOptions) {
            subOptions[optionKey] = state.options[optionKey];
          }
          changes.push(
            ...calculateCosts({
              state,
              currencies: option.lastCurrencyValues,
              options: subOptions,
              optionChanges,
            })
          );
        }

        if (option.choices !== undefined) {
          const subOptions = {};
          for (const optionKey of option.choices) {
            subOptions[optionKey] = state.options[optionKey];
          }
          changes.push(
            ...calculateCosts({
              state,
              currencies: option.lastCurrencyValues,
              options: subOptions,
              optionChanges,
            })
          );
        }

        if (
          option.type === optionTypes.INSTANCER &&
          option.selected !== undefined
        ) {
          const subOptions = {};
          for (const optionKey of option.selected) {
            subOptions[optionKey] = state.options[optionKey];
          }
          changes.push(
            ...calculateCosts({
              state,
              currencies: option.lastCurrencyValues,
              options: subOptions,
              optionChanges,
            })
          );
        }

        if (option.currencies !== undefined) {
          const subOptions = {};
          for (const optionKey in state.options) {
            if (optionKey.startsWith(option.optionKey + '/')) {
              subOptions[optionKey] = state.options[optionKey];
            }
          }
          changes.push(
            ...calculateCosts({
              state,
              currencies: option.currencies,
              options: subOptions,
              optionChanges,
              reset: true,
              calcChanges: true,
            })
          );
        }
      }
    }

    applyCost(option.lastCurrencyValues, currencies, -1);
  }

  if (calcChanges) {
    for (const costSlug in currencies) {
      if (currencies[costSlug] !== previousValues[costSlug]) {
        changes.push('currency.' + costSlug);
      }
    }
  }

  return changes;
}

export default calculateCosts;
