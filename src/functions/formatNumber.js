/**
 * formats a number to be displayed with a certain number of non-zero digits.
 */
function formatNumber(number, maxLength) {
  let length = Math.floor(Math.log10(number) + 1);
  length = Math.max(maxLength - length, 0);
  if (length >= 100) return number;
  let string = number.toFixed(length);
  if (string.search(/\./) > -1) {
    return string.replace(/\.?0*$/, '');
  }
  return string;
}

export default formatNumber;
