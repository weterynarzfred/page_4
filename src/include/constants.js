const optionTypes = {
  INTEGER: 'integer',
  TEXT: 'text',
  SLIDER: 'slider',
  SELECT: 'select',
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

export { optionTypes, actions, dataTypes, callables };
