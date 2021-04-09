function parsePath(path, option) {
  if (option === undefined) return undefined;

  path = path.replace('CURRENT_KEY', option.optionKey);
  path = path.replace('CURRENT_SLUG', option.slug);
  while (path.match(/\.\./) !== null)
    path = path.replaceAll(/\/?[^\/]+\/\.\./g, '');
  return path;
}

export default parsePath;
