'use strict'
var webpack=require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
// const vuxLoader = require('vux-loader')
const vueLoaderConfig = require('./vue-loader.conf')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var _env=utils.getEnv()
var webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  plugins: [         
     new webpack.ProvidePlugin({                
      $:"jquery",                
      jQuery:"jquery",               
      "windows.jQuery":"jquery"      
    }) 
  ],
  output: {
    path: config[_env].assetsRoot,
    publicPath: config[_env].assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
         resolve('src'),
         resolve('test'),
         resolve('node_modules/vue-echarts'),
         resolve('node_modules/resize-detector')
       ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
module.exports = webpackConfig
