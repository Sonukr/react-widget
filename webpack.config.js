const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const increaseSpecificity = require('postcss-increase-specificity');
const JavaScriptObfuscator = require('webpack-obfuscator');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

const viewDir = path.join(__dirname, './src/view');
const buildDir = path.join(__dirname, 'build');

const defaultConfig = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: viewDir,
    port: 3003,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new CopyPlugin([
      { from: './src/view', to: '.' },
    ]),
    devMode ? null : new JavaScriptObfuscator(),
  ].filter(i => i),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      
      {
        test: /\.(scss|css)$/,
        use: [
          // fallback to style-loader in development
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'cssimportant-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                increaseSpecificity({
                  stackableRoot: '.sWidget',
                  repeat: 1,
                }),
              ],
              sourceMap: devMode,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = [{
  ...defaultConfig,
  entry: './src/feature/widget_init',
  output: {
    path: buildDir,
    publicPath: '/',
    filename: 'widget.js',
    library: 'WidgetAutoInit',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
}, 
{
  ...defaultConfig,
  entry: './src/feature/widget_non_init',
  output: {
    path: buildDir,
    publicPath: '/',
    filename: 'widget_nonInit.js',
    library: 'WidgetInit',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
}];
