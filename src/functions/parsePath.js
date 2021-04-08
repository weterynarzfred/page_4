function parsePath(path, currentKey) {
  path = path.replace('CURRENT_KEY', currentKey);
  while (path.match(/\.\./) !== null)
    path = path.replaceAll(/\/?[^\/]+\/\.\./g, '');
  return path;
}

export default parsePath;
