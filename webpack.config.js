const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, './dist'),
  assets: path.join(__dirname, './public/assets'),
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.tsx'],
  },
  output: {
    filename: `[name].js`,
    path: PATHS.dist,
    assetModuleFilename: 'static/[name][hash][ext]',
  },
  resolve: {
    extensions: [
      '.png',
      '.svg',
      '.jpeg',
      '.jpg',
      '.json',
      '.html',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    alias: {
      '@images': `${PATHS.assets}`,
    },
  },
  devServer: {
    port: 8081,
    static: PATHS.src,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      //logging: 'none'
    },
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new HtmlMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Webpack',
      template: '../public/index.html',
      favicon: '../public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['img', 'svg', 'fonts'].map(folder => {
        return {
          context: `${PATHS.assets}`,
          from: folder,
          to: `${PATHS.dist}/static/`,
          noErrorOnMissing: true,
        };
      }),
    }),
  ].concat(
    devMode
      ? new ESLintPlugin()
      : [
          new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['mozjpeg', { quality: 100 }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          }),
        ]
  ),
  module: {
    rules: [
      {
        test: /.(png|gif|jpe?g|ico|webp|svg|ttf|woff|woff2|otf|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
        },
      },
    ],
  },
};
