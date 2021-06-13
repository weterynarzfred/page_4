const { resolve } = require('path');

module.exports = function override(config) {
  // switch to example if content is not provided
  config.resolve.modules.push('src/content', 'src/example');

  // resize and convert images
  if (process.env.NODE_ENV === 'production') {
    config.module.rules[1].oneOf.splice(
      1,
      1,
      {
        test: /\.(bmp|jpe?g|gif|png)$/i,
        resourceQuery: /large/,
        use: [
          {
            loader: 'file-loader',
            options: config.module.rules[1].oneOf[1].options,
          },
          {
            loader: 'webpack-image-resize-loader',
            options: {
              width: 1600,
              height: 1600,
              fit: 'inside',
              format: 'webp',
            },
          },
        ],
      },
      {
        test: /\.(bmp|jpe?g|gif|png)$/i,
        include: resolve(__dirname, './src/content/media/containers'),
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
        include: resolve(__dirname, './src/content/media/general'),
        use: [
          {
            loader: 'file-loader',
            options: config.module.rules[1].oneOf[1].options,
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
  }

  // disable manifest
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ManifestPlugin'
  );

  return config;
};
