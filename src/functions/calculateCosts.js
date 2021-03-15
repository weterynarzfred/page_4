import { optionTypes } from '../include/enum';
import getSelected from './getSelected';

function applyCost(cost, costs, count) {
  if (cost === undefined) return;
  for (const costSlug in cost) {
    if (costs[costSlug] !== undefined) {
      costs[costSlug].value -= cost[costSlug] * count;
    }
  }
}

function calculateCosts(options, costs, reset) {
  if (reset) {
    for (const costSlug in costs) {
      if (costs[costSlug].start === undefined) costs[costSlug].value = 0;
      else costs[costSlug].value = costs[costSlug].start;
    }
  }

  for (const slug in options) {
    const option = options[slug];
    if (option.type === optionTypes.INTEGER) {
      applyCost(option.cost, costs, getSelected(option, options));
    } else if (option.type === optionTypes.SELECT) {
      getSelected(option, options).forEach(choice => {
        applyCost(option.choices[choice].cost, costs, 1);
      });
    } else if (option.type === optionTypes.INSTANCER) {
      const keys = Object.keys(getSelected(option, options)).filter(
        key => !isNaN(key)
      );
      applyCost(option.cost, costs, keys.length);
    }

    if (option.options !== undefined) {
      calculateCosts(option.options, costs);
    }

    if (option.type === optionTypes.INSTANCER) {
      calculateCosts(option.selected, costs);
    }

    if (option.currencies !== undefined) {
      calculateCosts(option.options, option.currencies, true);
    }
  }
}

export default calculateCosts;
