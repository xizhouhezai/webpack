import dep from './dep'
import e from './eventbus'

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
