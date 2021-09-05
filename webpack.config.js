/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/pages/index/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/static/index.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: ['dist'],
        port: 3000,
        client: {
            overlay: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: /src/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.app.json'
                        }
                    }
                ]
            },
            {
                test: /\.pcss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
};
