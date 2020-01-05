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