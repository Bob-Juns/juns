require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const middleware = require('webpack-dev-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProductionMode ? 'eval' : 'inline-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@assets': path.join(__dirname, 'src', 'assets'),
      '@components': path.join(__dirname, 'src', 'components'),
      '@pages': path.join(__dirname, 'src', 'pages'),
      store: path.join(__dirname, 'src', 'redux', 'store'),
      '@utils': path.join(__dirname, 'src', 'utils'),
    },
  },
  entry: {
    main: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: '/node_modules/',
        use: ['ts-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.KAKAO_JS_KEY': JSON.stringify(process.env.KAKAO_JS_KEY),
      'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(
        process.env.GOOGLE_CLIENT_ID,
      ),
      'process.env.GOOGLE_CLIENT_SECRET': JSON.stringify(
        process.env.GOOGLE_CLIENT_SECRET,
      ),
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
