const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',  // Add source maps for easier debugging
    plugins: [
      // HTML Plugin to inject the bundles into the HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE - Text Editor',
      }),

      // Webpack PWA Manifest to generate manifest.json file
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'A Progressive Web App text editor',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      // Workbox InjectManifest plugin to inject the customer service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        // Babel loader to transpile ES6+ code into backwards-compatible JavaScript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'],
            },
          },
        },
        // CSS loader to bundle CSS files into JavaScript 
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // File loader for handling images 
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext][query]',
          },
        },
      ],
    },
  };
};