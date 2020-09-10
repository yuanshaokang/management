'use strict'

// require('./check-versions')()

// require('shelljs/global')

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
var util=require("./utils")

const spinner = ora('building for production...')
spinner.start()

var _env=util.getEnv();
var assetsPath = path.join(config[_env].assetsRoot, config[_env].assetsSubDirectory)

rm(assetsPath, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    // cp(path.resolve(__dirname, '../MP_verify_Vkn6ZE0FssMvh1lj.txt'), path.resolve(__dirname, '../dist/MP_verify_Vkn6ZE0FssMvh1lj.txt'))
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
