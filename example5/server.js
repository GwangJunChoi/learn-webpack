var express = require("express");//express 라이브러리 호출
var app = express();//express 객체 생성
var path = require("path");//path 라이브러리

// #1
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);

// #2 
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    lazy: true// 클라이언트가 서버 요청시 번들링 (번들링 시점 변경 )
  })
);

app.use(express.static(__dirname));//express 파일 설정 작업

// view engine setup
// __dirname : root folder
app.set("views", path.join(__dirname));
app.set("view engine", "ejs");//ejs 템플릿 엔진
app.engine("html", require("ejs").renderFile);

app.get("/", function(req, res) {
  res.send("index");
});

app.listen(3000);
console.log("Server running on port 3000");
