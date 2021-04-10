function isDisabled(option) {
  if (option.requirements === undefined) return false;
  for (const test of option.requirements) if (!test) return true;
  return false;
}

export default isDisabled;
