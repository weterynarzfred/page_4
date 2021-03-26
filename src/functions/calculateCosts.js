import { optionTypes } from 'Include/enum';
import { getSelectedValue, isSelected } from './getSelectedValue';

function applyCost(cost, costs, count) {
  if (cost === undefined) return;
  for (const costSlug in cost) {
    if (costs[costSlug] !== undefined) {
      costs[costSlug].value -= cost[costSlug] * count;
    }
  }
}

function calculateCosts(options, costs, reset, allOptions = options) {
  if (reset) {
    for (const costSlug in costs) {
      if (costs[costSlug].start === undefined) costs[costSlug].value = 0;
      else costs[costSlug].value = costs[costSlug].start;
    }
  }

  for (const slug in options) {
    if (slug === 'nextId') continue;

    const option = options[slug];
    if (!isSelected(option, allOptions)) continue;

    if (option.type === optionTypes.INTEGER) {
      applyCost(option.cost, costs, getSelectedValue(option, allOptions));
    }

    if (option.type === optionTypes.INSTANCER) {
      const keys = Object.keys(getSelectedValue(option, allOptions));
      applyCost(option.cost, costs, keys.length);
    }

    if (option.options !== undefined) {
      calculateCosts(option.options, costs, false, allOptions);
    }

    if (option.type === optionTypes.INSTANCER) {
      calculateCosts(option.selected, costs, false, allOptions);
    }

    if (option.type === optionTypes.SELECT) {
      calculateCosts(option.choices, costs, false, allOptions);
    }

    if (option.currencies !== undefined) {
      calculateCosts(option.options, option.currencies, true, allOptions);
    }
  }
}

export default calculateCosts;
