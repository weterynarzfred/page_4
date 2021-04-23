import { parsePaths } from '../functions/parsePath';
import { optionTypes } from './constants';
import { addUserFunction } from './userFunctions';
import { addUserValue } from './userValues';
import { deepClone } from '../functions/deepFunctions';

const optionProps = [
  'type',
  'title',
  'displayTitle',
  'text',
  'min',
  'max',
  'choices',
  'instanceGroup',
  'hidden',
  'selected',
  'cost',
  'currencies',
  'requirements',
  'image',
  'imageNSFW',
  'displayAsTable',
  'sliderAttributes',
  'logSlider',
  'displayAsPercent',
  'hiddenInParent',
  'classes',
];

const userValueProps = [
  'title',
  'displayTitle',
  'text',
  'instanceGroup',
  'requirements',
];

const defaultProps = {
  type: optionTypes.INTEGER,
  min: 0,
  max: 1,
};

/**
 * Moves texts and functions from requirements to user arrays.
 */
function parseRequirements(option) {
  for (let index = 0; index < option.requirements.length; index++) {
    const value = option.requirements[index].value;
    const identifier = 'requirements.' + index;

    parsePaths(value.subscribed, option);
    addUserValue(option.requirements[index].text, option.optionKey, identifier);
    addUserFunction(value, option.optionKey, identifier);

    option.requirements[index] = false;
  }
}

/**
 * Assigns raw prop values and moves user values to user arrays.
 */
function assignProps(option, rawOption, assign) {
  for (const prop of optionProps) {
    if (rawOption[prop] === undefined) continue;

    option[prop] = rawOption[prop];
    if (option[prop].isUserFunction) {
      parsePaths(option[prop].subscribed, option);
      addUserFunction(option[prop], option.optionKey, prop);
      delete option[prop];
    }
  }

  Object.assign(option, assign);

  for (const prop of userValueProps) {
    if (option[prop] === undefined) continue;
    if (prop === 'requirements') {
      parseRequirements(option);
      continue;
    }
    addUserValue(option[prop], option.optionKey, prop);
    delete option[prop];
  }
}

/**
 * Assigns default prop values to the option based on its type.
 */
function assignDefaults(option) {
  for (const prop in defaultProps) {
    if (option[prop] === undefined) option[prop] = defaultProps[prop];
  }

  if (option.max === Infinity) option.max = Number.MAX_SAFE_INTEGER;

  switch (option.type) {
    case optionTypes.INTEGER:
    case optionTypes.SLIDER:
      option.selected = option.selected ?? option.min;
      break;
    case optionTypes.INSTANCER:
      option.nextId = option.nextId ?? 0;
      option.selected = option.selected ?? [];
      option.instanceGroup = option.instanceGroup ?? {};
      break;
    case optionTypes.TEXT:
      option.selected = option.selected ?? '';
  }
}

/**
 * Parses suboptions and choices of the option
 */
function parseSuboptions(option, options, rawOption, prop, currentAssign) {
  if (rawOption[prop] === undefined || rawOption[prop].isUserFunction) return;

  const subAssign = deepClone(currentAssign);
  switch (option.type) {
    case optionTypes.INTEGER:
    case optionTypes.TEXT:
    case optionTypes.SLIDER:
      subAssign.isSelectablesChild = true;
      break;
    case optionTypes.SELECT:
      subAssign.isChoice = true;
      break;
    case optionTypes.RATIO:
      subAssign.isRatioChoice = true;
  }

  const parentPath = option.optionKey.split('/');
  const parsedOptions = parseOptions(rawOption[prop], parentPath, subAssign);
  Object.assign(options, parsedOptions);

  const subOptionKeys = Object.keys(rawOption[prop]).map(
    slug => option.optionKey + '/' + slug
  );
  option[prop] = subOptionKeys;
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
    assignDefaults(option);

    delete currentAssign.isInstance;
    parseSuboptions(option, options, rawOption, 'options', currentAssign);
    parseSuboptions(option, options, rawOption, 'choices', currentAssign);

    options[option.optionKey] = option;
  }

  return options;
}

export default parseOptions;
