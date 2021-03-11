import { optionTypes } from './include/enum';

const settings = {};

const options = {
  function: (state, options) => {
    return {
      title: 'Function',
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
  firendlyRaces: {
    title: 'Friendly Races',
    type: optionTypes.SELECT,
    choices: {
      elves: {
        title: 'Elves',
      },
      dwarves: {
        title: 'Dwarves',
      },
      dryads: {
        title: 'Dryads',
      },
    },
  },
  races: {
    title: 'Races',
    type: optionTypes.INSTANCER,
    instanceOptions: {
      name: {
        title: 'Name',
        type: optionTypes.TEXT,
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
