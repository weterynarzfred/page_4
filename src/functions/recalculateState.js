import { recalculateUserFunctions } from '../include/userFunctions';
import calculateCosts from './calculateCosts';

/**
 * Handles all changes to the state that are a result of options being selected.
 */
function recalculateState(stateDraft, changes, forceRecalculate) {
  const topLevelOptions = {};
  for (const optionKey of Object.keys(stateDraft.options)) {
    if (optionKey.match('/') !== null) continue;
    topLevelOptions[optionKey] = stateDraft.options[optionKey];
  }

  let i = 0;
  while (i < 50 && (changes.length > 0 || (i === 0 && forceRecalculate))) {
    recalculateUserFunctions(stateDraft, changes, forceRecalculate);
    changes = calculateCosts({
      state: stateDraft,
      options: topLevelOptions,
      reset: true,
      calcChanges: true,
      optionChanges: changes,
    });
    changes = [...new Set(changes)];
    i++;
  }
}

export default recalculateState;
