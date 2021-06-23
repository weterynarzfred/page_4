import { getUserValue } from '../include/userValues';

/**
 * Checks if option's requirements are met. If the secong parameter is provided
 * Also check options ancestors.
 */
function isDisabled(option, options) {
  if (option === undefined) return true;

  if (options !== undefined && option.path.length > 0) {
    if (isDisabled(options[option.path.join('/')], options)) return true;
  }

  const req = getUserValue(option.optionKey, 'requirements');
  if (req === undefined) return false;
  for (const test of req) if (!test.value) return true;
  return false;
}

export default isDisabled;
