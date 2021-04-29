const { resolve } = require('path');
const path = require('path');

module.exports = function override(config, env) {
  Object.assign(config.resolve.alias, {
    Src: path.resolve(__dirname, 'src/'),
    Components: path.resolve(__dirname, 'src/components/'),
    Functions: path.resolve(__dirname, 'src/functions/'),
    Include: path.resolve(__dirname, 'src/include/'),
  });

  config.resolve.modules.push('src/content', 'src/example');

  config.module.rules[1].oneOf.splice(
    1,
    1,
    {
      test: /\.(bmp|jpe?g|gif|png)$/i,
      include: resolve(__dirname, './src/media/containers'),
      use: [
        {
          loader: 'file-loader',
          options: config.module.rules[1].oneOf[1].options,
        },
        {
          loader: 'webpack-image-resize-loader',
          options: {
            width: 878,
            height: 290,
            format: 'webp',
          },
        },
      ],
    },
    {
      test: /\.(bmp|jpe?g|gif|png)$/i,
      use: [
        {
          loader: 'file-loader',
          options: config.module.rules[1].oneOf[1].options,
        },
        {
          loader: 'webpack-image-resize-loader',
          options: {
            width: 190,
            height: 308,
            format: 'webp',
          },
        },
      ],
    }
  );

  config.module.rules[1].oneOf.splice(-1, 0, {
    test: /_redirects/,
    loader: 'file-loader',
    options: { name: '[name]' },
  });

  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ManifestPlugin'
  );

  return config;
};
