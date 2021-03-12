import _ from 'lodash';
import getSelected from './functions/getSelected';
import { optionTypes } from './include/enum';

const settings = {
  currencies: {
    gold: {
      title: 'Gold',
    },
    magic: {
      title: 'Magic',
      start: 10,
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
 * cost - object with costs of each option instance
 *
 * if type === optionTypes.GROUP
 * options - suboptions of the group, same rules apply as for any other option
 *
 * if type === optionTypes.INSTANCER
 * instanceOptions - suboptions of each of the created instances, same rules apply as for any other option
 */

const options = {
  test: {
    title: 'Test',
    type: optionTypes.INTEGER,
    selected: 5,
    cost: {
      gold: 1,
    },
  },
  main: {
    title: 'Main',
    type: optionTypes.GROUP,
    options: {
      yourName: {
        title: 'Your Name',
        type: optionTypes.TEXT,
      },
      beAGirl: state => {
        return {
          title: `Be a Girl ${getSelected('main.yourName', state.options)}`,
          type: optionTypes.INTEGER,
        };
      },
    },
  },
  function: state => {
    return {
      title: `Function ${getSelected('main.yourName', state.options)}`,
      type: optionTypes.TEXT,
    };
  },
  friendlyRaces: state => {
    const choices = {};
    const races = getSelected('races', state.options);
    for (const raceSlug in races) {
      if (isNaN(raceSlug)) continue;
      choices[raceSlug] = {
        title: getSelected(`races.${raceSlug}.name`, state.options),
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
