/**
 * @typedef {Object} options
 * @property {boolean} usePercent - displays the number as a percentage
 * @property {boolean} showSignificant - changes maxLength to be the number of significant digits
 * @property {boolean} useSpaces - adds spaces as thousand separators
 * 
 * formats a number to be displayed with a certain number of non-zero digits.
 * @param {number} number - number to be formatted
 * @param {number} maxLength - number of decimal digits
 * @param {options} options - additional options
 */
function formatNumber(number, maxLength, options = {}) {
  if (isNaN(number)) number = 0;
  if (options.usePercent) number *= 100;

  let result = '';

  if (options.showSignificant) {
    let length = Math.floor(Math.log10(number) + 1);
    length = maxLength - length;
    const roundNumber =
      Math.round(number * Math.pow(10, length)) / Math.pow(10, length);

    length = Math.max(length, 0);
    result = roundNumber.toFixed(length);
    if (result.search(/\./) > -1) {
      result = result.replace(/\.?0*$/, '');
    }
  } else {
    const roundNumber =
      Math.round(number * Math.pow(10, maxLength)) / Math.pow(10, maxLength);
    result = roundNumber.toString();
  }

  if (options.useSpaces) {
    const parts = result.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(160));
    result = parts.join(".");
  }

  if (options.usePercent) result += '%';
  return result;
}

export default formatNumber;
