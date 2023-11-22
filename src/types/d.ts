export {}

// 枚举
enum statusCode {
  success = 200,
  parmasError = 400,
  severError = 500,
}

const code: number = 400
if (code === statusCode.success) {
  // console.log('success');
} else if (code === statusCode.parmasError) {
  // console.log('parmasError');
} else if (code === statusCode.severError) {
  // console.log('severError');
}

// 泛型
function fn<T>(a: T, b: T): T {
  return a
}
fn<number>(1, 1)
fn<string>('1', '1')

// 泛型-别名
type fnitf = number | string
function fn1<T, G = number>(a: T, b: G): T {
  return a
}

fn1<fnitf>('1', 1)

// 泛型-约束
function fn2<T, G extends fnitf>(a: T, b: G): T {
  return a
}
// fn2<fnitf,boolean>(1,true)  不满足 fnitf 约束
fn2<fnitf, fnitf>(1, 'true')

// 类 默认定义了接口
class PerSon {
  public name: string = '默认值'
  constructor(name: string) {
    this.name = name
  }
  getName() {
    console.log(this.name)
  }
}

const p = new PerSon('XXX')
// p.getName()
// 默认定义了接口
const p1: PerSon = {
  name: '999',
  getName() {
    console.log('p1的name=》' + this.name)
  },
}
// p1.getName()

// 类与接口

interface pitf {
  name: string
  age: number
  getName: () => void
}

class Person1 implements pitf {
  name: string = ''
  age: number = 1
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName() {
    console.log('Person1的name=>' + this.name + '-年龄：' + this.age)
  }
}

const p2 = new Person1('xxx', 18)
// p2.getName()

// 工具类型 Partial => 接口中的属性类型可以都缺省

interface abc {
  name: string
  age: number
  height?: number
}

const a: Partial<abc> = {
  name: 'XXX',
}

// 工具类型 Partial => 接口中的属性类型可以都不可缺省
const b: Required<abc> = {
  name: 'XXX',
  age: 12,
  height: 1.8,
}

// keyof
interface efg {
  name: string
  age: number
}

type hij = keyof efg
let h: hij = 'name'
h = 'age'
// h ='1'// 报错

const obj = {
  name: 1,
  age: 18,
}

// typeof 和 obj 一致的属性类型
type objtype = typeof obj
const o: objtype = {
  name: 1,
  age: 3,
}

// in
type sN = number | string
type hijk = {
  [k in sN]: sN // key 只能是 number | string
}
const k: hijk = {
  O: 1,
  1: 9,
}
