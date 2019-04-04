# 变量名

变量名是大家经常在程序中需要用到的，但是在ECMAScript什么变量名算是一个合法的变量名呢？下面给大家讲下变量名在ECMAScript中的规范，我们现在所讲的规范是ES2019

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

变量名的起始部分在规范中称为IdentifierStart，而IdentifierStart可能的取值为4种，带id_start属性的Unicode字符，$，_，和\UnicodeEscapeSequence（Unicode的转义字符），下面分别来讲下这4种情况：

1. 带id_start属性的Unicode字符

    在Unicode的字符中，有的字符会带有id_start属性，意思就是id_start是某些个Unicode所本身拥有的，[有关Unicode属性的介绍](http://unicode.org/reports/tr31/)，

    ```JS
    // npm i unicode-12.0.0 -S
    const unicode_id_start_regex = require('unicode-12.0.0/Binary_Property/ID_Start/regex.js')

    unicode_id_start_regex.test('a') // true
    unicode_id_start_regex.test('0') // false

    let a // 合法的
    let 0 // 非法的
    // 当返回为true表示该字符带有id_start属性，
    // 否则表示没有该属性，这就是为什么数字不能作为变量开头的原因
    ```
    感兴趣的同学也可以找到这个文件，然后可以试着去研究下它的正则

2. $ 和 _

    当开头的字符为'$' 或者 '_'的时候，也表示这是一个合法的IdentifierStart，借助上面的正则，我们可以看到
    ```JS
    unicode_id_start_regex.test('$') // false
    unicode_id_start_regex.test('_') // false

    let $ // 合法的
    let _ // 合法的
    ````
    两个字符都不带有id_start属性，但是他们在规范中是一个合法的开头，所以将这两个字符单独的列举出来了

3. \UnicodeEscapeSequence 转义字符

    转义字符的格式为\u Hex4Digits 或者 \u {codepoint}，我们现在来讲下这两种转义的格式

    * \u Hex4Digits

      Hex4Digits 其实是4个16进制的数字，16进制的数字范围是（0 1 2 3 4 5 6 7 8 9 a b c d e f）所以这个转义的格式可以写做\u1234这种样子的，那么是不是只要这4个数字在这个范围（\u0000 - \uffff）内，任何的转义字符都是合法的呢？答案是否定的，这个转义字符的校验规则其实是和上面一样的，请看代码
      ```JS
      'a'.charCodeAt().toString(16) // 61
      let \u0061 // 这个就是合法变量名了

      '$'.charCodeAt().toString(16) // 24
      let \u0024 // 也是合法的

      '0'.charCodeAt().toString(16) // 30
      let \u0030 // 不合法
      ```
      这个例子不知道大家看懂了没有，只有本身能够作为IdentifierStart的字符，它们的转义字符才可以当做是合法的IdentifierStart，'a'和'$'本身是可以作为合法的IdentifierStart，那么它们的16进制的转义字符也是可以作为合法的IdentifierStart，再看下'0'，因为本身都是不合法的，所以转义出来的字符\u0030也无法作为IdentifierStart

    * \u {codepoint}

      其实这个和上面的起始差不多，只不过没有限制位数，但是值需要<= 0x10ffff
      ```JS
      let \u{61} // 合法
      let \u{24} // 合法
      let \u{30} // 不合法
      // 这个格式和上面的区别就在于不会限制16进制数字的个数
      ```

    以上这么多就为IdentifierStart部分的规则，下面我们接着看下IdentifierPart部分的规则

### IdentifierPart

IdentifierPart 可能的取值为以下5种 UnicodeIDContinue
'$' 
\UnicodeEscapeSequence
\<ZWNJ>
\<ZWJ>，下面我们还是具体说下这几种情况

1. UnicodeIDContinue

    不知道还记不记得在IdentifierStart有个UnicodeIDStart的，没错这个其实原理是一样的，需要属性带有id_continue的Unicode字符
     ```JS
    // npm i unicode-12.0.0 -S
    const unicode_id_continue_regex = require('unicode-12.0.0/Binary_Property/ID_Continue/regex.js')

    unicode_id_continue_regex.test('a') // true
    unicode_id_continue_regex.test('0') // true

    let aa // 合法的
    let a0 // 合法的
    // 当返回为true表示该字符带有id_continue属性，
    // 这个时候当数字作为IdentifierPart的时候，就是合法的了
    ```
    不知道你们有没有发现一个问题，经常我们能够看见变量名类似于font_size这样带下划线的变量，但是为什么我们的取值没有列出'_'呢？
    那是因为
    ```JS
    unicode_id_continue_regex.test('_') // true
    // 下划线_是带有属性id_continue的，所以就没有单独的列出来了
    ```

2. $ 和 \UnicodeEscapeSequence（Unicode的转义字符）
    
    $和\UnicodeEscapeSequence 和IdentifierStart的保持一致，这边就不重复介绍了
3. \<ZWNJ> 和 \<ZWJ>

    \<ZWNJ>： ZERO WIDTH NON-JOINER 零宽度非连接器
    
    放置在一些经常会被当成连字的字符之间，用于将它们分别以独立形式显示

    \<ZWJ>： ZERO WIDTH JOINER 零宽度连接器

    放置在一些通常不会被标记为连字的字符之间，用于将这些字符以连字形式显示

    \<ZWNJ>和\<ZWJ>所对应的16进制分别为\u200c和\u200d，在我们汉语中用的比较的少，这两个字符都是非打印字符，就算你用到了变量上，其实也是不会显示出来的
    ```JS
    let a\u200c //合法
    let a\u200d //合法
    ```
  以上为IdentifierStart 和 IdentifierPart，把两个组合到一起就是一个完整的变量名了，在ECMAScript中你的变量命名是不能和保留字相同的，我们列举下在ECMAScript规范中的保留字有哪些

  ## 保留字

  保留字分为关键字，未来保留字，null字面量和布尔字面量

  ### 关键字

  'await', 'break', 'case', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
  'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super',
  'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'

  ### 未来保留字

  enum

  在严格模式下还应该加上 implements	package	protected	interface	private	public

  ### null字面量

  null

  ### 布尔字面量

  false  true

  
  可能如果大家细心的话会发现在关键字中少了'let', 'static'，那是不是说明变量就可以用这两个呢，也是不行的，'let' 和 'static'是会在静态语义分析的时候对变量名进行限制，而不是以关键字的形式来限制，所以'let'和'static'不在关键字列表中

  好了~ 以上为变量名规则的所有内容，有错误的地方欢迎指正