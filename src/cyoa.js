import getSelected from './functions/getSelected';
import { optionTypes } from './include/enum';

const settings = {};

const options = {
  function: () => {
    return {
      title: `Function ${getSelected('main/yourName') || ''}`,
      type: optionTypes.TEXT,
    };
  },
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
  firendlyRaces: selected => {
    const choices = {};
    for (const slug in selected.races) {
      if (isNaN(slug)) continue;
      choices[slug] = {
        title: getSelected(selected.races[slug].options.name),
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
