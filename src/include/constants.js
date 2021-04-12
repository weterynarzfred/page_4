const optionTypes = {
  INTEGER: 'integer',
  TEXT: 'text',
  SLIDER: 'slider',
  SELECT: 'select',
  RATIO: 'ratio',
  INSTANCER: 'instancer',
  GROUP: 'group',
};

const actions = {
  SELECT_OPTION: 'SELECT_OPTION',
  CHANGE_PATH: 'CHANGE_PATH',
  RESTART: 'RESTART',
};

const dataTypes = {
  USER_TEXT: 'USER_TEXT',
};

const callables = {
  title: '',
  text: '',
  cost: {},
  min: 0,
  disabled: false,
  hidden: false,
};

const ratioWeightAttributes = {
  logSlider: 5,
  sliderAttributes: {
    step: 0.01,
    marks: {
      0: '0',
      0.1: '10^-5',
      0.251188643150958: '0.001',
      0.3981071705534972: '0.01',
      0.5492802716530588: '0.05',
      0.6309573444801932: '0.1',
      0.757858283255199: '0.25',
      0.8705505632961241: '0.5',
      1: '1',
    },
  },
};

export { optionTypes, actions, dataTypes, callables, ratioWeightAttributes };
