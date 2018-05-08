class eventEmeitter {
  constructor() {
    this._events = this._events || new Map()
    this._maxListeners = this._maxListeners || 10
  }
}


// 监听一个事件的event bus
// eventEmeitter.prototype.emit = function(type, ...args) {
//   let handler
//   handler = this._events.get(type)
//   if (args.length > 0) {
//     handler.apply(this, args)
//   } else {
//     handler.call(this)
//   }

//   return true
// }

// eventEmeitter.prototype.addLitener = function (type, fn) {
//   if (!this._events.get(type)) {
//     this._events.set(type, fn)
//   }
// }

// 监听多个事件的event bus

eventEmeitter.prototype.addLitener = function(type, fn) {
  let handler = this._events.get(type)

  if (!handler) {
    this._events.set(type, fn)
  } else if (handler && typeof handler === 'function') {
    this._events.set(type, [handler, fn])
  } else {
    handler.push(fn)
  }
}

eventEmeitter.prototype.emit = function(type, ...args) {
  let handler = this._events.get(type)

  if (Array.isArray(handler)) {
    handler.forEach(val => {
      if (args.length > 0) {
        val.apply(this, args);
      } else {
        val.apply(this)
      }
    })
  } else {
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
  }
}

export default function e() {
  let emitter = new eventEmeitter()

  emitter.addLitener('arson', man => {
    console.log(`expel ${man}`)
  })

  emitter.addLitener('arson', man => {
    console.log(`save ${man}`)
  })

  emitter.addLitener('arson', man => {
    console.log(`set ${man}`)
  })

  emitter.addLitener('tom', () => {
    console.log(11111111111111)
  })

  emitter.emit('arson', 'Tom')
  emitter.emit('tom')
}