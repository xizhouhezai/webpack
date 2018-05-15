// function obj() {
//   console.log('视图更新了!!!!!')
// }

class Dep {
  constructor() {
    // subs用来管理观察者watcher
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 通知所有watcher更新视图
  notify() {
    console.log(this.subs)
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}



class Watcher {
  constructor() {
    Dep.target = this
  }
  update() {
    console.log("视图更新啦～");
  }
}

Dep.target = null

function defineReactive(obj, key, val) {
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    set: function reactiveSetter(newVal) {
      console.log("newVal: " + newVal)
      if (val === newVal) return
      console.log(dep)
      dep.notify()
    },
    get: function reactiveGetter() {
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return val;
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
    this._data = options.data
    
    observer(this._data)
    new Watcher()
    console.log('render~', this._data.test)
  }
}

export default function dep() {
  console.log('dep ----------------------------------------')

  let o = new Vue({
    data: {
      test: '123'
    }
  })
  o._data.test = '456'

  console.log('dep ----------------------------------------')
}