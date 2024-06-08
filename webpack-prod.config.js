const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    appts: './src/App/Application.ts',
    scripts: './src/js/scripts.js',
    scoring: './src/App/ScoringMachine.ts',
    styles: [
      path.resolve(__dirname, './src/sass/styles.scss'),
    ]
  },
  //devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../bbva_spark_form_2022/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            {
                loader: 'file-loader',
                options: { outputPath: '../../bbva_spark_form_2022/css/', name: '[name].min.css'}
            },
            'css-loader'
        ]
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: 'file-loader',
                options: { outputPath: '../css/', name: '[name].min.css'}
            },
            'sass-loader'
        ]
      }
    ]
  },
  plugins: [

    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../src/assets',
          to: '../../bbva_spark_form_2022/assets',
          context: "src/",
        },
        // {
        //   from: '../src/index.html',
        //   to: '../',
        //   context: "src/",
        // },
        {
          from: '../src/js/lib',
          to: '../../bbva_spark_form_2022/js/lib',
          context: "src/",
        },
        {
          from: '../src/fonts',
          to: '../../bbva_spark_form_2022/fonts',
          context: "src/",
        }

      ]
    })
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;