import { optionTypes } from '../include/enum';
import getSelected from './getSelected';

function applyCost(cost, costs, count) {
  for (const costSlug in cost) {
    costs[costSlug].value -= cost[costSlug] * count;
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
    if (option.cost !== undefined) {
      if (option.type === optionTypes.INTEGER) {
        applyCost(option.cost, costs, getSelected(option, options));
      }
    }

    if (option.options !== undefined) {
      calculateCosts(option.options, costs);
    }

    if (option.type === optionTypes.INSTANCER) {
      calculateCosts(option.selected, costs);
    }
  }
}

export default calculateCosts;
