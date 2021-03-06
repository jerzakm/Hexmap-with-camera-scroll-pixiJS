const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js"
    },
    //devtool: "none",
    devServer: {
       contentBase: '.',
       hot: true
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "docs")
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}