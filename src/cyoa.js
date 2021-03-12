import _ from 'lodash';
import getSelected from './functions/getSelected';
import { optionTypes } from './include/enum';

const settings = {};

const options = {
  main: {
    title: 'Main',
    type: optionTypes.GROUP,
    options: {
      yourName: {
        title: 'Your Name',
        type: optionTypes.TEXT,
      },
      beAGirl: {
        title: 'Be a Girl',
        type: optionTypes.INTEGER,
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
        default: 'Race',
      },
      magic: {
        title: 'Magic',
        type: optionTypes.INTEGER,
      },
    },
  },
  worlds: {
    title: 'Worlds',
    type: optionTypes.INSTANCER,
  },
};

export { options, settings };
