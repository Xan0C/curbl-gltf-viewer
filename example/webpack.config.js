const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const  CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: {
        viewer:"./src/index.ts",
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, '/../dist/'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    keep_fnames: true
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test:  /\.worker\.(ts|js)x?$/,
                loader: 'worker-loader',
                options: { publicPath: '/dist/' }
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    plugins: [
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};