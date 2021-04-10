import { PERSIST } from 'redux-persist';
import { recalculateUserFunctions } from '../include/userFunctions';
import calculateCosts from './calculateCosts';

/**
 * Handles all changes to the state that are a result of options being selected.
 */
function recalculateState(stateDraft, changes, action) {
  console.time('recalculate');
  let i = 0;

  const topLevelOptions = {};
  for (const optionKey of Object.keys(stateDraft.options)) {
    if (optionKey.match('/') !== null) continue;
    topLevelOptions[optionKey] = stateDraft.options[optionKey];
  }

  while (
    i < 50 &&
    (changes.length > 0 || (i === 0 && action.type === PERSIST))
  ) {
    recalculateUserFunctions(stateDraft, changes, action.type === PERSIST);
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
  console.timeEnd('recalculate');
}

export default recalculateState;
