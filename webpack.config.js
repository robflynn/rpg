const path = require('path')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');


let baseConfig = {
  module: {},
}

let aliases = {
  '@data': resolve('./data'),
  "@engine": resolve("./src/lib/engine")
}

let gameBundle = Object.assign({}, baseConfig, {
  name: 'game',
  entry: './src/editor.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      ...aliases
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.png?$/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html'
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'data/maps', to: 'data/maps' },
        { from: 'data/sprites', to: 'data/sprites' },
        { from: 'data/music', to: 'data/music' },
      ]
    })
  ]
})

let editorBundle = Object.assign({}, baseConfig, {
  name: 'editor',
  entry: './src/editor.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
    alias: {
      ...aliases
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'editor.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.png?$/,
        loader: 'url-loader'
      },
      {
        test: /(\.css$|\.scss$)/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/lib/patd/editor/styles/global.scss'
              ]
            }
          }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/editor.html',
      filename: 'editor.html'
    }),

    new VueLoaderPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'data/maps', to: 'data/maps' },
        { from: 'data/sprites', to: 'data/sprites' },
      ]
    })
  ]
})

module.exports = [
  gameBundle,
//  editorBundle
]
