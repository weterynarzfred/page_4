import parsePath from '../functions/parsePath';
import { optionTypes } from './constants';
import { addUserFunction } from './userFunctions';
import { addUserText } from './userTexts';
import { deepClone } from '../functions/deepFunctions';

const defaultProps = {
  type: optionTypes.INTEGER,
  title: '',
  text: '',
  min: 0,
  max: 1,
  instanceGroup: {},
  hidden: undefined,
  selected: undefined,
  cost: undefined,
  currencies: undefined,
  choices: undefined,
  requirements: undefined,
  image: undefined,
  displayAsTable: undefined,
  sliderAttributes: undefined,
  useTooltips: undefined,
  logSlider: undefined,
  displayAsPercent: undefined,
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
    } else if (prop === 'requirements') {
      for (let index = 0; index < option.requirements.length; index++) {
        const identifier = 'requirements.' + index;
        addUserText(
          option.requirements[index].text,
          option.optionKey,
          identifier
        );
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
 * Moves texts from the option to the userTexts array.
 */
function addUserTexts(option) {
  if (option.title !== undefined) {
    addUserText(option.title, option.optionKey, 'title');
    delete option.title;
  }

  if (option.text !== undefined) {
    addUserText(option.text, option.optionKey, 'text');
    delete option.text;
  }
}

/**
 * Assigns default prop values in the option based on its type.
 */
function assignDefaults(option) {
  if (option.type === undefined) option.type = optionTypes.INTEGER;

  if (option.type === optionTypes.INTEGER) {
    if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;
    if (option.selected === undefined) option.selected = 0;
  }

  if (option.type === optionTypes.INSTANCER) {
    if (option.nextId === undefined) option.nextId = 0;
    if (option.selected === undefined) option.selected = [];
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
  if (currentAssign.numbering === undefined) currentAssign.numbering = [];
  currentAssign.numbering.push(0);

  for (const slug in rawOptions) {
    currentAssign.numbering[currentAssign.numbering.length - 1]++;

    const rawOption = rawOptions[slug];
    const option = {};
    const fullPath = [...parentPath, slug];
    option.slug = slug;
    option.path = [...parentPath];
    option.optionKey = fullPath.join('/');

    assignProps(option, rawOption, deepClone(currentAssign));

    // suboptions
    if (rawOption.options !== undefined) {
      option.subOptions = Object.keys(rawOption.options).map(slug =>
        [...fullPath, slug].join('/')
      );
      if (
        [optionTypes.INTEGER, optionTypes.TEXT, optionTypes.SLIDER].includes(
          option.type
        )
      )
        currentAssign.isSelectablesChild = true;
      Object.assign(
        options,
        parseOptions(rawOption.options, fullPath, currentAssign)
      );
    }

    // select choices
    if (
      option.type === optionTypes.SELECT &&
      rawOption.choices !== undefined &&
      !rawOption.choices.isUserFunction
    ) {
      currentAssign.isChoice = true;
      Object.assign(
        options,
        parseOptions(rawOption.choices, fullPath, currentAssign)
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
      currentAssign.isRatioChoice = true;
      Object.assign(
        options,
        parseOptions(rawOption.choices, fullPath, currentAssign)
      );
      option.choices = Object.keys(rawOption.choices).map(slug =>
        [...fullPath, slug].join('/')
      );
    }

    addUserTexts(option);
    assignDefaults(option);
    options[option.optionKey] = option;
  }

  return options;
}

export default parseOptions;
