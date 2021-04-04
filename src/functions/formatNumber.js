function formatNumber(number, maxLength) {
  let length = Math.floor(Math.log10(number) + 1);
  length = Math.max(maxLength - length, 0);
  if (length >= 100) return number;
  return number.toFixed(length);
}

export default formatNumber;
