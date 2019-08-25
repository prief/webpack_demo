const path = require("path");
const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWP = require('html-webpack-plugin')
const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

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
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry,htmlWebpackPlugins} = setMPA()

module.exports = {
    mode:"development",
    entry,
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test:/.js$/,
                use:"babel-loader"
            },{
                test:/.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },{
                test:/.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test:/.(png|jpe?g|gif)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:10240000
                    }
                }]
                
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    devServer:{
        contentBase:"./dist",
        hot:true
    },
    devtool:"eval-source-map"
}