/* https://nordcloud.com/minimizing-aws-lambda-deployment-package-size-in-typescript/ */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
    mode: isLocal ? 'development' : 'production',
    optimization: {
        minimize: false,
    },
    devtool: isLocal ? 'source-map' : false,
    entry: slsw.lib.entries,
    target: 'node',
    resolve: {
        extensions: ['.mjs', '.ts', '.js'],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.build'),
        filename: '[name].js',
    },
    externals: [
        nodeExternals({
            allowlist: ['@nestjs/typeorm'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
};