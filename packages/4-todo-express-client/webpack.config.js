const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { isTestEnv } = require('./utils/cmdUtils.js');

const devTool = isTestEnv() ? 'eval' : 'source-map';

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../express-server/public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    proxy: {
      '/': 'http://localhost:8000',
    },
  },
  devtool: devTool,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
