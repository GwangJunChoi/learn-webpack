var webpack = require("webpack");
var ManifestPlugin = require('webpack-manifest-plugin');
var path = require("path");

module.exports = {
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"] //외부라이브러리
  },
  output: {
    filename: "[name].js", //main.js, vendor.js
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: './dist/'
    })
  ]
};
