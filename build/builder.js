#!/usr/bin/env node
'use strict'

const path = require('path')
const pkg = require('../package')
const fs = require('fs-extra')
const sass = require('node-sass')
const clean = require('./cleaner')

let bundleSassFile = (inFile, outFile, callback) => {
  sass.render({
    file: inFile,
    includePaths: [
      path.join(__dirname, '..', 'node_modules')
    ],
    outFile: outFile,
    sourceMap: true,
    outputStyle: 'compressed'

  }, (err, result) => {
    if (err) {
      process.stderr.write(`\nError: ${err.file}:${err.line}:${err.column} ${err.message}\n`)
      callback('error')
      return
    }

    fs.writeFileSync(outFile, result.css)
    fs.writeFileSync(`${outFile}.map`, result.map)
    callback()
  })
}

let bundleSass = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('Bundling Sass… ')

    bundleSassFile(`./assets/scss/${pkg.name}.scss`, `./dist/css/${pkg.name}.css`, (err) => {
      if (err) {
        reject('error')
        return
      }
      process.stdout.write('done.\n')
      resolve('done')
    })
  })
}

module.exports.build = () => {
  return new Promise((resolve, reject) => {
    console.log(pkg.name)
    clean().then(bundleSass).then(() => {
      resolve('done')
    })
  })
}
