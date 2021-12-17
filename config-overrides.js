const { resolve } = require('path');

module.exports = function override(config) {
  // switch to example if content is not provided
  config.resolve.modules.push('src/content', 'src/example');

  const BASE64_MAX_SIZE = 1000;

  // resize and convert images
  if (process.env.NODE_ENV === 'production') {
    config.module.rules[0].oneOf.splice(
      1,
      1,
      {
        test: /\.(bmp|jpe?g|gif|png|webp)$/i,
        resourceQuery: /large/,
        exclude: resolve(__dirname, './src/content/media/general'),
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: BASE64_MAX_SIZE } },
        use: [
          {
            loader: 'webpack-image-resize-loader',
            options: {
              width: 1600,
              height: 1600,
              fit: 'inside',
              format: 'jpeg',
            },
          },
        ],
      },
      {
        test: /\.(bmp|jpe?g|gif|png|webp)$/i,
        include: resolve(__dirname, './src/content/media/containers'),
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: BASE64_MAX_SIZE } },
        use: [
          {
            loader: 'webpack-image-resize-loader',
            options: {
              width: 878,
              height: 290,
              format: 'jpeg',
            },
          },
        ],
      },
      {
        test: /\.(bmp|jpe?g|gif|png|webp)$/i,
        include: resolve(__dirname, './src/content/media/general'),
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: BASE64_MAX_SIZE } },
      },
      {
        test: /\.(bmp|jpe?g|gif|png|webp)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: BASE64_MAX_SIZE } },
        use: [
          {
            loader: 'webpack-image-resize-loader',
            options: {
              width: 190,
              height: 308,
              format: 'jpeg',
            },
          },
        ],
      },
    );
  }

  // disable manifest
  config.plugins = config.plugins.filter(
    plugin => plugin?.options?.fileName !== 'asset-manifest.json'
  );

  return config;
};
