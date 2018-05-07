function obj() {
  console.log('视图更新了!!!!!')
}

class Dep {
  
}

function defineReactive(obj, key, val) {
  object.definePropertory(obj, key, {
    enumerable: true,
    configurable: true,
    get: function getter() {
      return val
    },
    set: function setter(newVal) {
      if (val === newVal) return
      val = newVal
      cb(newVal)
    }
  })
}

function observer(obj) {
  if (!obj && typeof obj !== 'object') return
  
  Object.keys(obj).forEach(item => {
    defineReactive(obj, item, obj[item])
  })
}

class Vue {
  constructor(options) {
    this.data = options.data
    observer(this.data)
  }
}

export default function dep() {
  let m = new Map()

  let o = {p: 'Hello World'}

  m.set(o, 'content')

  console.log(m.get(o))

  console.log(m.has(o))

  m.set({d: '123'}, '123')

  console.log(m.get({d: '123'}))

  let map = new Map()
  map.set(['a'], 5555)
  console.log(map.get(['a']))

  let map1 = new Map([[['a'],555]])
  console.log(map1.get(['a']))
}