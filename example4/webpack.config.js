var path = require('path');

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist" //devServer 에도 동일한 경로를 지어
  },
  devtool: "cheap-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    publicPath: "/dist/", // 절대 경로 앞뒤 `/`
    compress: true,
    port: 9000
  }
};