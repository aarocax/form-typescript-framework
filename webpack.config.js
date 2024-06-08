const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    appts: './src/App/Application.ts',
    scripts: './src/js/scripts.js',
    styles: [
      path.resolve(__dirname, '/src/sass/styles.scss'),
    ]
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            {
                loader: 'file-loader',
                options: { outputPath: '../css/', name: '[name].min.css'}
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

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets',
          to: '../assets',
          context: "src/",
        },
        {
          from: './index.html',
          to: '../',
          context: "src/",
        },
        // {
        //   from: '../src/scoring.html',
        //   to: '../../bbva_spark_form_2022/',
        //   context: "src/",
        // },
        // {
        //   from: '../src/js/lib',
        //   to: '../../bbva_spark_form_2022/js/lib',
        //   context: "src/",
        // },
        {
          from: './fonts',
          to: '../fonts',
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