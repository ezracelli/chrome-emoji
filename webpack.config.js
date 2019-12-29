const path = require('path');

const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: argv.production ? 'production' : 'development',
    devtool: 'source-map',
    entry: './extension/src/main.js',
    output: {
        path: path.resolve(__dirname, 'extension/public'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    argv.production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: 'url\\(',
                            flags: 'g',
                            replace: '$&chrome-extension://__MSG_@@extension_id__/public/',
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
        }),
    ],
};
