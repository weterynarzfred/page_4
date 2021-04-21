import parsePath from '../functions/parsePath';
import { optionTypes } from './constants';
import { addUserFunction } from './userFunctions';
import { addUserValue } from './userValues';
import { deepClone } from '../functions/deepFunctions';

const defaultProps = {
  type: optionTypes.INTEGER,
  title: '',
  displayTitle: undefined,
  text: '',
  min: 0,
  max: 1,
  instanceGroup: undefined,
  hidden: undefined,
  selected: undefined,
  cost: undefined,
  currencies: undefined,
  choices: undefined,
  requirements: undefined,
  image: undefined,
  imageNSFW: undefined,
  displayAsTable: undefined,
  sliderAttributes: undefined,
  useTooltips: undefined,
  logSlider: undefined,
  displayAsPercent: undefined,
  hiddenInParent: undefined,
};

/**
 * Assigns default prop values and moves function to the userFunctions array.
 */
function assignProps(option, rawOption, assign) {
  for (const prop in defaultProps) {
    option[prop] = rawOption[prop];

    if (option[prop] === undefined) {
      option[prop] = defaultProps[prop];
    } else if (option[prop].isUserFunction) {
      option[prop].subscribed = option[prop].subscribed.map(key =>
        parsePath(key, option)
      );
      addUserFunction(option[prop], option.optionKey, prop);
      option[prop] = defaultProps[prop];
    } else if (prop === 'instanceGroup') {
      addUserValue(option.instanceGroup, option.optionKey, 'instanceGroup');
    } else if (prop === 'requirements') {
      for (let index = 0; index < option.requirements.length; index++) {
        const identifier = 'requirements.' + index;
        addUserValue(
          option.requirements[index].text,
          option.optionKey,
          identifier
        );
        option.requirements[index].value.subscribed = option.requirements[
          index
        ].value.subscribed.map(key => parsePath(key, option));
        addUserFunction(
          option.requirements[index].value,
          option.optionKey,
          identifier
        );
        option.requirements[index] = false;
      }
    }
  }

  Object.assign(option, assign);
}

/**
 * Moves texts from the option to the UserValues array.
 */
function addUserValues(option) {
  if (option.title !== undefined) {
    addUserValue(option.title, option.optionKey, 'title');
    delete option.title;
  }

  if (option.text !== undefined) {
    addUserValue(option.text, option.optionKey, 'text');
    delete option.text;
  }

  if (option.displayTitle !== undefined) {
    addUserValue(option.displayTitle, option.optionKey, 'displayTitle');
    delete option.displayTitle;
  }
}

/**
 * Assigns default prop values in the option based on its type.
 */
function assignDefaults(option) {
  if (option.type === undefined) option.type = optionTypes.INTEGER;

  if (option.type === optionTypes.INTEGER) {
    if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;
    if (option.selected === undefined) option.selected = option.min;
  }

  if (option.type === optionTypes.INSTANCER) {
    if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;
    if (option.nextId === undefined) option.nextId = 0;
    if (option.selected === undefined) option.selected = [];
    if (option.instanceGroup === undefined) option.instanceGroup = {};
  }

  if (option.type === optionTypes.TEXT) {
    if (option.selected === undefined) option.selected = '';
  }
}

/**
 * Flattens the structure of options and sets default values.
 */
function parseOptions(rawOptions, parentPath = [], assign = {}) {
  const options = {};

  const currentAssign = deepClone(assign);

  for (const slug in rawOptions) {
    const rawOption = rawOptions[slug];
    const option = {};
    const fullPath = [...parentPath, slug];
    option.slug = slug;
    option.path = [...parentPath];
    option.optionKey = fullPath.join('/');

    assignProps(option, rawOption, deepClone(currentAssign));
    delete currentAssign.isInstance;

    // suboptions
    if (rawOption.options !== undefined) {
      option.subOptions = Object.keys(rawOption.options).map(slug =>
        [...fullPath, slug].join('/')
      );
      const subAssign = deepClone(currentAssign);
      if (
        [optionTypes.INTEGER, optionTypes.TEXT, optionTypes.SLIDER].includes(
          option.type
        )
      ) {
        subAssign.isSelectablesChild = true;
      }
      Object.assign(
        options,
        parseOptions(rawOption.options, fullPath, subAssign)
      );
    }

    // select choices
    if (
      option.type === optionTypes.SELECT &&
      rawOption.choices !== undefined &&
      !rawOption.choices.isUserFunction
    ) {
      const subAssign = deepClone(currentAssign);
      subAssign.isChoice = true;
      Object.assign(
        options,
        parseOptions(rawOption.choices, fullPath, subAssign)
      );
      option.choices = Object.keys(rawOption.choices).map(slug =>
        [...fullPath, slug].join('/')
      );
    }

    // ratio choices
    if (
      option.type === optionTypes.RATIO &&
      rawOption.choices !== undefined &&
      !rawOption.choices.isUserFunction
    ) {
      const subAssign = deepClone(currentAssign);
      subAssign.isRatioChoice = true;
      Object.assign(
        options,
        parseOptions(rawOption.choices, fullPath, subAssign)
      );
      option.choices = Object.keys(rawOption.choices).map(slug =>
        [...fullPath, slug].join('/')
      );
    }

    addUserValues(option);
    assignDefaults(option);
    options[option.optionKey] = option;
  }

  return options;
}

export default parseOptions;
