const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './manifest.json'},
      {context: './public', from: '**/*'}
    ])
  ],
  performance: {
    hints: false // but really, I should look into why it's ~750kb
  }
};
