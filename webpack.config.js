module.exports = {
    mode:'development',
    entry: {
        viewer:"./src/index.ts",
    },
    devtool: "source-map",
    output: {
        path: __dirname + '/dist/',
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