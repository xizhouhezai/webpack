import dep from './dep'
import e from './eventbus'

dep()

e()

function cb (val) {
  console.log("视图更新了")
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

let o = new Vue({
  data: {
    test: 'ceshi'
  }
})


o._data.test = 'hello world'


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

p.say()

p.name.person1 = 'lisi'

p.say()
