const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // Entry points for the main app and install logic
    entry: {
      main: './client/src/js/index.js',   // Corrected the path to the client/src folder
      install: './client/src/js/install.js' // Corrected the path to the client/src folder
    },
    // Output directory and filename structure
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Enable source maps for easier debugging
    devtool: 'source-map',
    plugins: [
      // HTML Plugin to inject the bundles into the HTML file
      new HtmlWebpackPlugin({
        template: './client/index.html',  // Corrected the path to the client/index.html
        title: 'JATE - Text Editor',
      }),

      // Webpack PWA Manifest to generate manifest.json file for the PWA
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'A Progressive Web App text editor',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        fingerprints: false, // Disabling hashing for filenames
        inject: true, // Automatically inject the manifest into the HTML
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'), // Corrected the path to the logo image
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes for different devices
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      // InjectManifest to inject the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',  // Custom service worker file
        swDest: 'src-sw.js',   // Destination for the service worker in the output folder
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
        // File loader for handling image files like PNG, SVG, JPG, etc.
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext][query]', // Path for the bundled images
          },
        },
      ],
    },
  };
};