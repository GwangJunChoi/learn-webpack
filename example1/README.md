Example 1 - CSS Code Splitting
* npm init -y
* npm i css-loader style-loader --save-dev
* npm i extract-text-webpack-plugin --save-dev

>##### index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CSS & Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>CSS Code Splitting</h3>
    </header>
    <div>
      <p>
        This text should be colored with blue after injecting CSS bundle
      </p>
    </div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```
>##### base.css
```
p {
  color : blue;
}
```
>##### app/index.js
```
import "../base.css";
```
>##### webpack cli
```
webpack
```