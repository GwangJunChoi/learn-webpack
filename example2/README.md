# Libraries Code Splitting
>#### 라이브러리 && 플러그인 설치
```
npm install webpack --save-dev
npm install moment lodash --save
npm i webpack-manifest-plugin --save-dev
```
[Moment.js 공식](https://momentjs.com/)
[Lodash.js 공식](https://lodash.com/)
>#### package.json 생성
```
npm init -y
```

>#### commonchunk
* webpack version 4
```
//webpack.config.js
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
}
```
* version 3
```
//webpack.config.js
// 1
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor' // Specify the common bundle's name.
  }),
]

// 2
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'] // Extract the webpack bootstrap logic into manifest.js
  }),
]

// 3
new ManifestPlugin({
  fileName: 'manifest.json',
  basePath: './dist/'
})
```

