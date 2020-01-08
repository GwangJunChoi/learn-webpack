var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',//번들링 시작점
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },//번들링 결과물 path && filename 설정
  module: {//번딜링시 관여되는 로더
    rules: [
      {
        test: /\.css$/,//파일대상
        use: [//사용되는 로더 오른쪽 부터 왼쪽 순
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        //node_modules 제외
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {//해당 파일 해석 옵션
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']//파일 확장자 해석 옵션
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true//오류 브라우져 화면단에 노출
  },
  performance: {//번들한 파일이 일정용량 이상시 경고 메세지
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
