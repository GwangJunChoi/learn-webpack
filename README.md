# learn-webpack
webpack 강의 정리

# webpack 이란
* js, css, img와 같은 스태틱한 자원을 변환해주는 모듈 번들러

# 이유 & 배경
* 자바스크립트 code based Modules 관리
* 전역변수 충도르, 스크립트 로딩 순서, 복잡도에 따른 관리상의 문제

# webpack 설정

>##### webpack cli 설치
```
//g 옵션 - 전역 설정
npm i webpack-cli -g
```
>##### package.js 생성
```
npm init 
//default 정보를 가지고 package.js 생성
npm init -y
```
>##### lodash 라이브러리 설치
* 자바스크립트 라이브러리 세계적 공통 저장소
```
//프로제트 폴더
npm i lodash --save
```
>##### webpack bundle
```
webpack {번들링 대상 파일} {결과 파일}
//version 4.x
webpack app/index.js --output dist/bundle.js --mode development 
//version 3.X
webpack app/index.js dist/bundle.js
```
```
//webpack.config.js 
// `webpack` command will pick up this config setup by default
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

cli
webpack 입력
webpack.config.js  설정한 내용을 기반으로 번들파일 생성
```
# NPM Node Package Manager
* js 라이브러리들을 모아놓은 퍼블릭 저장소
* Gulp, Webpack 모두 node기반, NPM을 사용하여 필요 라이브러리 로딩
* 재사용 가능한 code를 module, package라고 호칭
* package.json 해당 package 에 대한 파일 정보가 들어있음
* keword로 패키지 검색 가능
* [npm공식 사이트](https://www.npmjs.com/)

>##### 명령어 모음
```
패키지 js 파일 생성
-y 기본값을 가진 패키지 js 파일 생성
npm init
npm init -y

npm install 패키지명 --save
npm i 패키지명 --save

전역설치
npm install 패키지명 --global
```
>##### --save && --save-dev
* --save 는 앱이 구동하기 위해 필요한 모듈 & 라이브러리 설치
  * ex) react, vue
```
//package.json
"dependencies" : {
    "vue": "^2.3.3"
},
```
* --save-dev 는 앱 개발시에 필요한 모듈 & 라이브러리 설치
   * ex) test, build tool, live reloading
```
//package.json
"devDependencies" : {
    "gulp": "^3.9.1"
},
```
# webpack Entry
* webpack 으로 묶은 모든 라이브러리들을 로딩할 시작점 설정
* 라이브러리를 모두 번들링한 bundle.js를 로딩
* 1개 또는 2개 이상 엔트리 포인트를 설정할 수 있다.
```
//webpack.config.js
var path = require("path");

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```
```
//webpack.config.js
var path = require("path");

module.exports = {
  entry: {
    index:  "./app/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```
```
//webpack.config.js
var path = require("path");

module.exports = {
  entry: ["./app/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```
>##### Entry 유형
```
var config = {
  //간단한 entry 설정
  entry: './path/to/my/entry/file.js'
  //앱 로직용, 외부 라이브러리용
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js',
  },
  //페이지당 불러오는 js 설정
  entry: {
    pageOne: './src/pageone/index.js',
    pageTwo: './src/pagetwo/index.js',
    pageThree: './src/pagethree/index.js',
  }
};
```
>##### output
* entry 에서 설정하고 묶은 파일의 결과값을 설정
```
var path = require("path");
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js',
  },
  output: {    
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
    //path: 'build',
    //filename: '[name].js' //지정한 entry 키의 이름에 맞춰서 설정
  }
};
```
* name - entry 명에 따른 output 파일명 생성
* hash - 특정 webpack build에 따른 output 파일명 생성
* chunkhash - 특정 webpack chunk에 따른 output 파일명 생성
```
output : {
  filename: '[name].js'
  filename: '[hash].js'
  filename: '[chunkhas].js'
}
```
```
output : {
  path: '/home/project/public/assets',
  publicPath: '/assets/'
}
```
```
output : {
  path: '/home/project/cdn/assets/[hash]',
  publicPath: 'http://cdn.ex.com/assets/[hash]'
}
```
>##### path.join() & path.resolve()

```
//path.join()
//해당 API가 동작되는 OS의 파일 구분자를 이용하여 팡리 위치를 조합한다.
path.join('/foo', 'bar', 'baz/asdf');
//result '/foo/bar/baz/asdf'
```
```
//path.resolve()
//오른쪽에서 왼쪽으로 파일 위치를 구성해가며 유효한 위치를 찾는다.
//값이 유효하지 않으면 현재 디렉토리가 사용 반환값은 항상 absolute URL
path.resolve('/foo/bar', './baz');
//result '/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/');
//result '/tmp/file'
path.resolve('wwwroot', 'static_files/png/' ,'../gif/image.gif');
//result '/home/myself/node/wwwroot/static_files/gif/image.gif'

```
[Node Path 공식 문서](https://nodejs.org/api/path.html)

# webpack Entry
* 자바스크립트 이외의 파일 형태의 웹 자원을 js로 변환하여 로딩(img, css, ...)
```
module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      //모든 css 파일에 style-loader, css-loader 사용 명시
      { test: /\.css$\, use: ['style-loader', 'css-loader'] }
    ]
  }
};

```
```
{
  test: /backbone/,
  use: [
    'expose-loader?Backbone',
    'imports-loader?_=underscore,jquery'
    //(1)jquery, (2) underscore 로딩
   ]
}
```
* [expose-loader 관련](https://www.npmjs.com/package/expose-loader)
* [imports-loader 관련](https://github.com/webpack-contrib/imports-loader)
* [webpack loaders 문서](https://webpack.js.org/concepts/loaders/)
>##### Babel Loader ES6
* preset: Babel 플러그인 리스트
* ES6 지원되지 않는 문법 트랜스 파일링
```
module: {
  rules: [{
    test: /\.js$/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['es2015', 'react', {modules: false}]//Tree Shaking: 사용되지 않는 모듈 미포함
        ]
      }
    }]
  }]
}
```
[Babel 공식](https://babeljs.io/)

# Plugin
* 플러그인은 파일별 커스텀 기능을 사용하기 위해서 사용
* JS minification, file extraction, alias
```
modules.export = {
  entry: {},
  output: {},
  module: {},
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```
* [webpack plugins](https://webpack.js.org/plugins/)

# webpack Resolve
* Webpack 의 모듈 번들링 관점에서 봤을 때, 모듈 간의 의존성을 고려하여 모듈을 로딩해야함
* 모듈을 어떤 위치에서 어떻게 로딩할지에 관해 정의를 하는 것이 바로  Module Resolution
```
//일만적인 모듈 로딩 방식
import foo from 'path/to/module'
//or
require('path/to/module');
```
>##### Resolve alias
* config 파일에 resolve를 추가하여 모듈 로딩에 관련된 옵션 사용
```
alias: {
  Utilities: path.resolve(_dirname, 'src/path/utilities/')
}
import Utility from '../../src/path/utilities/utility';
//use alias
import Utility from 'Utilities/utility';
```
>##### Resolve modules
* require() import '' 등의 모듈 로딩시에 어느 폴더를 기준할 것 인지 정하는 옵션
```
modules: ["node_modules"]//default
modules: [path.resolve(_dirname, 'src'), 'node_mudules']//src/node_modules
```
# webpack 빌드를 위한 개발 서버 구성
* webpack-dev-server : webpack자체에서 제공하는 개발 서버이고 빠른 리로딩 기능제공
* webpack-dev-middleware : 서버가 이미 구성된 경우에는 webpack을 미들웨어로 구성하여 서버와 연결

>##### webpack dev server
* 페이지 자동고침을 제공하는 webpack 개발용 node.js 서버

>##### webpack dev server 설치
```
npm install --save-dev webpack-dev-server
```

>##### webpack dev server 실행
```
webpack-dev-server --open
```
```
//package.json 아래 명령어 등록 간편실행
"script" : { "start": "webpack-dev-server" }
```
[DevServer 추가옵션](https://webpack.js.org/configuration/dev-server/)

>##### dev server option
* publicPath : webpack으로 번들한 파일들이 위치하는곳 default /
```
// 항상 `/` 를 앞뒤에 붙여야 한다.
publicPath: "/assets/"
```
* contentBase: 서버가 로딩할 static 파일 경로를 지정 default work directory
```
//절대 경로 사용
contentBase: path.join(_dirname, "public")
//비활성화
contentBase: false
```
* compress: gzip 앞축 방식을 이용하여 웹 자원의 사이즈를 줄인다.
```
compress: true
```
>##### webpack-dev-middleware
* 기존 구성 서버에 webpack에서 컴파일한 파일을 전달하는 middleware wrapper
* webpack 에 설정한 파일을 변경시, 파일에 직접 변경 내역을 저장하지 않고 메모리 공간을 활용
* 변경된 파일 내역을 파일 디렉토리 구조안에서는 확인 불가능

>##### webpack-dev-middleware 설치
* express nodejs 프레임워크
```
npm install --save-dev express webpack-dev-middleware
```
* 설치 후 webpac & webpack dev middle ware 등 로딩
```
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpac.config');
```
* webpackDevMiddleware 에 config 세팅 적용 및 번들링 파일 경로 지정
```
var app = express();
var compiler = webpack(webpackConfig);

app.user(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, //일반적으로 ouput 에 설정한 publicPath
  stats: { colors: true }// 번들링 시 webpack 로그 컬러 하이라이팅
  //lazy: true, //entry point 에 네트워크 요청이 있을 때만 컴파일을 다시한다.
}));

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
```