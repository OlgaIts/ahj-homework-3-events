const path = require('path');
// Плагин для работы с html файлами
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Плагин для компиляции CSS в отдельные файлы
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Плагин для оптимизации изображений
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// Плагин для минификации JS
const TerserWebpackPlugin = require('terser-webpack-plugin');
// Плагин для минификации CSS
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const basePath = path.resolve(__dirname, 'src');
// переменные режима разработки для использования в оптимизации конфига
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// функция для настройки оптимизации для режима dev и prod
const optimization = () => {
  const config = {
    // настройка для исключения повторения кода подключаемых библиотек в бандле
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    // настройка оптимизации изображений и минификации кода при сборке
    config.minimizer = [
      // минификация js файлов + удаление комментариев
      new TerserWebpackPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      // минификация css файлов + удаление комментариев
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ];
  }

  return config;
};

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  devServer: {
    open: true,
    hot: true,
  },
  entry: path.resolve(basePath, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash:10].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:10].css',
    }),
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: path.join('fonts', '[name].[contenthash:10][ext]'),
        },
      },
      {
        test: /\.ico$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('img', '[name].[contenthash:10][ext]'),
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: path.join('images', '[name].[contenthash:10][ext]'),
        },
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                auto: (resPath) => !!resPath.includes('.module.'),
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
