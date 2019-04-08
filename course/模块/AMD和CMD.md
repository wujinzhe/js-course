# js的模块化

webpack的思想其实就是把所有的资源都当做模块的方式进行加载，webpack中文网的概念里面说到：  本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。我们在了解webpack之前先看看js的模块化到底是什么

##### script标签引入
	
  当某个模块较为庞大之后，会将该js独立成一个文件，然后单独标签引入html，而且这个标签引入模块的方式，暴露出来的方法或者是属性都是在全局作用域下的，当如果有第三方的其它库的变量和你写的模块中的变量或者属性重名之后，你的模块就很有可能失效了，文件的加载顺序是根据script的位置的决定的，所以当一个项目变动庞大之后，资源的管理和依赖管理是需要手动去解决的，导致大型项目难以维护
##### 模块化
  [为什么需要web模块](http://www.requirejs.cn/docs/why.html)
  
  js的模块一直都不是一个标准，所以列举了一些大家比较认可的模块化的库或者规范
  [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)，CMD， CommonJS，ES6 模块

> AMD (Asynchronous Module Definition)

requireJs 就是采用AMD的规范，我们拿requireJs来举例，看下模块的定义与引用

简单的函数式定义
``` JS
  // util.js 
  // 定义一个工具类模块
  // 直接return 表示将这个模块导出
  define(function() {
    var util = {
      add: function(number) {
        return number + 1
      }
    }
    return util
  })
```
存在依赖的函数式定义
```JS
  // counter.js
  // 定义一个计数器模块
  // 依赖于util，当只有加载载完所需要的js的时候，回调函数才会执行，并不阻塞页面
  define([
    'util'
  ], function(util) {
    var counter = function(val) {
      return util.add(val)
    } 
    return counter
  });
```
模块的引用
```JS
  // main.js
  require(['counter'], function(counter) {
    console.log(counter(2)) // 3
  })
  // 按照依赖的顺序加载 util.js > counter.js > main.js
```

AMD会根据你的依赖来异步的加载你的模块，当模块加载完毕后，执行回调函数，只有你的模块需要其他引用时，才会去加载相应的依赖模块。

> CMD （Common Module Definition）

seaJs 就是采用AMD的规范，我们拿seaJs来举例，看下模块的定义与引用

简单的函数式定义
``` JS
  // util.js 
  // 定义一个工具类模块
  // 直接return 表示将这个模块导出
  define(function(require, exports, module) {
  var util = {
    add: function(number) {
      return number + 1
    }
  }
  
  return util
})
```
存在依赖的函数式定义
```JS
  // counter.js
  // 定义一个计数器模块
  define(function(require, exports, module) {
    var util = require('./util.js')
    var counter = function(val) {
      return util.add(val)
    } 
    return counter
  })
```
模块的引用
```JS
  // main.js
  seajs.use(['./counter'], function(counter) {
    console.log(counter)
  })
```