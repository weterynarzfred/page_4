import _ from 'lodash';
import calculateCosts from './functions/calculateCosts';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import { optionTypes } from './include/enum';
import { callUserFunction } from './include/userFunctions';

const settings = {
  currencies: {
    gold: {
      title: 'Gold',
      start: 100,
    },
    magic: {
      title: 'Magic',
    },
  },
};

/**
 * Each options can be an object or a function returning one. Function will receive the state as its argument. Each option object can have properties:
 * title - display name of the option
 * type - one of optionTypes
 * selected - initial value of the option
 *
 * if type !== optionTypes.GROUP
 * cost - object with costs of each time the option is bought
 *
 * if type === optionTypes.GROUP
 * options - suboptions of the group, same rules apply as for any other option
 *
 * if type === optionTypes.SELECT
 * choices - choices to select from, ech choice can have:
 *  title - display name of the choice
 *  cost - object with costs of the choice
 *
 * if type === optionTypes.INSTANCER
 * instanceOptions - suboptions of each of the created instances, same rules apply as for any other option
 */

const options = {
  testA: state => {
    callUserFunction(getOption('testB', state.options), state);
    return {
      title: `Test A - ${getSelected('testB', state.options)}`,
      type: optionTypes.INTEGER,
    };
  },
  testB: state => {
    const racesOption = getOption('friendlyRaces', state.options);
    callUserFunction(racesOption, state);
    const races = getSelected('friendlyRaces', state.options).map(
      selected => racesOption.choices[selected].title
    );
    return {
      title: `Test B - ${races.join(', ')}`,
      type: optionTypes.INTEGER,
    };
  },
  main: {
    title: 'Main',
    type: optionTypes.GROUP,
    currencies: {
      manliness: {
        title: 'Manliness',
      },
    },
    options: {
      yourName: {
        title: 'Your Name',
        type: optionTypes.TEXT,
      },
      beAGirl: state => {
        return {
          title: `Be a Girl ${getSelected('main.yourName', state.options)}`,
          type: optionTypes.INTEGER,
          cost: { gold: 2, manliness: -5 },
        };
      },
    },
  },
  function: state => {
    const main = getOption('main', state.options);
    calculateCosts(state.options, main.currencies, true);
    return {
      title: `Function ${main.currencies.manliness.value}`,
      type: optionTypes.TEXT,
    };
  },
  friendlyRaces: state => {
    const choices = {};
    const races = getSelected('races', state.options);
    for (const raceSlug in races) {
      if (isNaN(raceSlug)) continue;
      const magic = getSelected(`races.${raceSlug}.magic`, state.options);
      const name = getSelected(`races.${raceSlug}.name`, state.options);
      choices[raceSlug] = {
        title: name,
        cost: { gold: name.length, magic: -magic },
      };
    }
    return {
      title: 'Friendly Races',
      type: optionTypes.SELECT,
      choices,
    };
  },
  races: {
    title: 'Races',
    type: optionTypes.INSTANCER,
    instanceOptions: {
      name: {
        title: 'Name',
        type: optionTypes.TEXT,
        selected: 'Race',
      },
      magic: state => {
        return {
          title: `Magic ${getSelected('main.yourName', state.options)}`,
          type: optionTypes.INTEGER,
        };
      },
    },
  },
  worlds: {
    title: 'Worlds',
    type: optionTypes.INSTANCER,
    cost: {
      gold: 1,
    },
    instanceOptions: {
      a: {
        title: 'A',
        type: optionTypes.TEXT,
      },
      races: state => {
        const choices = {
          test: {
            title: 'Test',
          },
        };
        const races = getSelected('races', state.options);
        for (const raceSlug in races) {
          if (isNaN(raceSlug)) continue;
          choices[raceSlug] = {
            title: getSelected(`races.${raceSlug}.name`, state.options),
          };
        }
        return {
          title: 'Races',
          type: optionTypes.SELECT,
          choices,
        };
      },
    },
  },
};

export { options, settings };
