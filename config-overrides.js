const path = require('path');

module.exports = function override(config, env) {
  Object.assign(config.resolve.alias, {
    Src: path.resolve(__dirname, 'src/'),
    Components: path.resolve(__dirname, 'src/components/'),
    Functions: path.resolve(__dirname, 'src/functions/'),
    Include: path.resolve(__dirname, 'src/include/'),
  });
  return config;
};
