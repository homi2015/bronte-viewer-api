/* global __dirname, require, module */

const { optimize: { UglifyJsPlugin } } = require('webpack');
const path = require('path');
const { argv: { env } } = require('yargs'); // use --env with webpack 2

const config = [
  {
    // cdp-plugin-api (everything)
    ...commonConfig({
      entry: `${__dirname}/src/index.js`,
      outputFile: 'cdp-bronte-viewer-api',
      moduleName: 'cdp-bronte-viewer-api',
    }),
  },
  {
    // cdp (client library)
    ...commonConfig({
      entry: `${__dirname}/src/api/CDP.js`,
      outputFile: 'cdp',
      moduleName: 'CDP',
    }),
  },
];

function commonConfig({ entry, outputFile, moduleName }) {
  const plugins = [];
  let outputFileName;

  if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFileName = `${outputFile}.min.js`;
  } else {
    outputFileName = `${outputFile}.js`;
  }

  return {
    entry,
    devtool: 'source-map',
    output: {
      path: `${__dirname}/lib`,
      filename: outputFileName,
      library: moduleName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
        },
        {
          test: /(\.js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js'],
    },
    plugins,
  };
}

module.exports = config;
