const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === "development";

// filename: "[name].[contenthash].css",
const extractSass = new MiniCssExtractPlugin({
    filename: isDevelopment ? "[name].css":"[name].[contenthash].css"
});

const plugins = [
    extractSass,
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
        }
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
];

// Use this if you dont want to use dev server
const watch = isDevelopment ? true : false;

const assetPublicPath = isDevelopment ? "" : "";

module.exports = env => {
    const isEs6 = env === "es6";
    let ENTRY_NAME = "main";
    let CONFIG_FILE = "tsconfig.json";
    let entries = ["regenerator-runtime","core-js","./src/app.ts"];

    if(isEs6){
        ENTRY_NAME = "main-es6";
        CONFIG_FILE = "tsconfig.es6.json";
        entries = ["./src/app.ts"];
    }

    return {
        plugins,

        devtool: "source-map",

        entry: {
            [ENTRY_NAME]:entries
        },

        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].min.js",
            library: "MyLib",
            libraryExport: "default"
        },

        resolve: {
            extensions: ['.ts', '.js', '.json']
        },

        mode : isDevelopment ? 'development':'production',
        stats: {
            errorDetails: true
        },

        module: {
            rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile:CONFIG_FILE
                }
            },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },

                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        publicPath: assetPublicPath
                    }
                },

                {
                    test: /\.(svg|jpg|jpeg|png|bmp)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        publicPath: assetPublicPath
                    }
                }
            ]
        },

        devServer :{
            compress:true,
            port:3000,
            hot:true
        }
    }
};
