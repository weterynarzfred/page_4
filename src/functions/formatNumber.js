/**
 * formats a number to be displayed with a certain number of non-zero digits.
 */
function formatNumber(number, maxLength, options = {}) {
  if (isNaN(number)) number = 0;
  if (options.usePercent) number *= 100;

  let result = '';
  let length = Math.floor(Math.log10(number) + 1);
  length = Math.max(maxLength - length, 0);
  if (length >= 100) result = number;
  else {
    result = number.toFixed(length);
    if (result.search(/\./) > -1) {
      result = result.replace(/\.?0*$/, '');
    }
  }

  if (options.usePercent) result += '%';
  return result;
}

export default formatNumber;
