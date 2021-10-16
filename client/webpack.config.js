const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),

      new InjectManifest({
        swsrc: '/src-sw.js'
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        short_name: "Jate",
        name: "Jate Text Editor",
        icons: [
          {
            src: "/client/favicon.ico",
            sizes: "48x48",
            purpose: "any maskable"
          }
        ],
        orientation: "portrait",
        display: "standalone",
        start_url: "/",
        description: "Text Editor.",
        background_color: '#225ca3',
        theme_color: '#225ca3',
        }
        ),
     
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
