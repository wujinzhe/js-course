// function Person() {
//   console.log('this指向', this)
//   this.name = '456'
// }

// Person.prototype.name = '123'

// var person = new Person()

/**
 * var person = new Person() 这条代码中到底完成了哪些步骤
 * person 对象 与Person()函数有什么样的关联
 * 
 * 
 * 
 */

// console.log('this指向', this)
// console.log(person.name)
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

/** 定义人类 */
function Person (name, age) {
  this.name = name  // 定义姓名
  this.age = age    // 定义年龄
}

Person.prototype.eat = function (footName) {
  console.log('我正在吃', footName)
}

function Student (number, name, age) {
  this.number = number
  Person.call(this, name, age)
}

Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.study = function (course) {
  console.log('我正在学习' + course)
}

console.log(Object.create(Person.prototype))

let student1 = new Student('1001', 'lili', 20)
let student2 = new Student('1002', 'nana', 30)
console.log('student1', student1)
console.log('student2', student2)
student1.age = 1
console.log('student1', student1.age)
console.log('student2', student2.age)
student1.study('语文')
student1.eat('馒头')