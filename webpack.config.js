const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
    }
  }),
    new WebpackNotifierPlugin({excludeWarnings: true}),
    new ExtractTextPlugin('styles.css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: '!html-loader!./src/index.html'
  })
]

if (env !== 'development') {
    plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true, // eslint-disable-line camelcase
          drop_console: true, // eslint-disable-line camelcase
          drop_debugger: true // eslint-disable-line camelcase
      }
    })
  )
}

module.exports = {
    entry: {
      app: './src/index.js'
  },
    output: {
      path: path.resolve('./www'),
      filename: '[name].js',
      pathinfo: env === 'development'
  },
    devtool: env === 'development' ? 'eval' : 'sourcemap',
    plugins,
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.s?css/,
            use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
          ]
        })
        },
        {
            test: /\.(ttf|eot|swf|otf|jpe?g|png|gif|cur|ico|wav|woff2?|svg)$/i,
            loader: 'file-loader'
        },
        {
            test: /\.html$/,
            use: [
            {
                loader: 'ngtemplate-loader',
                options: {
                relativeTo: path.resolve('./src')
            }
            },
            'html-loader'
        ]
        }
    ]
  }
}
