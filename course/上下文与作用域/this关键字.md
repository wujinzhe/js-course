# this关键字

this是ECMAScript中的关键字，当this运行在程序中的时候也就变成了this表达式，大家知道的是this的值是根据上下文的环境来确定的，很多人对于this的值可能都会搞懵，下面我们来根据不同的情形来讨论下this的取值，并且介绍下this取值的过程

## this中的值从哪里来

我们先看下this的值是从哪里取得，我们套用一下ECMAScript中的规范，当你执行到this的时候，会查看你当前的运行环境（作用域）是否有this绑定，如果没有则查找上一个作用域，一直到全局作用域，只要在过程中发现了存在this值得作用域，则取出该this值，如果都找不到则返回全局作用域的this值。

现在我们知道this回去作用域中


