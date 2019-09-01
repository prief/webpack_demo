const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWP = require('html-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index-server\.js/);
      const pageName = match && match[1];
      if(pageName){
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
          new HtmlWP({
            inlineSource: '.css$',
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['vendors', pageName],
            inject: true,
            minify: {
              html5: true,
              collapseWhitespace: true,
              preserveLineBreaks: false,
              minifyCSS: true,
              minifyJS: true,
              removeComments: false,
            },
          }),
        );
      }
      
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  mode: 'none',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-server.js',
    libraryTarget : 'umd'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      }, {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]_[hash:8].[ext]',
          },
        }],

      },
    ],
  },
  plugins: [
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ].concat(htmlWebpackPlugins),
  optimization: {
    // splitChunks: {
    //   minSize: 0,
    //   cacheGroups: {
    //     vendors: {
    //       test: /(react|react-dom)/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //     commons: {
    //       name: 'commons',
    //       chunks: 'all',
    //       minChunks: 3,
    //     },
    //   },
    // },
  },

};
