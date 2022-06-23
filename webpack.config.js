const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    mode: "development",
    devtool: "eval-source-map",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "public"),
        // publicPath: "/public",
        filename: "index.bundle.js",
        assetModuleFilename: 'resource/[name][ext]',
        clean : true
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, "public")
        },
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        url: true,
                    }
                }],
            },
            {
                test: /\.(jpg|jpeg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: 'images/',
                        publicPath: 'images/'
                    },
                },
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'resource/images/[name][ext]'
                }
            },
            {
                test: /\.mp4$/,
                type: 'asset/resource',
                generator: {
                    filename: 'resource/videos/[name][ext]'
                }
            },
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: "resource/[name][ext]"
                }
            },
            {
                test: /\.(otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'resource/fonts/[name][hash][ext]'
                }
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html"
    }), new miniCssExtractPlugin({ filename: "main.css" })]
}

if (currentTask == 'build') {
    config.mode = "production";
    config.module.rules[2].use[0] = miniCssExtractPlugin.loader;
    config.plugins.push(new miniCssExtractPlugin({
        filename: "main.css",
    }));
}

module.exports = config;
