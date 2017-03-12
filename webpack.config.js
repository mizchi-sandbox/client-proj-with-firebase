/* eslint-disable */

const path = require('path')
const webpack = require('webpack')
const AsyncAwaitPlugin = require('webpack-async-await')
const LicenseWebpackPlugin = require('license-webpack-plugin')

const BASE_PLUGINS = [
  new AsyncAwaitPlugin({}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

module.exports = {
  entry: process.env.NODE_ENV === 'production'
  ? [
    './src/main.js'
  ]
  : [
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 3355
  },
  plugins: process.env.NODE_ENV === 'production'
  ? BASE_PLUGINS.concat([
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new LicenseWebpackPlugin({
      pattern: /^(.*)$/,
      filename: 'licenses.txt'
    })
  ])
  : BASE_PLUGINS.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          'postcss-loader?sourceMap=inline'
        ]
      }
    ]
  }
}
