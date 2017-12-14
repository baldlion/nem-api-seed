const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ShellPlugin = require('webpack-shell-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    api: './src/index'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new ShellPlugin({onBuildEnd: ['nodemon dist/api.bundle.js --watch dist']})
  ]
}
