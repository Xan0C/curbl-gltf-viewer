const path = require("path");

module.exports = {
    mode:'development',
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
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
        ]
    }
};