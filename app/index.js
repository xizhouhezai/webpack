import dep from './dep'
import e from './eventbus'
import  './css/index.css'

dep()

e()

function cb (val) {
  console.log("视图更新了")
  var body = document.body
  var h = document.createElement('h2')
  h.innerHTML = val
  body.append(h)
}

/**
 * 封装Object.defineProperty，当读取对象时，调用reactiveGetter(),
 * 当写入对象时调用reactiveSetter()
 * @param {Object} obj 
 * @param {String} key 
 * @param {any} val 
 */
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log("val: " + val)
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log("newVal: " + newVal)
      if (val === newVal) return
      val = newVal
      cb(newVal)
    }
  })
}

/**
 * 对defineReactive()进行一层包装，对传入的对象进行结构，
 * @param {Object} value 
 */
function observer(value) {
  if (!value || typeof value !== 'object') return
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key])
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

let m = document.getElementById('model')

let o = new Vue({
  data: {
    test: m.value
  }
})

m.oninput = function (e) {
  console.log(e.target.value)
  o._data.test = e.target.value
}


class Obj {
  constructor(options) {
    this.name = options.name
  }
  say() {
    Object.keys(this.name).forEach(key => {
      console.log("my name is " + this.name[key])
    })
  }
}

let p = new Obj({
  name: {
    person1: 'zhangsan'
  }
})


let t = document.getElementById('test')

let btn = document.getElementById('btn')

btn.onclick = function() {
  console.log(t.value.toString())
  if (t.value.indexOf("\\r") >= 0) {
    console.log("中有\n");
  }
  let tmp = t.value.split(/[\r\n]/)
  console.log(tmp)
}

// Map数据结构实例

  console.log('Map数据结构实例 ----------------------------------------------------')

  let m1 = new Map()

  let o1 = {
    p: 'Hello World'
  }

  m1.set(o1, 'content')

  console.log(m1.get(o1))

  console.log(m1.has(o1))

  m1.set({
    d: '123'
  }, '123')

  console.log(m1.get({
    d: '123'
  }))

  let map = new Map()
  map.set(['a'], 5555)
  console.log(map.get(['a']))

  // Map实例的属性如果为引用类型数据，说明该属性只是引用了改内存地址值，非实际值，导致用get取值时
  // 改属性为未定义，要格外注意
  let map1 = new Map([
    [
      ['a'], 555
    ]
  ])
  console.log(map1.get(['a']))

  console.log('----------------------------------------------------')


  var scale = document.getElementsByClassName('scale')[0]

  scale.onclick = function(e) {
    console.log(e.target.style.transform)
    e.target.style.transform = 'rotate(225deg)'
  }
