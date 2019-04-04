/** 定义人类 */
class Person {
  constructor (name, age) {
    let _name = name
    let _age = age

    Person.prototype.getInfo = () => {
      console.log('个人信息', {
        '姓名': name,
        '年龄': age
      })
    }
  }
}

var p = new Person('Lily', 20)
console.log(p)
p.getInfo()

class Student extends Person {
  constructor (name, age, number) {
    super(name, age)
    let _number = number
    let _classes = [
      {
        '科目': '语文',
        '分数': 0
      },
      {
        '科目': '数学',
        '分数': 0
      },
      {
        '科目': '英语',
        '分数': 0
      }
    ]

    Person.prototype.getInfo = () => {
      console.log('个人信息', {
        '姓名': name,
        '年龄': age,
        '学号': _number
      })
    }

    Person.prototype.getScore = () => {
      console.log(name + '的个人成绩为', _classes)
    }

    Person.prototype.test = (opt) => {
      _classes.push({
        '科目': opt.name,
        '分数': opt.score
      })
    }

  }
}

var s = new Student('lulu', 18, '2020')

console.log(s)
s.getInfo()