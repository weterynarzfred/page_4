import calculateOptionCosts from './calculateOptionCosts';
import { deepClone } from './deepFunctions';
import { isSelected } from './getSelectedValue';
import isDisabled from './isDisabled';

/**
 * Subtracts the cost from the currencies object count times.
 */
function applyCost(cost, currencies, count) {
  for (const costSlug in cost) {
    if (currencies[costSlug] === undefined) continue;
    currencies[costSlug] -= cost[costSlug] * count;
  }
}

/**
 * Resets all currency values to their initial state.
 */
function resetCurrencies(currencies, currencySettings) {
  for (const costSlug in currencies) {
    currencies[costSlug] = currencySettings[costSlug].start ?? 0;
  }
}

/**
 * Checks if the option with optionKey was updated.
 */
function wasOptionUpdated(optionKey, optionChanges) {
  return optionChanges.some(changedKey => changedKey.startsWith(optionKey));
}

/**
 * Checks if the lastCurrencyValue has a value for all currecies currently being
 * checked
 */
function isLastCurrencyValueDefined(lastCurrencyValues, currencies) {
  if (lastCurrencyValues === undefined) return false;
  for (const currencySlug in currencies) {
    if (lastCurrencyValues[currencySlug] === undefined) return false;
  }
  return true;
}

/**
 * Calculates costs of all changed options and saves the result in the
 * currencies object and each option's object. Options that do not need
 * recalculation are read from option's object last value.
 */
function calculateCosts({
  optionChanges,
  state,
  currencies = state.currencies,
  options = state.options,
  reset = false,
  calcChanges = false,
}) {
  const previousValues = calcChanges ? deepClone(currencies) : null;
  if (reset) resetCurrencies(currencies, state.currencySettings);
  const emptyCurrencies = deepClone(currencies);
  if (!reset) resetCurrencies(emptyCurrencies, state.currencySettings);

  const changes = [];
  for (const optionKey in options) {
    const option = options[optionKey];
    if (isDisabled(option) || !isSelected(option, state.options)) continue;
    if (
      !isLastCurrencyValueDefined(option.lastCurrencyValues, currencies) ||
      wasOptionUpdated(option.optionKey, optionChanges)
    ) {
      option.lastCurrencyValues = deepClone(emptyCurrencies);
      calculateOptionCosts(option, state, changes, optionChanges);
    }

    applyCost(option.lastCurrencyValues, currencies, -1);
  }

  if (calcChanges) {
    for (const costSlug in currencies) {
      if (currencies[costSlug] === previousValues[costSlug]) continue;
      changes.push('currency.' + costSlug);
    }
  }

  return changes;
}

export { applyCost };
export default calculateCosts;
