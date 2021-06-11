/**
 * Replaces path constants and the parent directory symbol with their current
 * values.
 */
function parsePath(path, option) {
  if (option === undefined) return undefined;

  path = path.replace('CURRENT_KEY', option.optionKey);
  path = path.replace('CURRENT_SLUG', option.slug);
  path = path.replace('CURRENT_INSTANCE', () => {
    const path = option.optionKey.split('/').reverse();
    const result = [];
    while (path.length > 0) {
      result.push(path.pop());
      if (new RegExp(/^[0-9]*$/).test(result[result.length - 1])) break;
    }
    return result.join('/');
  });
  while (path.match(/\.\./) !== null)
    path = path.replaceAll(/\/?[^\/]+\/\.\./g, '');
  return path;
}

/**
 * Replaces path constants and the parent directory symbol in an array of paths
 * with their current values.
 */
function parsePaths(paths, option) {
  for (let i = 0; i < paths.length; i++) {
    paths[i] = parsePath(paths[i], option);
  }
}

export default parsePath;
export { parsePaths };
