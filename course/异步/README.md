# 异步

大家都是到js是单线程的，所以遇到需要耗时的操作，js相当于会将异步操作挂起，继续执行同步操作，等同步的操作都执行完后，才接着继续执行异步操作，这样才不会是js线程阻塞

## 异步的实现

那在js中那种操作可以算是异步呢？
1. Promise
2. ajax(XMLHttpRequest)
3. 定时器
4. requestAnimationFrame
5. Message
6. MutationObserver
7. async await

接下来我们看下如何使用这几种方法来实现异步

### Promise

```JS
Promise.resolve().then(() => {
  console.log(1)
})
console.log(2)

// 2
// 1
```

### ajax

```JS
// 
$.ajax({
  url: 'xxxxx',
  method: 'post',
  success: function (data) {
    console.log(1)
  }
})

console.log(2)

// 2
// 1
```

### 定时器

定时器有setTimeout 和 setInterval
在nodejs中还有setImmediate
```JS

```