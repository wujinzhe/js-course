# 变量名

变量名是大家经常在程序中需要用到的，但是在ECMAScript什么变量名算是一个合法的变量名呢？下面给大家讲下变量名在ECMAScript中的规范

## IdentifierStart & IdentifierPart

变量名在ECMAScript中的定义为IdentifierName，后面我们就用IdentifierName来表示变量名，简单的来说IdentifierName有两个部分，一个是IdentifierStart，另一个是IdentifierPart，IdentifierStart部分是一定存在的，IdentifierPart则不一定，我们简单的来举一个例子

```JS
  // 其中 a为IdentifierStart 但是IdentifierPart却没有
  var a

  // 其中 b是IdentifierStart c是IdentifierPart
  var bc

  // 那么由此可以看出第一个字符就是IdentifierStart，
  // 这个变量名除了第一个字符后面的部分就是IdentifierPart（在变量长度大于1的时候）
```

我们知道了组成IdentifierName（变量）的两个部分IdentifierStart和IdentifierPart，那么我们分别来介绍下这两个部分

### IdentifierStart

变量名的起始部分在规范中称为IdentifierStart，而IdentifierStart可能的取值为4种，带id_start属性的Unicode字符，$，_，和Unicode的转义字符，下面分别来讲下这4种情况：

1. 带id_start属性的Unicode字符

    在Unicode的字符中，有的字符会带有id_start属性，意思就是id_start是某些个Unicode所本身拥有的，[有关Unicode属性的介绍](http://unicode.org/reports/tr31/)，

