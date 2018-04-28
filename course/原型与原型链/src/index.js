function Person() {
  
}

Person.prototype.name = '123'

var person = new Person()

/**
 * var person = new Person() 这条代码中到底完成了哪些步骤
 * person 对象 与Person()函数有什么样的关联
 * 
 * 
 * 
 */

// console.log(person.name)
console.log(Object.prototype.__proto__)
console.log(person.__proto__.__proto__)
// console.log('构造函数')
// console.log(Person) // 构造函数
// console.log(person) // 由Person函数构建出来的对象

// console.log(Object.keys(person))
// console.log(person.__proto__)  // {constructor: ƒ}
// console.log(Person.prototype)  // {constructor: ƒ}
// console.log(person.__proto__ === Person.prototype)  // true

// console.log(Person.prototype.constructor)  // Person
// console.log(Person.prototype.constructor === Person)  // Person
// console.log(person.__proto__.constructor)  // Person

// prototype属性

/**
 * Person 是一个构造函数 这个应该都可以理解
 * 每个函数都会有prototype这个属性（注意：是函数，不是对象）
 * 
 */