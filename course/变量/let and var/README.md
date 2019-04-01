Let and Const Declarations [13.1.1] 中 有个这么一段话

let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated. A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer's AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

翻译：let 和 const 定义变量是在执行上下文的词法环境作用域中，这些变量在它们所在的词法环境被实例化的时候创建，在执行这些变量的LexicalBinding之前，不能以任何方式访问这些变量，使用Initializer的LexicalBinding定义的变量在计算LexicalBinding时，将分配其Initializer的AssignmentExpression的值，而不是变量创建的时候，当一个LexicalBinding是一个let声明的时候，如果没有Initializer，当LexicalBinding执行的时候这个变量的值就为undefined


